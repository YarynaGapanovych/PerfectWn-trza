# Cleaning e-mails

These e-mails are **not part of the website**. Astro only publishes `src/pages` and `public/`. Only the images of the designed e-mails are on the site, in `public/email/`, so they load in sent e-mails once the site is deployed.

## Which one to use

1. **First contact → plain personal e-mail** (`osobisty-*.txt`). It looks typed by you: no picture, no button. It lands in the main inbox and ends with a question ("Czy mogę przesłać ofertę…?"), which invites a reply and asks permission to send the offer.
2. **After they say yes → designed offer** (`sprzatanie-*.html`), with picture, list and "Poproś o bezpłatną wycenę" button.

| For whom | 1. Plain (first contact) | 2. Designed offer |
| --- | --- | --- |
| Housing communities, property managers | `osobisty-wspolnoty.txt` | `sprzatanie-wspolnoty.html` |
| Offices, shops, service premises | `osobisty-biura.txt` | `sprzatanie-biura.html` |
| Short-term rental owners (Airbnb, Booking) | `osobisty-najem.txt` | `sprzatanie-najem.html` |
| General, all cleaning services | `osobisty-ogolny.txt`, or `osobisty-ogolny.html` (same text, signature with logo) | `sprzatanie-oferta.html` |

## Sending the plain e-mail

1. Open the `.txt` file. The first line is the subject ("Temat: …"); copy it into Gmail's subject field.
2. Copy everything below it into the message.
3. Replace the fields:

| Field | Example |
| --- | --- |
| `{{obiekt}}` (subject) | ul. Lea 12 |
| `{{powitanie}}` | Dzień dobry Panie Tomaszu, |
| `{{dlaczego}}` | Piszę w sprawie budynku przy ul. Lea 12, którym zarządza Pan w imieniu wspólnoty. |

Keep `{{dlaczego}}` to one honest sentence about **why this client**: their building, their office, their apartments. The rest of the e-mail already says what you do.

Gmail turns `perfectwnetrza.pl/sprzatanie` in the signature into a link by itself.

## Sending the simple version with logo (`osobisty-ogolny.html`)

Same text as the plain e-mail, plus a signature with the PerfectWnętrza logo. Fill in the fields in the file, open it in Chrome, select all (`Cmd+A`), copy and paste into Gmail. The logo loads from the website (`public/email/logo-dark.png`), so it shows once the site is deployed.

## Sending the designed offer

Replace `{{powitanie}}` and `{{dlaczego}}` in the `.html` file. The top of each file has an example. Open the file in Chrome, select all (`Cmd+A`), copy (`Cmd+C`) and paste into Gmail. In e-mail tools (MailerLite, Brevo, Mailchimp), paste the code into the "custom HTML" editor and use the tool's own fields, e.g. `{$name}`.

The signature in all e-mails is **Yaryna Hapanovych**.

## Changing the text or design

Don't edit the generated files. Edit `scripts/build-emails.mjs` (texts, signature `SENDER`, layout) and run:

```bash
node scripts/build-emails.mjs
```

## Before sending to new contacts

In Poland, sending a commercial offer by e-mail generally requires the recipient's prior consent, even to a business. The plain e-mail is written to ask that permission ("Czy mogę przesłać ofertę…?"). Send the designed offer to people who said yes or asked for it.
