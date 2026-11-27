# E-maile z ofertą sprzątania

These HTML e-mails are **not part of the website**. Astro only publishes `src/pages` and `public/`. Only their images are on the site, in `public/email/`, so they load in sent e-mails once the site is deployed.

| File | For whom | Subject |
| --- | --- | --- |
| `sprzatanie-wspolnoty.html` | Housing communities, property managers | Sprzątanie klatek schodowych — {{obiekt}} |
| `sprzatanie-biura.html` | Offices, shops, service premises | Sprzątanie biura — {{obiekt}} |
| `sprzatanie-najem.html` | Short-term rental owners (Airbnb, Booking) | Sprzątanie apartamentów — {{obiekt}} |
| `sprzatanie-oferta.html` | General, all cleaning services | Sprzątanie w Krakowie — wysoka jakość, bezpłatna wycena |

## Fill in before sending

| Field | Example |
| --- | --- |
| `{{powitanie}}` | Dzień dobry Panie Tomaszu, |
| `{{dlaczego}}` | Piszę w sprawie budynku przy ul. Lea 12 — sprzątamy klatki schodowe w tej okolicy i chętnie przygotujemy wycenę. |
| `{{obiekt}}` (subject only) | ul. Lea 12 |

The signature is **Yaryna Hapanovych**. To change it, edit `SENDER` in `scripts/build-emails.mjs` and rebuild.

Each file has a ready example of the `{{dlaczego}}` sentence in the comment at the top. Write your own for each client: one honest sentence about **why this client**. It matters more than anything else in the e-mail.

E-mail tools such as MailerLite, Brevo or Mailchimp can fill these fields in automatically from a contact list. Rename them to the tool's own format, e.g. `{$name}`. When sending one by one, replace them by hand.

## Changing the design or text

Don't edit the HTML files directly. Edit `scripts/build-emails.mjs` (layout + text of each version) and run:

```bash
node scripts/build-emails.mjs
```

## Before sending to new contacts

In Poland, sending a commercial offer by e-mail generally requires the recipient's prior consent, even to a business. Send these to people who asked for an offer or already know you. Otherwise, first ask by phone or a short personal message whether you may send it.
