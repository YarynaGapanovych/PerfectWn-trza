// Shared isometric drawing engine for the PerfectWnętrza illustrations.
// Every scene uses the same 10 × 8 m slab with two back walls, so all images
// share one frame, projection, shadow and palette.

export const S = 46; // px per metre
const C = Math.cos(Math.PI / 6);

export const P = {
	charcoal: '#2b2b2b',
	bronze: '#a4896a',
	stone: '#77746f',
	silver: '#bebebc',
	mist: '#e4e4e1',
	ivory: '#f2f1ed',
	white: '#fbfaf7',
	wood: '#d2bc9f',
	woodDark: '#b89d7c',
	tile: '#dcdbd6',
	concrete: '#cfcdc8',
	glass: '#dfe4e4',
	water: '#d7e0e2',
	leaf: '#7f8b74',
	leafDark: '#6a7562',
	wallFace: '#f4f3ef',
	sofa: '#c9c7c2',
	// "Clean" accent for cleaning tools, wet floor and sparkles (cleaning page only)
	aqua: '#3bb4be',
	aquaLight: '#a6dfe3',
	aquaDark: '#24868f',
	cleanWater: '#cdeef0',
};

// ---------- scene dimensions (metres) ----------
export const W = 10;
export const D = 8;
export const H = 2.6; // back wall height
export const T = 0.18; // wall thickness

// ---------- helpers ----------
export const proj = ([x, y, z]) => [(x - y) * C * S, (x + y) * 0.5 * S - z * S];
export const fmt = (n) => Math.round(n * 10) / 10;

