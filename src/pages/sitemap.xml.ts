import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { langs, localize } from '../i18n';
import { getProjects } from '../lib/portfolio';
import { getServices } from '../lib/services';

// sitemap.xml for Google Search Console: every public page in every language,
// with links between the language versions.
export const GET: APIRoute = async () => {
	const services = await getServices('pl');
	const projects = await getProjects();
	const paths = [
		'/',
		'/sprzatanie/',
		...services.map((s) => `/uslugi/${s.slug}/`),
		...projects.map((p) => `/realizacje/${p.id}/`),
		'/polityka-prywatnosci/',
	];
	const url = (path: string) => `${site.url}${path}`;
	const entries = paths.flatMap((path) =>
		langs.map((lang) => {
			const alternates = langs
				.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(localize(path, l))}"/>`)
				.join('\n');
			return `  <url>\n    <loc>${url(localize(path, lang))}</loc>\n${alternates}\n  </url>`;
		}),
	);
	const xml =
		'<?xml version="1.0" encoding="UTF-8"?>\n' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
		entries.join('\n') +
		'\n</urlset>\n';
	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
