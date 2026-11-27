// Generates the cleaning e-mails in emails/: plain personal ones for first contact (osobisty-*.txt)
// and designed offers (sprzatanie-*.html) from one shared layout.
// These e-mails are NOT part of the website (emails/ is outside src/ and public/).
// Images load from https://perfectwnetrza.pl/email/ (files in public/email/), so they
// appear in sent e-mails once the site is deployed.
//
// Personal fields — replace before sending (or let your e-mail tool fill them in):
//   {{powitanie}}  greeting line, e.g. "Dzień dobry Panie Tomaszu,"
//   {{dlaczego}}   one sentence on why you write to this client
//   {{obiekt}}     (subject line only) their building / company, e.g. "ul. Lea 12"
//
// Run: node scripts/build-emails.mjs
import { writeFileSync } from 'node:fs';

const SITE = 'https://perfectwnetrza.pl';
const PHONE = '+48 791 567 011';
const PHONE_HREF = 'tel:+48791567011';
const EMAIL = 'contact@perfectwnetrza.pl';
/** Name in the signature of every e-mail. */
const SENDER = 'Yaryna Hapanovych';

const variants = [
	{
		file: 'sprzatanie-oferta.html',
		label: 'ogólna (wszystkie usługi)',
		subject: 'Sprzątanie w Krakowie — wysoka jakość, bezpłatna wycena',
		preheader: 'Dokładne, staranne sprzątanie w Krakowie — jednorazowo lub regularnie. Wycena bezpłatna.',
		image: 'sprzatanie-hero.jpg',
		imageAlt: 'Ilustracja mieszkania w trakcie sprzątania',
		title: 'Profesjonalne sprzątanie',
		accent: 'w wysokiej jakości',
		intro: 'Sprzątamy dokładnie i starannie — jednorazowo lub regularnie, w zakresie dopasowanym do Państwa obiektu.',
		listTitle: 'Co sprzątamy',
		items: ['Klatki schodowe', 'Biura i lokale', 'Mieszkania po remoncie', 'Szkoły i obiekty publiczne', 'Mieszkania na doby'],
		cta: `${SITE}/sprzatanie/#kontakt`,
		example: 'Piszę, ponieważ prowadzą Państwo obiekt w Krakowie i chętnie przygotujemy dla niego bezpłatną wycenę sprzątania.',
		// Plain personal e-mail (first contact): looks typed, no images or button.
		plain: {
			file: 'osobisty-ogolny.txt',
			// Also build a simple HTML version (typed-looking text + signature with logo).
			html: 'osobisty-ogolny.html',
			subject: 'Sprzątanie – {{obiekt}}',
			what: 'Zajmujemy się sprzątaniem klatek schodowych, biur i lokali, mieszkań po remoncie oraz mieszkań na wynajem krótkoterminowy.',
			how: 'Sprzątamy dokładnie i starannie – jednorazowo lub regularnie, w zakresie dopasowanym do obiektu.',
		},
	},
	{
		file: 'sprzatanie-wspolnoty.html',
		label: 'wspólnoty mieszkaniowe i zarządcy',
		subject: 'Sprzątanie klatek schodowych — {{obiekt}}',
		preheader: 'Regularne, dokładne sprzątanie klatek schodowych w Krakowie. Wycena bezpłatna.',
		image: 'sprzatanie-klatki.jpg',
		imageAlt: 'Ilustracja klatki schodowej w trakcie sprzątania',
		title: 'Czyste klatki schodowe',
		accent: 'w wysokiej jakości',
		intro: 'Sprzątamy klatki schodowe dla wspólnot mieszkaniowych, zarządców i właścicieli budynków — dokładnie i regularnie.',
		listTitle: 'Zakres sprzątania',
		items: ['Mycie schodów, podłóg i poręczy', 'Mycie drzwi i okien na klatce', 'Częstotliwość ustalana indywidualnie'],
		cta: `${SITE}/sprzatanie/#kontakt`,
		example: 'Piszę w sprawie budynku przy ul. Lea 12 — sprzątamy klatki schodowe w tej okolicy i chętnie przygotujemy wycenę.',
		// Plain personal e-mail (first contact): looks typed, no images or button.
		plain: {
			file: 'osobisty-wspolnoty.txt',
			subject: 'Sprzątanie klatek schodowych – {{obiekt}}',
			what: 'Zajmujemy się m.in. sprzątaniem klatek schodowych dla wspólnot mieszkaniowych i zarządców.',
			how: 'Sprzątamy dokładnie i starannie – schody, podłogi, poręcze, drzwi i okna na klatce, regularnie lub jednorazowo.',
		},
	},
	{
		file: 'sprzatanie-biura.html',
		label: 'biura i lokale',
		subject: 'Sprzątanie biura — {{obiekt}}',
		preheader: 'Dokładne sprzątanie biur i lokali w Krakowie — jednorazowo lub regularnie. Wycena bezpłatna.',
		image: 'sprzatanie-biura.jpg',
		imageAlt: 'Ilustracja biura w trakcie sprzątania',
		title: 'Czyste biuro',
		accent: 'w wysokiej jakości',
		intro: 'Sprzątamy biura, sklepy i lokale usługowe — jednorazowo lub regularnie, w terminach ustalonych razem z Państwem.',
		listTitle: 'Co oferujemy',
		items: ['Regularne sprzątanie biur i lokali', 'Terminy dopasowane do Państwa', 'Sprzątanie lokalu po remoncie'],
		cta: `${SITE}/sprzatanie/#kontakt`,
		example: 'Piszę, ponieważ Państwa biuro mieści się przy ul. Kamieńskiej — oferujemy regularne sprzątanie biur w tej okolicy.',
		// Plain personal e-mail (first contact): looks typed, no images or button.
		plain: {
			file: 'osobisty-biura.txt',
			subject: 'Sprzątanie biura – {{obiekt}}',
			what: 'Zajmujemy się m.in. sprzątaniem biur i lokali usługowych.',
			how: 'Sprzątamy dokładnie i starannie – jednorazowo lub regularnie, w terminach dopasowanych do Państwa.',
		},
	},
	{
		file: 'sprzatanie-najem.html',
		label: 'mieszkania na wynajem krótkoterminowy',
		subject: 'Sprzątanie apartamentów — {{obiekt}}',
		preheader: 'Sprzątanie między gośćmi, pościel i ręczniki, uzupełnione zapasy. Wycena bezpłatna.',
		image: 'sprzatanie-najem.jpg',
		imageAlt: 'Ilustracja apartamentu w trakcie sprzątania',
		title: 'Apartament gotowy',
		accent: 'na kolejnego gościa',
		intro: 'Sprzątamy mieszkania na wynajem krótkoterminowy — dokładnie i starannie, tak aby każdy gość zastał czyste wnętrze.',
		listTitle: 'Co robimy',
		items: ['Sprzątanie między gośćmi', 'Wymiana pościeli i ręczników', 'Uzupełnienie podstawowych zapasów'],
		cta: `${SITE}/uslugi/sprzatanie-mieszkan-na-doby/#kontakt`,
		example: 'Piszę, ponieważ prowadzą Państwo apartamenty na Booking w Krakowie — sprzątamy między pobytami gości.',
		// Plain personal e-mail (first contact): looks typed, no images or button.
		plain: {
			file: 'osobisty-najem.txt',
			subject: 'Sprzątanie apartamentów – {{obiekt}}',
			what: 'Zajmujemy się m.in. sprzątaniem mieszkań na wynajem krótkoterminowy.',
			how: 'Sprzątamy dokładnie między pobytami gości – z wymianą pościeli i ręczników oraz uzupełnieniem podstawowych zapasów.',
		},
	},
];

