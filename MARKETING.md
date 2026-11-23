# Marketing checklist — PerfectWnętrza

What the website now does, and what only you can do outside the code.

## 1. Fill in `src/data/site.ts`

Each empty value hides its feature, so nothing made-up is shown.

| Field | Turns on |
| --- | --- |
| `stats` | Numbers strip under the hero, with a label per language (e.g. years of experience, finished projects) |
| `whatsapp` | WhatsApp button in the mobile bar, contact section and form |
| `googleReviewUrl` | "Oceń nas w Google" button next to reviews |
| `profiles` | Links to Google / Facebook / Instagram / Oferteo in Google's structured data |
| `company` | Company name, address and NIP in the privacy policy |
| `plausibleDomain` | Visitor statistics + events: `Telefon`, `WhatsApp`, `Formularz` |

Reviews go into `src/data/reviews.ts` (only real ones, with the client's permission).
Extra FAQ answers (guarantee, VAT invoice, price ranges) go into `faq` in `src/i18n/pl.ts`, `en.ts` and `uk.ts`.

## 2. Google Business Profile (most important for Kraków searches)

1. Create or claim the profile at business.google.com: name **PerfectWnętrza**, category
   "Firma remontowa" (+ "Firma sprzątająca"), service area Kraków and nearby towns,
   phone **+48 791 567 011**, website **https://perfectwnetrza.pl**, hours Mon–Fri 8–18.
   Keep name, phone and area exactly the same as on the website.
2. Add 10+ real photos from the portfolio and post a new project every few weeks.
3. Copy the "Ask for reviews" link into `googleReviewUrl` and the profile link into `profiles`.

## 3. Collect reviews after every finished job

Send this the day you hand over the keys (SMS / WhatsApp):

> Dzień dobry, dziękujemy za współpracę przy [łazience / mieszkaniu]! Jeśli jest Pan/Pani
> zadowolony/a, będziemy wdzięczni za krótką opinię w Google — to bardzo pomaga małej firmie:
> [link do opinii]. Pozdrawiamy, zespół PerfectWnętrza

Answer every review within a few days. Never buy reviews or offer rewards for them —
Google removes those and can suspend the profile.

## 4. Google Search Console

Add the domain at search.google.com/search-console and submit
`https://perfectwnetrza.pl/sitemap.xml`. Check there which searches bring visitors.

## 5. Project pages

In `src/content/projects/*.md`, fill in the commented fields (`location`, `area`,
`duration`, `year`, `scope`) and a few sentences per project. Detailed case studies
rank better and convince more than photos alone.

## 6. Other channels

- Oferteo / Fixly profiles with a link to the website (competitors there reply within minutes).
- Respond to every enquiry fast — the form promises an answer within 24 hours.

## 7. Languages (PL / EN / UA)

The site has Polish (default, `/`), English (`/en/`) and Ukrainian (`/uk/`) versions with the
same addresses after the prefix. When you change text, change it in all three:

- Page text: `src/i18n/pl.ts`, `en.ts`, `uk.ts` (same structure in each file).
- Service pages: `src/content/services/pl|en|uk/<same file name>.md`.
- Project titles: the `translations:` block in each `src/content/projects/*.md`.

Form submissions always arrive with Polish field values, plus a "Język strony" field
saying which language the visitor used.
