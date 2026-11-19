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
	}),
});

export const collections = { projects };
