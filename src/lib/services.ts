import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type ServiceEntry = CollectionEntry<'services'> & { slug: string };

/** Service landing pages in one language, sorted. `slug` is the file name (same in every language). */
export async function getServices(lang: Lang): Promise<ServiceEntry[]> {
	const all = await getCollection('services');
	return all
		.filter((s) => s.id.startsWith(`${lang}/`))
		.map((s) => Object.assign(s, { slug: s.id.slice(lang.length + 1) }))
		.sort((a, b) => a.data.order - b.data.order);
}
