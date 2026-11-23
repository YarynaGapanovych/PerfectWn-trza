// Languages of the site. Polish is the default and keeps the original URLs (/, /sprzatanie/…);
// other languages live under a prefix with the same slugs (/en/sprzatanie/, /uk/sprzatanie/).
import { pl, type Dict } from './pl';
import { en } from './en';
import { uk } from './uk';

export const langs = ['pl', 'en', 'uk'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'pl';

/** Short label in the language switcher. */
export const langLabels: Record<Lang, string> = { pl: 'PL', en: 'EN', uk: 'UA' };
/** Full name, used for the switcher's accessible labels. */
export const langNames: Record<Lang, string> = { pl: 'Polski', en: 'English', uk: 'Українська' };
/** og:locale / hreflang values. */
export const langLocales: Record<Lang, string> = { pl: 'pl_PL', en: 'en_GB', uk: 'uk_UA' };

const dicts: Record<Lang, Dict> = { pl, en, uk };

/** Language of a page from its URL. */
export function getLang(url: URL): Lang {
	const first = url.pathname.split('/')[1];
	return (langs as readonly string[]).includes(first) && first !== defaultLang ? (first as Lang) : defaultLang;
}

export const useT = (lang: Lang): Dict => dicts[lang];

/** Path without the language prefix: '/en/sprzatanie/' → '/sprzatanie/'. */
export function stripLang(path: string): string {
	const m = path.match(/^\/(en|uk)(\/.*)?$/);
	return m ? m[2] || '/' : path;
}

/** Path in a given language: localize('/sprzatanie/', 'en') → '/en/sprzatanie/'; works with '/#kontakt' too. */
export function localize(path: string, lang: Lang): string {
	const base = stripLang(path);
	return lang === defaultLang ? base : `/${lang}${base}`;
}

/** getStaticPaths helper for pages under src/pages/[lang]/. */
export const otherLangPaths = () => langs.filter((l) => l !== defaultLang).map((lang) => ({ params: { lang } }));
