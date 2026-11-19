import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type ProjectImage = { name: string; src: ImageMetadata };

// Every file in src/assets/portfolio/ ends up in the build output, even if no page uses it.
// So keep only the photos meant for the website here; others live in /portfolio-archive/.
const files = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/portfolio/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
);

export const categoryLabels: Record<Project['data']['category'], string> = {
	łazienka: 'Łazienka',
	kuchnia: 'Kuchnia',
	mieszkanie: 'Mieszkanie',
	lokal: 'Lokal użytkowy',
	biuro: 'Biuro',
	inne: 'Inne',
};

/** File names in a project folder, sorted (e.g. biuro-01.jpg, biuro-02.jpg…). Nothing is imported. */
function folderFiles(folder: string): string[] {
	const prefix = `/src/assets/portfolio/${folder}/`;
	return Object.keys(files)
		.filter((path) => path.startsWith(prefix) && !path.slice(prefix.length).includes('/'))
		.map((path) => path.slice(prefix.length))
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/**
 * Names of the photos a project shows: the ones listed in `photos` (in that order),
 * or every photo in its folder when `photos` is not set.
 */
function selectedNames(project: Project): string[] {
	const available = folderFiles(project.data.folder);
	const { photos } = project.data;
	if (!photos?.length) return available;
	const missing = photos.filter((n) => !available.includes(n));
	if (missing.length) {
		throw new Error(
			`Project "${project.id}": photos not found in src/assets/portfolio/${project.data.folder}/: ${missing.join(', ')}`,
		);
	}
	return photos;
}

async function load(folder: string, name: string): Promise<ProjectImage> {
	const mod = await files[`/src/assets/portfolio/${folder}/${name}`]();
	return { name, src: mod.default };
}

export function countPhotos(project: Project): number {
	return selectedNames(project).length;
}

export async function getSelectedImages(project: Project): Promise<ProjectImage[]> {
	return Promise.all(selectedNames(project).map((n) => load(project.data.folder, n)));
}

export async function getCover(project: Project): Promise<ImageMetadata | undefined> {
	const { cover, folder } = project.data;
	const name = cover && folderFiles(folder).includes(cover) ? cover : selectedNames(project)[0];
	return name ? (await load(folder, name)).src : undefined;
}

/** All published projects that have at least one photo, in display order. */
export async function getProjects(): Promise<Project[]> {
	const all = await getCollection('projects');
	return all
		.filter((p) => !p.data.draft && selectedNames(p).length > 0)
		.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}
