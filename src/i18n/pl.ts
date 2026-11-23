// Polish site text — the source language. en.ts and uk.ts must have the same shape (type Dict).
// Only promises the business has confirmed belong here; see MARKETING.md before adding facts.

export const pl = {
	meta: {
		title: 'PerfectWnętrza — wykończenia i remonty wnętrz w Krakowie',
		description:
			'Kompleksowe wykończenia wnętrz i remonty pod klucz w Krakowie i okolicach. Łazienki, kuchnie, zabudowy, malowanie i podłogi. Bezpłatna wycena.',
	},
	common: {
		home: 'PerfectWnętrza — strona główna',
		start: 'Start',
		freeQuote: 'Bezpłatna wycena',
		seeScope: 'Zobacz zakres',
		area: 'Kraków i okolice',
		hours: 'Pon–Pt 8:00–18:00',
		breadcrumbs: 'Okruszki',
		language: 'Język',
	},
	nav: {
		services: 'Usługi',
		projects: 'Realizacje',
		cleaning: 'Sprzątanie',
		contact: 'Kontakt',
		openMenu: 'Otwórz menu',
		renovation: 'Remonty',
		sections: 'Rodzaj usług',
	},
	hero: {
		eyebrow: 'Wykończenia wnętrz pod klucz',
		title: 'Wnętrza dopracowane',
		titleAccent: 'w każdym detalu',
		lead: 'Remontujemy i wykańczamy mieszkania, domy oraz lokale usługowe. Jeden zespół, jeden harmonogram i pełna odpowiedzialność za efekt.',
		primary: 'Umów konsultację',
		secondary: 'Zobacz usługi',
		alt: 'Ilustracja mieszkania: salon z jadalnią, sypialnia i łazienka',
		badgeSmall: 'Od wyceny',
		badgeBig: 'do odbioru kluczy',
	},
	services: {
		eyebrow: 'Usługi',
		titleLines: ['Wszystko, czego potrzebuje', 'Twoje wnętrze'],
		intro: 'Zajmujemy się całym procesem — od pierwszej wizyty i wyceny po sprzątanie po remoncie. Ty wybierasz zakres, my dbamy o jakość i terminy.',
		cards: [
			{
				title: 'Wykończenia pod klucz',
				alt: 'Mieszkanie wykończone pod klucz',
				text: 'Kompleksowa realizacja: od gładzi i podłóg, przez łazienki, po montaż oświetlenia i drzwi.',
			},
			{
				title: 'Remonty i modernizacje',
				alt: 'Mieszkanie w trakcie remontu',
				text: 'Odświeżenie lub pełna przebudowa mieszkania, domu czy lokalu użytkowego — bez niespodzianek.',
			},
			{
				title: 'Łazienki i kuchnie',
				alt: 'Wyróżniona łazienka i aneks kuchenny',
				text: 'Precyzyjne prace glazurnicze, zabudowy na wymiar oraz instalacje wykonane zgodnie ze sztuką.',
			},
			{
				title: 'Zabudowy i stolarka',
				alt: 'Wyróżnione zabudowy i meble na wymiar',
				text: 'Meble na wymiar, garderoby, sufity podwieszane i ściany z płyt g-k idealnie wpasowane w przestrzeń.',
			},
			{
				title: 'Malowanie i podłogi',
				alt: 'Malowanie ścian i układanie podłóg',
				text: 'Gładzie, malowanie ścian i sufitów oraz montaż paneli, desek i płytek — równo i czysto.',
			},
			{
				title: 'Nadzór i koordynacja',
				alt: 'Mieszkanie z zaznaczonymi etapami prac',
				text: 'Jeden opiekun zlecenia, jasny harmonogram i stały kontakt na każdym etapie prac.',
			},
		],
		cleaningEyebrow: 'Nowość · Sprzątanie',
		cleaningText: 'Sprzątamy też klatki schodowe, obiekty komercyjne i niekomercyjne oraz wnętrza po remoncie.',
		cleaningCta: 'Zobacz ofertę →',
	},
	portfolio: {
		eyebrow: 'Realizacje',
		titleLines: ['Zobacz, jak', 'pracujemy'],
		intro: 'Łazienki, kuchnie, mieszkania i lokale użytkowe — wybrane projekty z naszego portfolio.',
	},
	why: {
		eyebrow: 'Dlaczego my',
		titleLines: ['Remont bez', 'niespodzianek'],
		intro: 'Wiemy, że remont to duża decyzja. Dlatego stawiamy na jasne zasady, stały kontakt i jedną osobę odpowiedzialną za Twoje wnętrze.',
		reasons: [
			{ title: 'Bezpłatna konsultacja i wycena', text: 'Przyjeżdżamy, oglądamy wnętrze i przygotowujemy wycenę dopasowaną do zakresu prac — bez zobowiązań.' },
			{ title: 'Jeden opiekun zlecenia', text: 'Masz jedną osobę do kontaktu, która zna Twój projekt i koordynuje wszystkie ekipy.' },
			{ title: 'Jasny harmonogram', text: 'Jeden zespół i jeden plan prac. Wiesz, co dzieje się na każdym etapie remontu.' },
			{ title: 'Odpowiedź w 24 godziny', text: 'Na każde zapytanie odpowiadamy w ciągu doby i proponujemy termin spotkania.' },
			{ title: 'Sprzątanie po remoncie', text: 'Oddajemy wnętrze czyste i gotowe do zamieszkania — sprzątanie robi nasz zespół.' },
			{ title: 'Odpowiedzialność za efekt', text: 'Bierzemy odpowiedzialność za cały proces — od pierwszej wizyty do odbioru kluczy.' },
		],
	},
	steps: {
		eyebrow: 'Jak to działa',
		title: 'Trzy proste kroki',
		renovation: [
			{ title: 'Opisz, czego potrzebujesz', text: 'Wypełnij formularz lub zadzwoń — odezwiemy się w ciągu 24 godzin.' },
			{ title: 'Bezpłatna konsultacja i wycena', text: 'Oglądamy wnętrze, ustalamy zakres i przygotowujemy wycenę.' },
			{ title: 'Realizacja według harmonogramu', text: 'Jeden zespół i jeden opiekun zlecenia — aż do sprzątania po remoncie.' },
		],
		cleaning: [
			{ title: 'Opisz, czego potrzebujesz', text: 'Wypełnij formularz lub zadzwoń — powiedz, jaki obiekt i jaki zakres sprzątania.' },
			{ title: 'Bezpłatna wycena', text: 'Przygotujemy wycenę dopasowaną do powierzchni i zakresu prac.' },
			{ title: 'Ustalamy termin i sprzątamy', text: 'Jednorazowo lub regularnie — tak, jak ustalimy.' },
		],
		rental: [
			{ title: 'Opisz, czego potrzebujesz', text: 'Wypełnij formularz lub zadzwoń — powiedz, ile mieszkań i jak często potrzebujesz sprzątania.' },
			{ title: 'Bezpłatna wycena', text: 'Przygotujemy wycenę dopasowaną do powierzchni i zakresu prac.' },
			{ title: 'Ustalamy terminy i sprzątamy', text: 'Jednorazowo lub regularnie — tak, jak ustalimy.' },
		],
	},
	faq: {
		eyebrow: 'FAQ',
		title: 'Najczęstsze pytania',
		introBefore: 'Nie znalazłeś odpowiedzi?',
		introLink: 'Napisz do nas',
		introAfter: '— odpowiemy w ciągu 24 godzin.',
		renovation: [
			{
				q: 'Ile kosztuje remont lub wykończenie mieszkania?',
				a: 'Koszt zależy od metrażu, stanu wnętrza i zakresu prac. Po bezpłatnej konsultacji na miejscu przygotowujemy wycenę dopasowaną do Twojego projektu — bez zobowiązań.',
			},
			{ q: 'Jak szybko się odezwiecie?', a: 'Na każde zapytanie odpowiadamy w ciągu 24 godzin i proponujemy termin spotkania oraz bezpłatnej wyceny.' },
			{
				q: 'Czy mogę zlecić tylko część prac?',
				a: 'Tak. Możesz zlecić kompleksowe wykończenie pod klucz albo wybrane prace — np. samą łazienkę, malowanie, podłogi czy zabudowy na wymiar.',
			},
			{
				q: 'Kto koordynuje prace na budowie?',
				a: 'Każde zlecenie ma jednego opiekuna. To on układa harmonogram, koordynuje ekipy i jest Twoim stałym kontaktem na każdym etapie.',
			},
			{
				q: 'Czy sprzątacie po remoncie?',
				a: 'Tak. Po zakończeniu prac nasz zespół sprząta wnętrze — usuwa pył i resztki materiałów, myje okna, podłogi i armaturę — tak, aby było gotowe do zamieszkania.',
			},
			{ q: 'Na jakim obszarze działacie?', a: 'Realizujemy zlecenia w Krakowie i okolicach.' },
			{
				q: 'Jak przygotować się do wyceny?',
				a: 'Opisz w formularzu metraż, lokalizację i oczekiwany termin. Zdjęcia lub rzut mieszkania bardzo pomagają — możesz je wysłać e-mailem po pierwszym kontakcie.',
			},
		],
		cleaning: [
			{
				q: 'Sprzątacie jednorazowo czy regularnie?',
				a: 'Oba warianty. Sprzątamy jednorazowo (np. po remoncie) albo regularnie — zakres i częstotliwość ustalamy indywidualnie.',
			},
			{
				q: 'Ile kosztuje sprzątanie?',
				a: 'Cena zależy od rodzaju obiektu, powierzchni, zakresu prac i częstotliwości. Wycena jest bezpłatna — opisz, czego potrzebujesz, a przygotujemy ofertę.',
			},
			{
				q: 'Co obejmuje sprzątanie mieszkań na wynajem krótkoterminowy?',
				a: 'Sprzątanie między gośćmi, wymianę pościeli i ręczników oraz uzupełnienie podstawowych zapasów — tak, aby apartament był gotowy na kolejny przyjazd.',
			},
			{
				q: 'Czy sprzątacie klatki schodowe dla wspólnot?',
				a: 'Tak, to jedna z naszych głównych usług. Pracujemy dla wspólnot mieszkaniowych, zarządców i właścicieli budynków — myjemy schody, podłogi, poręcze, drzwi i okna na klatce.',
			},
			{ q: 'Na jakim obszarze działacie?', a: 'Sprzątamy w Krakowie i okolicach.' },
		],
	},
	reviews: {
		eyebrow: 'Opinie klientów',
		title: 'Co mówią o nas klienci',
		google: 'Oceń nas w Google',
		rating: 'Ocena {n} na 5',
	},
	contact: {
		eyebrow: 'Kontakt',
		title: 'Porozmawiajmy o Twoim wnętrzu',
		intro: 'Opisz krótko, jakie prace planujesz — odezwiemy się w ciągu 24 godzin i umówimy bezpłatną konsultację oraz wycenę.',
		phone: 'Telefon',
		email: 'E-mail',
		address: 'Adres',
		hours: 'Godziny',
		whatsapp: 'WhatsApp',
		whatsappLink: 'Napisz na WhatsApp',
		name: 'Imię i nazwisko',
		message: 'Wiadomość',
		messagePlaceholder: 'Metraż, lokalizacja, oczekiwany termin…',
		workType: 'Rodzaj prac',
		/** Labels for the work types, same order as SERVICE_VALUES in Contact.astro. */
		workTypes: ['Wykończenie pod klucz', 'Malowanie i podłogi', 'Remont / modernizacja', 'Łazienka lub kuchnia', 'Zabudowy i stolarka', 'Inne'],
		/** Cleaning enquiry form (cleaning page and short-term rental page). */
		cleaning: {
			title: 'Zamów bezpłatną wycenę sprzątania',
			intro: 'Opisz obiekt i zakres sprzątania — odezwiemy się w ciągu 24 godzin z bezpłatną wyceną.',
			objectType: 'Co mamy sprzątać?',
			/** Same order as CLEANING_VALUES in Contact.astro. */
			objectTypes: ['Klatka schodowa', 'Sprzątanie po remoncie', 'Biuro lub lokal komercyjny', 'Szkoła lub obiekt publiczny', 'Mieszkanie na wynajem krótkoterminowy', 'Inne'],
			frequency: 'Jak często?',
			/** Same order as FREQUENCY_VALUES in Contact.astro. */
			frequencies: ['Jednorazowo', 'Regularnie', 'Jeszcze nie wiem'],
			messagePlaceholder: 'Adres, powierzchnia, preferowane dni i godziny…',
		},
		hintBefore: 'Masz zdjęcia lub rzut mieszkania? Prześlij je na',
		hintOr: 'lub przez',
		hintAfter: '— to przyspieszy wycenę.',
		submit: 'Wyślij zapytanie',
		sending: 'Wysyłanie…',
		noteBefore: 'Wysyłając formularz, zgadzasz się na kontakt w sprawie zapytania. Szczegóły w',
		noteLink: 'polityce prywatności',
		unavailableBefore: 'Formularz jest chwilowo niedostępny — zadzwoń pod',
		or: 'lub napisz na',
		success: '<strong>Dziękujemy!</strong> Wiadomość została wysłana — odezwiemy się w ciągu 24 godzin.',
		errorBefore: 'Nie udało się wysłać wiadomości. Spróbuj ponownie albo zadzwoń pod',
	},
	footer: {
		tagline: 'Wykończenia i remonty wnętrz pod klucz.',
		navTitle: 'Nawigacja',
		navAria: 'Stopka',
		projects: 'Realizacje budowlane',
		servicesTitle: 'Usługi',
		contactTitle: 'Kontakt',
		rights: 'Wszelkie prawa zastrzeżone.',
		privacy: 'Polityka prywatności',
		top: 'Do góry ↑',
	},
	callbar: { aria: 'Szybki kontakt', call: 'Zadzwoń' },
	cleaning: {
		metaTitle: 'Sprzątanie Kraków — klatki schodowe, biura, mieszkania na doby | PerfectWnętrza',
		metaDescription:
			'Sprzątanie w Krakowie i okolicach: klatki schodowe, biura i lokale, szkoły, sprzątanie po remoncie oraz mieszkań na wynajem krótkoterminowy. Jednorazowo lub regularnie. Bezpłatna wycena.',
		eyebrow: 'Sprzątanie',
		title: 'Czyste klatki schodowe, obiekty',
		titleAccent: 'i wnętrza po remoncie',
		lead: 'Sprzątamy klatki schodowe, obiekty komercyjne i niekomercyjne — takie jak biura, sklepy, szkoły czy szpitale — wnętrza po remoncie oraz mieszkania na wynajem krótkoterminowy. Zakres i częstotliwość ustalamy indywidualnie, a wycena jest bezpłatna.',
		heroAlt: 'Ilustracja mieszkania w trakcie sprzątania',
		badgeSmall: 'Jednorazowo',
		badgeBig: 'lub regularnie',
		offerEyebrow: 'Zakres usług',
		offerTitle: 'Co sprzątamy',
		cards: [
			{
				title: 'Sprzątanie klatek schodowych',
				text: 'Dla wspólnot mieszkaniowych, zarządców i właścicieli budynków. Mycie schodów, podłóg i poręczy, drzwi oraz okien na klatce. Zakres i częstotliwość ustalamy indywidualnie.',
				alt: 'Sprzątanie klatki schodowej',
			},
			{
				title: 'Sprzątanie po remoncie',
				text: 'Usuwanie pyłu, resztek farby, kleju i fug, mycie okien, podłóg i armatury — tak, aby wnętrze było gotowe do zamieszkania lub otwarcia.',
				alt: 'Sprzątanie mieszkania po remoncie',
			},
			{
				title: 'Sprzątanie obiektów komercyjnych',
				text: 'Biura, sklepy, lokale usługowe i inne obiekty komercyjne. Sprzątanie jednorazowe lub regularne — zakres i terminy ustalamy razem z Tobą.',
				alt: 'Sprzątanie biura',
			},
			{
				title: 'Sprzątanie obiektów niekomercyjnych',
				text: 'Szkoły, szpitale i inne obiekty użyteczności publicznej. Zakres prac i harmonogram dopasowujemy do specyfiki obiektu.',
				alt: 'Sprzątanie sali lekcyjnej',
			},
			{
				title: 'Sprzątanie apartamentów na wynajem krótkoterminowy',
				text: 'Dla właścicieli i zarządców mieszkań na doby. Sprzątanie między gośćmi, wymiana pościeli i ręczników, uzupełnienie podstawowych zapasów — tak, aby apartament był gotowy na kolejny przyjazd.',
				alt: 'Sprzątanie apartamentu na wynajem krótkoterminowy',
			},
		],
	},
	servicePage: {
		scopeEyebrow: 'Zakres',
		scopeIntro: 'Zakres dopasowujemy do Twoich potrzeb — możesz zlecić całość albo wybrane prace.',
		projectsEyebrow: 'Realizacje',
		projectsTitle: 'Zobacz nasze prace',
		allProjects: 'Wszystkie realizacje →',
	},
	project: {
		categories: { łazienka: 'Łazienka', kuchnia: 'Kuchnia', mieszkanie: 'Mieszkanie', lokal: 'Lokal użytkowy', biuro: 'Biuro', inne: 'Inne' } as Record<string, string>,
		/** Photo count label; Polish has three plural forms. */
		photos: (n: number) =>
			`${n} ${n === 1 ? 'zdjęcie' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'zdjęcia' : 'zdjęć'}`,
		metaSuffix: 'Realizacje',
		metaDescription: 'Zobacz zdjęcia z realizacji PerfectWnętrza.',
		scopeTitle: 'Zakres prac',
		zoom: 'Powiększ',
		photo: 'zdjęcie',
		ctaEyebrow: 'Twoje wnętrze',
		ctaTitle: 'Planujesz podobny remont?',
		pagerAria: 'Inne realizacje',
		prev: '← Poprzednia',
		next: 'Następna →',
		all: 'Wszystkie realizacje',
	},
	lightbox: { dialog: 'Podgląd zdjęcia', close: 'Zamknij', prev: 'Poprzednie zdjęcie', next: 'Następne zdjęcie' },
	privacy: {
		metaTitle: 'Polityka prywatności | PerfectWnętrza',
		metaDescription: 'Informacje o przetwarzaniu danych osobowych na stronie PerfectWnętrza.',
		eyebrow: 'Informacje prawne',
		title: 'Polityka prywatności',
		adminTitle: '1. Administrator danych',
		adminReady: 'Administratorem danych osobowych jest {company}. Kontakt:',
		adminPending:
			'Pełne dane administratora (nazwa firmy, adres, NIP) zostaną tu uzupełnione. Do tego czasu w sprawach danych osobowych prosimy o kontakt:',
		phoneShort: 'tel.',
		dataTitle: '2. Jakie dane i w jakim celu przetwarzamy',
		data: [
			'Przez formularz kontaktowy, e-mail, telefon lub WhatsApp zbieramy dane, które sam podajesz: imię i nazwisko, adres e-mail, numer telefonu oraz treść wiadomości. Używamy ich wyłącznie, aby odpowiedzieć na zapytanie, przygotować wycenę i — jeśli dojdzie do współpracy — zrealizować zlecenie.',
			'Podstawą prawną jest podjęcie działań na Twoje żądanie przed zawarciem umowy oraz wykonanie umowy (art. 6 ust. 1 lit. b RODO), a także nasz prawnie uzasadniony interes w odpowiadaniu na wiadomości (art. 6 ust. 1 lit. f RODO).',
		],
		recipientsTitle: '3. Komu przekazujemy dane',
		recipientsIntro: 'Dane mogą być przetwarzane przez dostawców usług, z których korzysta strona:',
		recipients: [
			'Web3Forms — przekazanie wiadomości z formularza na naszą skrzynkę e-mail,',
			'Vercel — hosting strony,',
			'Google — dostawca poczty e-mail oraz czcionek (Google Fonts) wyświetlanych na stronie,',
		],
		recipientAnalytics: 'Plausible Analytics — anonimowe statystyki odwiedzin, bez plików cookies.',
		recipientsOutro: 'Niektórzy z tych dostawców mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym na podstawie standardowych klauzul umownych.',
		retentionTitle: '4. Jak długo przechowujemy dane',
		retention:
			'Dane z zapytań przechowujemy przez czas potrzebny do odpowiedzi i ewentualnej współpracy, a następnie przez okres wymagany przepisami (np. podatkowymi) lub do przedawnienia roszczeń.',
		rightsTitle: '5. Twoje prawa',
		rights:
			'Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu. Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych. Podanie danych jest dobrowolne, ale bez nich nie odpowiemy na zapytanie.',
		cookiesTitle: '6. Pliki cookies i statystyki',
		cookies: 'Strona nie używa plików cookies do śledzenia ani reklam.',
		cookiesAnalytics: 'Statystyki odwiedzin zbieramy anonimowo, bez cookies i bez identyfikowania osób.',
	},
};

export type Dict = typeof pl;