const tick = (text) => `<span style="color:#24868f;">&#10003;</span>&nbsp; ${text}`;

/** Short lists in one column; longer lists (5 items) in two columns. */
function list(items) {
	if (items.length <= 3) {
		return `<td valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:28px; color:#2b2b2b;">
                    ${items.map(tick).join('<br>\n                    ')}
                  </td>`;
	}
	const half = Math.ceil(items.length / 2);
	const col = (part) => `<td class="col" valign="top" width="50%" style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:28px; color:#2b2b2b;">
                    ${part.map(tick).join('<br>\n                    ')}
                  </td>`;
	return `${col(items.slice(0, half))}
                  ${col(items.slice(half))}`;
}

const email = (v) => `<!doctype html>
<html lang="pl" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<!--
  PerfectWnętrza — oferta sprzątania: ${v.label}.
  Generated by scripts/build-emails.mjs — edit the script, not this file.

  Subject: ${v.subject}

  Replace before sending:
    {{powitanie}}  e.g. "Dzień dobry Panie Tomaszu,"
    {{dlaczego}}   e.g. "${v.example}"
-->
<title>Sprzątanie w Krakowie — PerfectWnętrza</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>td, th, div, p, a, h1 { font-family: Arial, Helvetica, sans-serif !important; }</style>
<![endif]-->
<style>
  body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table { border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; }
  img { border: 0; outline: none; text-decoration: none; display: block; -ms-interpolation-mode: bicubic; }
  a { color: #86704f; }
  @media only screen and (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .hero-img { width: 100% !important; height: auto !important; }
    .h1 { font-size: 26px !important; line-height: 32px !important; }
    .col { display: block !important; width: 100% !important; }
    .hide-mobile { display: none !important; }
    .btn { padding: 15px 20px !important; font-size: 13px !important; letter-spacing: 0.5px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#f2f1ed;">

<!-- Preheader: the grey preview line shown next to the subject in the inbox -->
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#f2f1ed;">
  ${v.preheader}
  &#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f1ed;">
<tr>
<td align="center" style="padding:32px 12px;">

  <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff;">

    <!-- Header -->
    <tr>
      <td class="px" style="background-color:#2b2b2b; padding:22px 40px; border-bottom:3px solid #3bb4be;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="middle">
              <a href="${SITE}/sprzatanie/" target="_blank" style="text-decoration:none;">
                <img src="${SITE}/email/logo.png" width="170" height="44" alt="PerfectWnętrza" style="width:170px; height:44px; color:#ffffff; font-family:Arial, sans-serif; font-size:18px;">
              </a>
            </td>
            <td valign="middle" align="right" class="hide-mobile" style="font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:2px; color:#a6dfe3; text-transform:uppercase;">
              Sprzątanie · Kraków
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Image -->
    <tr>
      <td align="center" class="px" style="padding:28px 40px 0;">
        <img class="hero-img" src="${SITE}/email/${v.image}" width="400" height="326" alt="${v.imageAlt}" style="width:400px; height:auto; max-width:100%;">
      </td>
    </tr>

    <!-- Headline -->
    <tr>
      <td class="px" style="padding:20px 40px 0;">
        <h1 class="h1" style="margin:0; font-family:'Montserrat', Arial, Helvetica, sans-serif; font-weight:300; font-size:30px; line-height:38px; color:#2b2b2b;">
          ${v.title} <span style="color:#24868f; font-weight:400;">${v.accent.replaceAll(' ', '&nbsp;')}</span>
        </h1>
      </td>
    </tr>

    <!-- Personal greeting + why we write + who we are -->
    <tr>
      <td class="px" style="padding:16px 40px 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:24px; color:#4a4946;">
        <p style="margin:0 0 12px;">{{powitanie}}</p>
        <p style="margin:0 0 12px;">{{dlaczego}}</p>
        <p style="margin:0;">Jesteśmy <strong style="color:#2b2b2b;">PerfectWnętrza</strong> z&nbsp;Krakowa. ${v.intro}</p>
      </td>
    </tr>

    <!-- List -->
    <tr>
      <td class="px" style="padding:22px 40px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef8f9; border-left:3px solid #3bb4be;">
          <tr>
            <td style="padding:18px 22px 14px;">
              <p style="margin:0 0 8px; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#24868f;">${v.listTitle}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  ${list(v.items)}
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Quality promise -->
    <tr>
      <td class="px" style="padding:20px 40px 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:24px; color:#4a4946;">
        <strong style="color:#2b2b2b;">Stawiamy na wysoką jakość</strong> — dbamy o&nbsp;każdy szczegół, żeby było naprawdę czysto. Wycena jest bezpłatna.
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td class="px" align="center" style="padding:30px 40px 10px;">
        <!--[if mso]>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${v.cta}" style="height:50px; v-text-anchor:middle; width:300px;" arcsize="8%" stroke="f" fillcolor="#a4896a">
          <w:anchorlock/>
          <center style="color:#ffffff; font-family:Arial, sans-serif; font-size:14px; font-weight:bold; letter-spacing:1px;">POPROŚ O BEZPŁATNĄ WYCENĘ</center>
        </v:roundrect>
        <![endif]-->
        <!--[if !mso]><!-->
        <a class="btn" href="${v.cta}" target="_blank" style="display:inline-block; background-color:#a4896a; color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold; letter-spacing:1px; text-transform:uppercase; text-decoration:none; padding:16px 34px; border-radius:4px;">Poproś o bezpłatną wycenę</a>
        <!--<![endif]-->
      </td>
    </tr>
    <tr>
      <td class="px" align="center" style="padding:0 40px 30px; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:22px; color:#77746f;">
        lub zadzwoń: <a href="${PHONE_HREF}" style="color:#2b2b2b; text-decoration:none; font-weight:bold;">${PHONE}</a>
      </td>
    </tr>

    <!-- Personal sign-off -->
    <tr>
      <td class="px" style="padding:0 40px 30px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:24px; color:#4a4946;">
        Pozdrawiam serdecznie,<br>
        <strong style="color:#2b2b2b;">${SENDER}</strong><br>
        <span style="font-size:13px; color:#77746f;">PerfectWnętrza · ${PHONE}</span>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td class="px" style="background-color:#2b2b2b; padding:22px 40px; font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:19px; color:#bebebc;">
        <a href="${PHONE_HREF}" style="color:#bebebc; text-decoration:none;">${PHONE}</a> ·
        <a href="mailto:${EMAIL}" style="color:#bebebc; text-decoration:none;">${EMAIL}</a> ·
        <a href="${SITE}/sprzatanie/" target="_blank" style="color:#a6dfe3; text-decoration:none;">perfectwnetrza.pl</a>
        <p style="margin:10px 0 0; font-size:11px; color:#77746f;">
          Nie chcą Państwo otrzymywać od nas wiadomości? Wystarczy odpowiedzieć słowem „Rezygnuję”.
        </p>
      </td>
    </tr>

  </table>

</td>
</tr>
</table>
</body>
</html>
`;

