import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Portfolio projects ("Realizacje").
 * One Markdown file per project in src/content/projects/; its photos live in
 * src/assets/portfolio/<folder>/. Only put photos meant for the website there:
 * everything in that folder is copied into the build. Unused photos are kept in
 * /portfolio-archive/<folder>/ — to add one, move it back and list it under `photos`.
 */
const projectText = z.object({
	title: z.string().optional(),
	location: z.string().optional(),
	scope: z.array(z.string()).optional(),
});

const projects = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		category: z.enum(['łazienka', 'kuchnia', 'mieszkanie', 'lokal', 'biuro', 'inne']),
		folder: z.string(),
		cover: z.string().optional(),
		/** Photos shown on the site, in this order. Omit to show every photo in the folder. */
		photos: z.array(z.string()).optional(),
		location: z.string().optional(),
		area: z.number().optional(),
		duration: z.string().optional(),
		year: z.number().optional(),
		scope: z.array(z.string()).optional(),
		featured: z.boolean().default(false),
		/** true = keep the project file but don't publish it. */
		draft: z.boolean().default(false),
		order: z.number().default(100),
		/** English / Ukrainian versions of the text fields; anything missing falls back to Polish. */
		translations: z
			.object({
				en: projectText.optional(),
				uk: projectText.optional(),
			})
			.optional(),
	}),
});

/**
 * Service landing pages (/uslugi/<file name>/), one Markdown file with front matter each in
 * src/content/services/<lang>/ (pl, en, uk — same file names in every language).
 * Each targets one Google search, e.g. "remont łazienki Kraków".
 */
const services = defineCollection({
	loader: glob({ pattern: '*/*.md', base: './src/content/services' }),
	schema: z.object({
		/** Short name: menu, breadcrumbs, links. */
		name: z.string(),
		/** <title> and Google result title. */
		metaTitle: z.string(),
		description: z.string(),
		kind: z.enum(['renovation', 'cleaning']).default('renovation'),
		title: z.string(),
		titleAccent: z.string().optional(),
		lead: z.string(),
		image: z.string(),
		imageAlt: z.string(),
		badge: z.object({ small: z.string(), big: z.string() }).optional(),
		/** Option pre-selected in the contact form ("Rodzaj prac"). */
		formService: z.string(),
		/** Portfolio categories shown as example projects. */
		projectCategories: z.array(z.enum(['łazienka', 'kuchnia', 'mieszkanie', 'lokal', 'biuro', 'inne'])).default([]),
		scopeTitle: z.string().default('Zakres prac'),
		scope: z.array(z.string()),
		faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
		order: z.number().default(100),
	}),
});

export const collections = { projects, services };