const hex2rgb = (hex) => {
	const n = parseInt(hex.slice(1), 16);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgb2hex = (c) => '#' + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
export const shade = (hex, f) => rgb2hex(hex2rgb(hex).map((v) => v * f));
export const mix = (hex, to, t) => {
	const a = hex2rgb(hex);
	const b = hex2rgb(to);
	return rgb2hex(a.map((v, i) => v + (b[i] - v) * t));
};
// "Faded" version of a colour: desaturate and push towards the page background
export const fade = (hex) => {
	const [r, g, b] = hex2rgb(hex);
	const l = 0.3 * r + 0.59 * g + 0.11 * b;
	return mix(rgb2hex([l, l, l]), '#efeeea', 0.74);
};

// Mild version of `fade` for the cleaning scenes: the room stays recognisable but steps back,
// so the aqua cleaning tools are the focus.
export const soften = (hex) => {
	const [r, g, b] = hex2rgb(hex);
	const l = 0.3 * r + 0.59 * g + 0.11 * b;
	return mix(mix(hex, rgb2hex([l, l, l]), 0.35), '#f4f3ef', 0.3);
};

export const poly = (pts, fill, extra = '') =>
	`<polygon points="${pts.map(proj).map(([a, b]) => `${fmt(a)},${fmt(b)}`).join(' ')}" fill="${fill}"${extra}/>`;
export const line = (a, b, stroke, w = 1, extra = '') => {
	const [x1, y1] = proj(a);
	const [x2, y2] = proj(b);
	return `<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
};
export const flat = (x0, x1, y0, y1, z, fill) => poly([[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], fill);
export function onWall(plane, a0, a1, z0, z1, fill, extra = '') {
	const pts =
		plane === 'y'
			? [[a0, 0, z0], [a1, 0, z0], [a1, 0, z1], [a0, 0, z1]]
			: [[0, a0, z0], [0, a1, z0], [0, a1, z1], [0, a0, z1]];
	return poly(pts, fill, extra);
}
export function leaves(x, y, z, scale, c) {
	const [cx, cy] = proj([x, y, z]);
	const r = 14 * scale;
	return [
		[-8, 4, c(P.leafDark)],
		[8, 2, c(P.leafDark)],
		[0, -6, c(P.leaf)],
		[-5, -2, c(P.leaf)],
		[6, -4, c(P.leaf)],
	]
		.map(([dx, dy, col]) => {
			const ex = fmt(cx + dx * scale);
			const ey = fmt(cy + dy * scale);
			return `<ellipse cx="${ex}" cy="${ey}" rx="${fmt(r * 0.7)}" ry="${fmt(r)}" fill="${col}" transform="rotate(${dx * 3} ${ex} ${ey})"/>`;
		})
		.join('');
}

// ---------- rendering ----------
function drawBox(b, c) {
	const { x0, x1, y0, y1, z0, z1 } = b;
	const color = c(b.color);
	const top = c(b.top ?? b.color);
	const sideY = b.sideY ? c(b.sideY) : shade(color, 0.9);
	const sideX = b.sideX ? c(b.sideX) : shade(color, 0.78);
	const edge = ` stroke-linejoin="round" stroke-width="0.6"`;
	let s = '';
	s += poly([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], sideY, `${edge} stroke="${sideY}"`);
	s += poly([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], sideX, `${edge} stroke="${sideX}"`);
	s += poly([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], top, `${edge} stroke="${top}"`);
	if (b.extra) s += b.extra(c);
	return s;
}

const corners = (b) => {
	const out = [];
	for (const x of [b.x0, b.x1]) for (const y of [b.y0, b.y1]) for (const z of [b.z0, b.z1]) out.push(proj([x, y, z]));
	return out;
};

// fixed frame so every image lines up: slab + back walls
const frame = [{ x0: -T, x1: W, y0: -T, y1: D, z0: -0.3, z1: H }].flatMap(corners);
const pad = 24;
const minX = Math.min(...frame.map((p) => p[0])) - pad;
const minY = Math.min(...frame.map((p) => p[1])) - pad;
export const vw = Math.max(...frame.map((p) => p[0])) + pad - minX;
export const vh = Math.max(...frame.map((p) => p[1])) + pad + 16 - minY;

/** Returns (label) => svg string. */
export function render(boxes, decals, overlays, colourFor) {
	const eps = 1e-6;
	for (const b of boxes) {
		const cs = corners(b);
		b.bb = [Math.min(...cs.map((q) => q[0])), Math.min(...cs.map((q) => q[1])), Math.max(...cs.map((q) => q[0])), Math.max(...cs.map((q) => q[1]))];
		b.depth = (b.x0 + b.x1) / 2 + (b.y0 + b.y1) / 2 + (b.z0 + b.z1) / 2;
	}
	const overlap = (a, b) => a.bb[0] < b.bb[2] && b.bb[0] < a.bb[2] && a.bb[1] < b.bb[3] && b.bb[1] < a.bb[3];
	const behind = (a, b) => a.x1 <= b.x0 + eps || a.y1 <= b.y0 + eps || a.z1 <= b.z0 + eps;

	const slab = boxes.find((b) => b.isSlab);
	const rest = boxes.filter((b) => !b.isSlab);
	const edges = new Map(rest.map((b) => [b, new Set()]));
	const indeg = new Map(rest.map((b) => [b, 0]));
	for (const a of rest)
		for (const b of rest) {
			if (a === b || !overlap(a, b)) continue;
			if (behind(a, b) && !behind(b, a) && !edges.get(a).has(b)) {
				edges.get(a).add(b);
				indeg.set(b, indeg.get(b) + 1);
			}
		}
	const order = [];
	const left = new Set(rest);
	while (left.size) {
		let ready = [...left].filter((b) => indeg.get(b) === 0);
		if (!ready.length) ready = [...left];
		ready.sort((a, b) => a.depth - b.depth);
		const n = ready[0];
		left.delete(n);
		order.push(n);
		for (const m of edges.get(n)) indeg.set(m, indeg.get(m) - 1);
	}

	const sh = [[-T, -T, -0.3], [W, -T, -0.3], [W, D, -0.3], [-T, D, -0.3]]
		.map(proj)
		.map(([a, b]) => `${fmt(a + 10)},${fmt(b + 14)}`)
		.join(' ');

	const body =
		drawBox(slab, (x) => x) +
		decals.map((d) => d.fn(colourFor(d.tags))).join('') +
		order.map((b) => drawBox(b, colourFor(b.tags))).join('') +
		overlays.join('');

	return (label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${fmt(minX)} ${fmt(minY)} ${fmt(vw)} ${fmt(vh)}" width="${Math.round(vw)}" height="${Math.round(vh)}" role="img" aria-label="${label}">
<defs><filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter></defs>
<polygon points="${sh}" fill="#2b2b2b" opacity="0.18" filter="url(#blur)"/>
${body}
</svg>
`;
}

// ---------- shared cleaning props ----------
// Each takes the scene's `box` function: box(tags, x0, x1, y0, y1, z0, z1, color, opts)

/** Mop bucket on wheels with a mop leaning out of it. */
export function mopBucket(box, x, y) {
	box(['clean'], x, x + 0.55, y, y + 0.42, 0.06, 0.42, P.aqua, {
		extra: () => flat(x + 0.06, x + 0.49, y + 0.06, y + 0.36, 0.42, P.cleanWater),
	});
	for (const [wx, wy] of [[x + 0.04, y + 0.04], [x + 0.43, y + 0.04], [x + 0.04, y + 0.3], [x + 0.43, y + 0.3]])
		box(['clean'], wx, wx + 0.08, wy, wy + 0.08, 0, 0.06, P.aquaDark);
	// wringer + mop handle
	box(['clean'], x + 0.38, x + 0.55, y + 0.08, y + 0.34, 0.42, 0.56, P.aquaDark);
	box(['clean'], x + 0.22, x + 0.28, y + 0.18, y + 0.24, 0.3, 1.45, P.white);
}

/** Folding "wet floor" A-frame sign. */
export function wetSign(box, x, y) {
	box(['clean'], x, x + 0.06, y, y + 0.42, 0, 0.62, P.aqua, {
		extra: () => line([x + 0.06, y + 0.21, 0.2], [x + 0.06, y + 0.21, 0.42], P.white, 2.2) + poly([[x + 0.061, y + 0.12, 0.47], [x + 0.061, y + 0.3, 0.47], [x + 0.061, y + 0.21, 0.56]], P.white),
	});
	box(['clean'], x - 0.22, x - 0.16, y, y + 0.42, 0, 0.5, P.aquaDark);
}

/** Cleaning trolley: frame, bin bag, bucket and bottles. */
export function cart(box, x, y) {
	box(['clean'], x, x + 0.9, y, y + 0.5, 0.08, 0.14, P.aquaDark);
	for (const [wx, wy] of [[x + 0.04, y + 0.04], [x + 0.78, y + 0.04], [x + 0.04, y + 0.38], [x + 0.78, y + 0.38]])
		box(['clean'], wx, wx + 0.08, wy, wy + 0.08, 0, 0.08, P.charcoal);
	box(['clean'], x, x + 0.06, y, y + 0.5, 0.14, 1.0, P.aquaDark);
	box(['clean'], x, x + 0.9, y, y + 0.06, 0.9, 0.96, P.aquaDark);
	box(['clean'], x + 0.08, x + 0.42, y + 0.08, y + 0.44, 0.14, 0.72, P.aquaLight); // bin bag
	box(['clean'], x + 0.5, x + 0.86, y + 0.1, y + 0.42, 0.14, 0.44, P.aqua, { extra: () => flat(x + 0.55, x + 0.81, y + 0.15, y + 0.37, 0.44, P.cleanWater) });
	box(['clean'], x + 0.52, x + 0.62, y + 0.14, y + 0.24, 0.96, 1.18, P.white);
	box(['clean'], x + 0.68, x + 0.78, y + 0.14, y + 0.24, 0.96, 1.14, P.aqua);
	box(['clean'], x + 0.2, x + 0.26, y + 0.2, y + 0.26, 0.72, 1.55, P.white); // broom handle
}

/** Canister vacuum cleaner with hose and floor nozzle. */
export function vacuum(box, x, y) {
	box(['clean'], x, x + 0.5, y, y + 0.34, 0, 0.3, P.aqua, { top: P.aquaLight });
	box(['clean'], x + 0.06, x + 0.18, y + 0.08, y + 0.26, 0.3, 0.36, P.aquaDark);
	box(['clean'], x - 0.55, x - 0.05, y + 0.12, y + 0.2, 0.04, 0.09, P.silver); // hose on the floor
	box(['clean'], x - 0.85, x - 0.55, y + 0.02, y + 0.3, 0, 0.06, P.aquaDark); // nozzle
	box(['clean'], x - 0.75, x - 0.7, y + 0.14, y + 0.19, 0.06, 0.95, P.silver); // wand
}

/** Four-point sparkles marking clean surfaces. */
export function sparkles(points) {
	return points
		.map(([x, y, z, r = 11]) => {
			const [cx, cy] = proj([x, y, z]);
			const k = r * 0.28;
			const d = `M${fmt(cx)} ${fmt(cy - r)} L${fmt(cx + k)} ${fmt(cy - k)} L${fmt(cx + r)} ${fmt(cy)} L${fmt(cx + k)} ${fmt(cy + k)} L${fmt(cx)} ${fmt(cy + r)} L${fmt(cx - k)} ${fmt(cy + k)} L${fmt(cx - r)} ${fmt(cy)} L${fmt(cx - k)} ${fmt(cy - k)} Z`;
			return `<path d="${d}" fill="${P.aqua}" stroke="${P.white}" stroke-width="1.5" stroke-linejoin="round"/>`;
		})
		.join('');
}
