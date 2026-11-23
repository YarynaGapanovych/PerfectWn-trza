/**
 * Client reviews shown in the "Opinie klientów" section. Add only real reviews,
 * copied with the client's permission (e.g. from Google Business Profile).
 * While this list is empty the section is hidden.
 *
 * Example:
 * { name: 'Anna K.', text: 'Łazienka gotowa w terminie…', rating: 5, source: 'Google', service: 'Remont łazienki' }
 */
export interface Review {
	name: string;
	text: string;
	rating?: 1 | 2 | 3 | 4 | 5;
	source?: string;
	service?: string;
	/** Which pages show it: 'renovation' (home and service pages), 'cleaning', or both. */
	topic?: 'renovation' | 'cleaning';
}

export const reviews: Review[] = [];