/**
 * Plain personal e-mail for first contact: reads like a typed message, so it lands in the main
 * inbox and invites a reply. Ends with a question, which also asks consent to send the full offer.
 */
const plainEmail = (v) => `Temat: ${v.plain.subject}

{{powitanie}}

{{dlaczego}}

Nazywam się ${SENDER} i reprezentuję firmę PerfectWnętrza z Krakowa. ${v.plain.what}

${v.plain.how} Stawiamy na wysoką jakość, a wycena jest bezpłatna.

Czy mogę przesłać ofertę albo zadzwonić w dogodnym terminie?

Pozdrawiam serdecznie,
${SENDER}
PerfectWnętrza · ${PHONE}
perfectwnetrza.pl/sprzatanie
`;

/** Simple personal HTML e-mail: plain-looking text, signature with the dark logo. No banner or button. */
const plainHtml = (v) => `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<!--
  PerfectWnętrza — personal e-mail (first contact), simple version with logo.
  Generated by scripts/build-emails.mjs — edit the script, not this file.

  Subject: ${v.plain.subject}

  Replace before sending:
    {{powitanie}}  e.g. "Dzień dobry Panie Tomaszu,"
    {{dlaczego}}   e.g. "Piszę w sprawie lokalu przy ul. Długiej 5, który niedawno został wyremontowany."
-->
<title>${v.plain.subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
<tr>
<td style="padding:24px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
    <tr>
      <td style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:24px; color:#2b2b2b;">
        <p style="margin:0 0 16px;">{{powitanie}}</p>
        <p style="margin:0 0 16px;">{{dlaczego}}</p>
        <p style="margin:0 0 16px;">Nazywam się ${SENDER} i reprezentuję firmę PerfectWnętrza z&nbsp;Krakowa. ${v.plain.what}</p>
        <p style="margin:0 0 16px;">${v.plain.how} <strong>Stawiamy na wysoką jakość</strong>, a&nbsp;wycena jest bezpłatna.</p>
        <p style="margin:0 0 24px;">Czy mogę przesłać ofertę albo zadzwonić w&nbsp;dogodnym terminie?</p>
        <p style="margin:0 0 20px;">Pozdrawiam serdecznie,</p>
      </td>
    </tr>
    <!-- Signature -->
    <tr>
      <td>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="middle" style="padding-right:16px; border-right:2px solid #a4896a;">
              <a href="${SITE}/sprzatanie/" target="_blank" style="text-decoration:none;">
                <img src="${SITE}/email/logo-dark.png" width="150" height="39" alt="PerfectWnętrza" style="display:block; width:150px; height:39px; border:0; font-family:Arial, sans-serif; font-size:14px; color:#2b2b2b;">
              </a>
            </td>
            <td valign="middle" style="padding-left:16px; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#77746f;">
              <strong style="font-size:15px; color:#2b2b2b;">${SENDER}</strong><br>
              PerfectWnętrza · Kraków<br>
              <a href="${PHONE_HREF}" style="color:#2b2b2b; text-decoration:none;">${PHONE}</a><br>
              <a href="mailto:${EMAIL}" style="color:#2b2b2b; text-decoration:none;">${EMAIL}</a><br>
              <a href="${SITE}/sprzatanie/" target="_blank" style="color:#86704f; text-decoration:none;">perfectwnetrza.pl/sprzatanie</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</td>
</tr>
</table>
</body>
</html>
`;

for (const v of variants) {
	if (v.plain.html) {
		writeFileSync(new URL(`../emails/${v.plain.html}`, import.meta.url), plainHtml(v));
		console.log(`emails/${v.plain.html}  (simple HTML with logo, ${v.label})`);
	}
	writeFileSync(new URL(`../emails/${v.plain.file}`, import.meta.url), plainEmail(v));
	console.log(`emails/${v.plain.file}  (plain, ${v.label})`);
}

for (const v of variants) {
	writeFileSync(new URL(`../emails/${v.file}`, import.meta.url), email(v));
	console.log(`emails/${v.file}  (${v.label})`);
}
