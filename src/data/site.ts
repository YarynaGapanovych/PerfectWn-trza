/**
 * Business details used across the site: contact, Google structured data, the mobile
 * call bar, trust sections and the privacy policy.
 *
 * Fill in the empty values when you have them. Anything left empty is simply not shown,
 * so the site never displays made-up facts.
 */
export const site = {
	name: 'PerfectWnętrza',
	/** Production address (no trailing slash). Used for canonical links, sitemap and sharing. */
	url: 'https://perfectwnetrza.pl',
	phone: '+48 791 567 011',
	email: 'contact@perfectwnetrza.pl',
	area: 'Kraków i okolice',
	city: 'Kraków',
	/** Shown on the site; `openingHours` is the same in schema.org format. */
	hours: 'Pon–Pt 8:00–18:00',
	openingHours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },

	/** WhatsApp number in international format without "+" or spaces, e.g. '48791567011'. Empty = no WhatsApp button. */
	whatsapp: '',

	/** Links to profiles (Google Business Profile, Facebook, Instagram, Oferteo, Fixly…). Used in schema.org `sameAs`. */
	profiles: [] as string[],
	/** "Write a review" link from Google Business Profile (Ask for reviews → copy link). Empty = button hidden. */
	googleReviewUrl: '',

	/**
	 * Real numbers for the trust strip, with the label in each language, e.g.
	 * { value: '8+', label: { pl: 'lat doświadczenia', en: 'years of experience', uk: 'років досвіду' } }.
	 * Empty = strip hidden.
	 */
	stats: [] as { value: string; label: Record<'pl' | 'en' | 'uk', string> }[],

	/** Company details for the privacy policy (RODO). The page shows a notice until these are filled in. */
	company: {
		legalName: '',
		address: '',
		nip: '',
	},

	/**
	 * Analytics. Plausible (or a compatible service like Umami's Plausible mode) works without a
	 * cookie banner. Set the domain registered there, e.g. 'perfectwnetrza.pl'. Empty = no tracking.
	 */
	plausibleDomain: '',
};

export const telHref = `tel:${site.phone.replace(/\s/g, '')}`;
export const whatsappHref = site.whatsapp ? `https://wa.me/${site.whatsapp}` : '';
