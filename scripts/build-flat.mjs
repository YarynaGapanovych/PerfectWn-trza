// Generates isometric cutaway illustrations of a flat (living room, bedroom,
// bathroom) in the PerfectWnętrza palette:
//   public/flat.svg              — hero image
//   public/services/<name>.svg   — one per service, highlighting that work
// Run: node scripts/build-flat.mjs
import { mkdirSync, writeFileSync } from 'node:fs';

const S = 46; // px per metre
const C = Math.cos(Math.PI / 6);

const P = {
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
};

// ---------- helpers ----------
const proj = ([x, y, z]) => [(x - y) * C * S, (x + y) * 0.5 * S - z * S];
const fmt = (n) => Math.round(n * 10) / 10;

const hex2rgb = (hex) => {
	const n = parseInt(hex.slice(1), 16);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgb2hex = (c) => '#' + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
const shade = (hex, f) => rgb2hex(hex2rgb(hex).map((v) => v * f));
const mix = (hex, to, t) => {
	const a = hex2rgb(hex);
	const b = hex2rgb(to);
	return rgb2hex(a.map((v, i) => v + (b[i] - v) * t));
};
// "Faded" version of a colour: desaturate and push towards the page background
const fade = (hex) => {
	const [r, g, b] = hex2rgb(hex);
	const l = 0.3 * r + 0.59 * g + 0.11 * b;
	return mix(rgb2hex([l, l, l]), '#efeeea', 0.74);
};

const poly = (pts, fill, extra = '') =>
	`<polygon points="${pts.map(proj).map(([a, b]) => `${fmt(a)},${fmt(b)}`).join(' ')}" fill="${fill}"${extra}/>`;
const line = (a, b, stroke, w = 1, extra = '') => {
	const [x1, y1] = proj(a);
	const [x2, y2] = proj(b);
	return `<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" stroke="${stroke}" stroke-width="${w}"${extra}/>`;
};
const flat = (x0, x1, y0, y1, z, fill) => poly([[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], fill);
function onWall(plane, a0, a1, z0, z1, fill, extra = '') {
	const pts =
		plane === 'y'
			? [[a0, 0, z0], [a1, 0, z0], [a1, 0, z1], [a0, 0, z1]]
			: [[0, a0, z0], [0, a1, z0], [0, a1, z1], [0, a0, z1]];
	return poly(pts, fill, extra);
}
function leaves(x, y, z, scale, c) {
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

// ---------- layout constants (metres) ----------
const W = 10;
const D = 8;
const H = 2.6; // back wall height
const h = 1.0; // cut height of interior walls
const T = 0.18; // wall thickness
const XP = 4.4; // partition: bedroom/bath | living room
const YP = 4.7; // partition: bedroom | bathroom

/**
 * Build one scene.
 * opts.focus(tags)  -> true keeps full colour, false fades the item (undefined = no fading)
 * opts.furniture    -> include furniture (default true)
 * opts.kitchen      -> add a kitchenette in the living room
 * opts.bookcase     -> add a built-in bookcase in the living room
 * opts.renovation   -> raw flat under renovation (bare floors, building materials)
 * opts.painting     -> walls being painted, floor being laid
 * opts.pins         -> check-mark pins above each room
 * opts.keys         -> keys on the dining table
 */
function buildScene(opts = {}) {
	const furniture = opts.furniture !== false;
	const focus = opts.focus;
	const colourFor = (tags) => (focus && !focus(tags) ? fade : (c) => c);

	const boxes = [];
	const decals = [];
	const overlays = [];
	const box = (tags, x0, x1, y0, y1, z0, z1, color, o = {}) => boxes.push({ tags, x0, x1, y0, y1, z0, z1, color, ...o });
	const decal = (tags, fn) => decals.push({ tags, fn });

	// ----- slab and floors -----
	box(['structure'], -T, W, -T, D, -0.3, 0, P.ivory, { sideY: P.stone, sideX: shade(P.stone, 0.82), isSlab: true });

	const woodTags = ['floor', 'floor-wood'];
	if (opts.renovation) {
		decal(['floor', 'raw'], (c) => flat(0, W, 0, D, 0, c(P.concrete)));
		decal(['floor', 'raw'], (c) =>
			Array.from({ length: 6 }, (_, i) => line([1 + i * 1.6, 0.4, 0], [0.4 + i * 1.6, 1.8, 0], c('#bdbbb5'), 0.8)).join(''),
		);
	} else {
		decal(woodTags, (c) => flat(0, XP, 0, YP, 0, c(P.wood)));
		const livingWoodTo = opts.painting ? 7.2 : W;
		decal(woodTags, (c) => flat(XP, livingWoodTo, 0, D, 0, c(P.wood)));
		if (opts.painting) decal(['floor', 'raw'], (c) => flat(livingWoodTo, W, 0, D, 0, c(P.concrete)));
		decal(['floor', 'floor-tile', 'room:bath'], (c) => flat(0, XP, YP, D, 0, c(P.tile)));
		decal(woodTags, (c) => {
			let s = '';
			for (let y = 0.35; y < D; y += 0.35) {
				s += line([XP, y, 0], [livingWoodTo, y, 0], c(P.woodDark), 0.6, ' opacity="0.45"');
				if (y < YP) s += line([0, y, 0], [XP, y, 0], c(P.woodDark), 0.6, ' opacity="0.45"');
			}
			return s;
		});
		decal(['floor', 'floor-tile', 'room:bath'], (c) => {
			let s = '';
			for (let v = 0.5; v < XP; v += 0.5) s += line([v, YP, 0], [v, D, 0], c('#c4c3be'), 0.6);
			for (let v = YP + 0.5; v < D; v += 0.5) s += line([0, v, 0], [XP, v, 0], c('#c4c3be'), 0.6);
			return s;
		});
	}

	if (furniture) {
		decal(['rug', 'room:living'], (c) => flat(5.3, 8.9, 1.15, 3.25, 0.01, c(P.mist)) + flat(5.45, 8.75, 1.3, 3.1, 0.012, c('#ecebe7')));
		decal(['rug', 'room:bed'], (c) => flat(1.4, 3.3, 0.75, 3.35, 0.01, c(P.silver)));
		decal(['rug', 'room:bath'], (c) => flat(1.25, 1.85, 5.6, 7.1, 0.01, c(P.silver)));
		if (!opts.kitchen) decal(['rug', 'room:living'], (c) => flat(6.2, 9.0, 5.3, 7.7, 0.01, c('#ddd6cb')));
	}

	// ----- walls -----
	const cut = P.charcoal;
	const paintedTo = opts.painting ? 3.1 : 0; // bedroom back wall freshly painted up to x = 3.1
	box(['wall'], -T, W, -T, 0, 0, H, P.wallFace, {
		top: cut,
		sideY: P.wallFace,
		extra: (c) => {
			let s = '';
			if (paintedTo) {
				s += onWall('y', 0, paintedTo, 0, H, '#d9c8b2');
				s += onWall('y', paintedTo, paintedTo + 0.35, 0.9, 1.9, '#e2d5c4');
			}
			s +=
				onWall('y', 0.9, 2.5, 0.9, 2.2, P.glass, ` stroke="${P.charcoal}" stroke-width="2"`) +
				line([1.7, 0, 0.9], [1.7, 0, 2.2], P.charcoal, 1.5) +
				onWall('y', 0.8, 2.6, 0.82, 0.9, P.silver) +
				onWall('y', 8.8, 9.7, 0.35, 2.3, P.glass, ` stroke="${P.charcoal}" stroke-width="2"`) +
				line([9.25, 0, 0.35], [9.25, 0, 2.3], P.charcoal, 1.5);
			if (furniture) {
				const tc = colourFor(['tv', 'room:living']);
				s += onWall('y', 6.0, 8.2, 0.95, 2.05, tc(P.charcoal)) + onWall('y', 6.06, 8.14, 1.0, 2.0, tc('#3a3a3a'));
				if (!opts.bookcase) {
					const jc = colourFor(['joinery', 'room:living']);
					s +=
						onWall('y', 4.75, 5.6, 1.45, 1.5, jc(P.bronze)) +
						onWall('y', 4.85, 4.95, 1.5, 1.75, jc(P.stone)) +
						onWall('y', 4.97, 5.05, 1.5, 1.7, jc(P.charcoal)) +
						onWall('y', 5.07, 5.18, 1.5, 1.78, jc(P.bronze));
				}
			}
			return s;
		},
	});
	box(['wall'], -T, 0, 0, D, 0, H, P.wallFace, {
		top: cut,
		sideX: shade(P.wallFace, 0.86),
		extra: (c) => {
			let s = '';
			if (furniture) {
				const ac = colourFor(['art', 'room:bed']);
				s += onWall('x', 1.35, 2.65, 1.3, 2.05, ac(P.bronze)) + onWall('x', 1.42, 2.58, 1.36, 1.99, ac(P.ivory)) + onWall('x', 1.75, 2.25, 1.5, 1.85, ac(P.stone));
			}
			s += onWall('x', 6.0, 7.1, 1.45, 2.25, P.glass, ` stroke="${P.charcoal}" stroke-width="2"`);
			if (!opts.renovation) {
				const bc = colourFor(['tiles', 'room:bath']);
				s += onWall('x', YP + 0.1, D, 0, 1.2, bc('#e7e6e2'));
				for (let i = 0; i <= 10; i++) s += line([0, YP + 0.1 + i * 0.3, 0], [0, YP + 0.1 + i * 0.3, 1.2], bc('#cfcdc8'), 0.6);
				s += line([0, YP + 0.1, 0.6], [0, D, 0.6], bc('#cfcdc8'), 0.6);
			}
			return s;
		},
	});

	// interior partitions (cut low so rooms are visible)
	const part = { top: cut };
	box(['wall'], XP, XP + T, 0, 3.4, 0, h, P.wallFace, part);
	if (opts.renovation) {
		// partition being rebuilt: low course of blocks + stacked blocks nearby
		box(['work'], XP, XP + T, 4.3, 5.3, 0, 0.45, '#c9b79f', { top: '#d8c8b2' });
	} else {
		box(['wall'], XP, XP + T, 4.3, 5.3, 0, h, P.wallFace, part);
	}
	box(['wall'], XP, XP + T, 6.2, D, 0, h, P.wallFace, part);
	box(['wall'], 0, XP, YP, YP + T, 0, h, P.wallFace, part);

	// ----- furniture -----
	if (furniture) {
		const bed = ['room:bed'];
		const bath = ['room:bath'];
		const liv = ['room:living'];

		// bedroom
		box([...bed, 'joinery'], 0, 0.16, 1.0, 3.0, 0, 1.1, P.bronze);
		box([...bed, 'joinery'], 0.16, 2.45, 1.0, 3.0, 0, 0.32, P.charcoal);
		box([...bed, 'textile'], 0.2, 0.95, 1.04, 2.96, 0.32, 0.58, P.white);
		box([...bed, 'textile'], 0.95, 2.47, 0.98, 3.02, 0.32, 0.64, '#d9d5cd');
		box([...bed, 'textile'], 1.9, 2.47, 0.98, 3.02, 0.64, 0.67, P.bronze);
		box([...bed, 'textile'], 0.28, 0.82, 1.18, 1.92, 0.58, 0.74, P.white);
		box([...bed, 'textile'], 0.28, 0.82, 2.08, 2.82, 0.58, 0.74, P.white);
		box([...bed, 'joinery'], 0.04, 0.52, 0.42, 0.88, 0, 0.5, P.bronze);
		box([...bed, 'decor'], 0.18, 0.36, 0.56, 0.74, 0.5, 0.82, P.ivory);
		box([...bed, 'joinery'], 0.04, 0.52, 3.12, 3.58, 0, 0.5, P.bronze);
		box([...bed, 'joinery'], 2.95, 4.35, 0, 0.62, 0, 2.15, '#c8b398', {
			extra: (c) =>
				line([3.65, 0.62, 0.05], [3.65, 0.62, 2.1], c('#a8937a'), 1) +
				line([3.55, 0.62, 1.0], [3.55, 0.62, 1.3], c(P.charcoal), 2) +
				line([3.75, 0.62, 1.0], [3.75, 0.62, 1.3], c(P.charcoal), 2),
		});
		box([...bed, 'decor'], 3.75, 4.15, 3.85, 4.25, 0, 0.42, P.charcoal, { extra: (c) => leaves(3.95, 4.05, 0.8, 0.9, c) });

		// bathroom
		box([...bath, 'sanitary'], 0.04, 1.0, YP + 0.25, 7.75, 0, 0.56, P.white, {
			extra: (c) => flat(0.14, 0.9, YP + 0.35, 7.65, 0.56, c(P.water)),
		});
		box([...bath, 'joinery'], 1.45, 2.85, YP + T + 0.02, YP + T + 0.55, 0, 0.78, P.bronze);
		box([...bath, 'sanitary'], 1.4, 2.9, YP + T, YP + T + 0.6, 0.78, 0.84, P.white, {
			extra: (c) => flat(1.85, 2.45, YP + T + 0.12, YP + T + 0.45, 0.84, c(P.water)),
		});
		box([...bath, 'sanitary'], 3.3, 3.92, YP + T, YP + T + 0.3, 0, 0.78, P.white);
		box([...bath, 'sanitary'], 3.38, 3.84, YP + T + 0.3, YP + T + 0.82, 0, 0.42, P.white, {
			extra: (c) => flat(3.45, 3.77, YP + T + 0.36, YP + T + 0.76, 0.42, c('#eceae6')),
		});
		box([...bath, 'sanitary'], 0.04, 0.3, 7.82, D - 0.02, 0, 0.9, P.silver);

		// living room
		box([...liv, 'joinery'], 5.5, 8.7, 0.02, 0.48, 0.12, 0.5, P.bronze, {
			extra: (c) => line([7.1, 0.48, 0.14], [7.1, 0.48, 0.48], c(shade(P.bronze, 0.7)), 1),
		});
		box([...liv, 'sofa'], 5.6, 8.6, 3.45, 4.3, 0, 0.42, P.sofa);
		box([...liv, 'sofa'], 5.6, 8.6, 4.3, 4.6, 0, 0.88, P.sofa);
		box([...liv, 'sofa'], 5.35, 5.6, 3.45, 4.6, 0, 0.62, shade(P.sofa, 0.96));
		box([...liv, 'sofa'], 8.6, 8.85, 3.45, 4.6, 0, 0.62, shade(P.sofa, 0.96));
		box([...liv, 'sofa'], 5.8, 6.35, 4.05, 4.3, 0.42, 0.8, P.charcoal);
		box([...liv, 'sofa'], 7.85, 8.4, 4.05, 4.3, 0.42, 0.8, P.bronze);
		box([...liv, 'sofa'], 6.5, 7.6, 3.5, 4.28, 0.42, 0.47, '#f3f2ee');
		box([...liv, 'table'], 6.35, 7.85, 2.0, 2.6, 0, 0.36, P.charcoal);
		box([...liv, 'decor'], 6.75, 6.9, 2.2, 2.35, 0.36, 0.6, P.bronze);
		box([...liv, 'decor'], 7.2, 7.6, 2.15, 2.4, 0.36, 0.42, P.ivory);
		box([...liv, 'decor'], 9.42, 9.47, 2.18, 2.23, 0.05, 1.45, P.charcoal);
		box([...liv, 'decor'], 9.25, 9.63, 2.01, 2.39, 1.45, 1.7, P.bronze);
		box([...liv, 'decor'], 9.25, 9.65, 2.0, 2.4, 0, 0.05, P.charcoal);
		box([...liv, 'decor'], 9.3, 9.75, 0.35, 0.8, 0, 0.5, P.bronze, { extra: (c) => leaves(9.52, 0.58, 0.95, 1, c) });

		if (opts.bookcase) {
			box([...liv, 'joinery'], 4.7, 5.4, 0.0, 0.4, 0, 2.2, P.bronze, {
				extra: (c) => {
					let s = '';
					for (const z of [0.55, 1.05, 1.55]) s += flat(4.75, 5.35, 0.02, 0.4, z, c(shade(P.bronze, 0.8)));
					return s;
				},
			});
		}

		if (opts.kitchen) {
			// kitchenette along the partition, island in place of the dining table
			const k = [...liv, 'kitchen'];
			box(k, XP + T, XP + T + 0.62, 6.3, 7.95, 0, 0.86, P.bronze);
			box(k, XP + T, XP + T + 0.65, 6.28, 7.97, 0.86, 0.92, P.white, {
				extra: (c) =>
					flat(XP + T + 0.12, XP + T + 0.52, 6.55, 7.05, 0.92, c(P.water)) +
					flat(XP + T + 0.12, XP + T + 0.52, 7.25, 7.8, 0.92, c(P.charcoal)),
			});
			box(k, 6.8, 8.6, 5.9, 6.75, 0, 0.88, P.charcoal);
			box(k, 6.75, 8.65, 5.85, 6.8, 0.88, 0.94, P.white);
			for (const cx of [7.0, 7.9]) box([...liv, 'chair'], cx, cx + 0.45, 6.95, 7.4, 0, 0.62, P.silver);
		} else {
			box([...liv, 'dining'], 6.55, 8.65, 5.95, 7.05, 0.7, 0.77, P.woodDark, {
				extra: (c) =>
					opts.keys
						? flat(7.4, 7.55, 6.3, 6.4, 0.771, c(P.bronze)) + line([7.55, 6.35, 0.772], [7.85, 6.35, 0.772], c(P.bronze), 2.5) + line([7.7, 6.35, 0.772], [7.7, 6.45, 0.772], c(P.bronze), 2)
						: '',
			});
			for (const [lx, ly] of [[6.65, 6.05], [8.47, 6.05], [6.65, 6.87], [8.47, 6.87]])
				box([...liv, 'dining'], lx, lx + 0.08, ly, ly + 0.08, 0, 0.7, P.charcoal);
			for (const cx of [6.9, 7.85]) {
				box([...liv, 'dining'], cx, cx + 0.5, 5.45, 5.9, 0, 0.45, P.silver);
				box([...liv, 'dining'], cx, cx + 0.5, 5.45, 5.53, 0.45, 1.0, P.charcoal);
				box([...liv, 'dining'], cx, cx + 0.5, 7.12, 7.57, 0, 0.45, P.silver);
				box([...liv, 'dining'], cx, cx + 0.5, 7.49, 7.57, 0.45, 1.0, P.charcoal);
			}
		}
	}

	// ----- work props -----
	const ladder = (x, y) => {
		box(['work'], x, x + 0.07, y, y + 0.07, 0, 1.7, P.bronze);
		box(['work'], x, x + 0.07, y + 0.55, y + 0.62, 0, 1.7, P.bronze);
		for (const z of [0.4, 0.8, 1.2, 1.6]) box(['work'], x, x + 0.07, y + 0.07, y + 0.55, z, z + 0.05, P.charcoal);
	};
	const bucket = (x, y, col = P.white) =>
		box(['work'], x, x + 0.35, y, y + 0.35, 0, 0.4, col, { extra: () => flat(x + 0.05, x + 0.3, y + 0.05, y + 0.3, 0.4, P.bronze) });

	if (opts.renovation) {
		ladder(2.2, 1.6);
		bucket(1.3, 2.6, P.silver);
		// blocks stacked for the new partition
		box(['work'], 3.0, 3.8, 5.6, 6.2, 0, 0.3, '#c9b79f', { top: '#d8c8b2' });
		box(['work'], 3.1, 3.7, 5.65, 6.15, 0.3, 0.6, '#c9b79f', { top: '#d8c8b2' });
		// boxes and sacks in the living room
		box(['work'], 6.0, 6.8, 1.5, 2.2, 0, 0.55, '#b89d7c');
		box(['work'], 6.1, 6.7, 1.6, 2.1, 0.55, 0.95, '#c4ab8c');
		box(['work'], 7.4, 8.4, 2.2, 2.75, 0, 0.3, P.silver);
		box(['work'], 7.5, 8.3, 2.25, 2.7, 0.3, 0.55, P.mist);
		box(['work'], 8.2, 8.8, 5.0, 5.4, 0, 0.32, P.charcoal, { extra: () => flat(8.3, 8.7, 5.15, 5.25, 0.321, P.bronze) });
		ladder(7.0, 5.6);
		bucket(5.6, 6.6);
		bucket(6.05, 6.75, P.silver);
	}
	if (opts.painting) {
		ladder(2.0, 1.2);
		// paint tray with roller
		box(['work'], 1.0, 1.55, 2.3, 2.75, 0, 0.08, P.silver, { extra: () => flat(1.08, 1.47, 2.38, 2.67, 0.081, '#d9c8b2') });
		box(['work'], 1.15, 1.2, 2.3, 2.7, 0.08, 0.14, P.charcoal);
		bucket(2.9, 2.2);
		// stack of floor panels and a few loose ones
		box(['work'], 7.6, 9.4, 1.0, 1.6, 0, 0.12, P.woodDark, { top: P.wood });
		box(['work'], 7.7, 9.3, 1.05, 1.55, 0.12, 0.2, P.woodDark, { top: P.wood });
		box(['work'], 7.25, 9.0, 4.0, 4.35, 0, 0.02, P.wood);
		box(['work'], 7.25, 8.4, 4.4, 4.75, 0, 0.02, P.wood);
		bucket(8.6, 6.4, P.silver);
	}

	// ----- pins -----
	if (opts.pins) {
		for (const [x, y] of [[2.0, 2.3], [2.4, 6.4], [7.2, 3.0], [7.6, 6.5]]) {
			const [bx, by] = proj([x, y, 0]);
			const [px, py] = proj([x, y, 2.15]);
			overlays.push(
				`<ellipse cx="${fmt(bx)}" cy="${fmt(by)}" rx="10" ry="5" fill="${P.charcoal}" opacity="0.2"/>` +
					`<line x1="${fmt(bx)}" y1="${fmt(by)}" x2="${fmt(px)}" y2="${fmt(py)}" stroke="${P.charcoal}" stroke-width="2"/>` +
					`<circle cx="${fmt(px)}" cy="${fmt(py)}" r="17" fill="${P.bronze}" stroke="${P.white}" stroke-width="3"/>` +
					`<path d="M${fmt(px - 7)} ${fmt(py)} l5 5 l9 -10" fill="none" stroke="${P.white}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
			);
		}
	}

	return render(boxes, decals, overlays, colourFor);
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
const frame = [
	{ x0: -T, x1: W, y0: -T, y1: D, z0: -0.3, z1: H },
].flatMap(corners);
const pad = 24;
const minX = Math.min(...frame.map((p) => p[0])) - pad;
const minY = Math.min(...frame.map((p) => p[1])) - pad;
const vw = Math.max(...frame.map((p) => p[0])) + pad - minX;
const vh = Math.max(...frame.map((p) => p[1])) + pad + 16 - minY;

function render(boxes, decals, overlays, colourFor) {
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

// ---------- outputs ----------
const has = (...want) => (tags) => want.some((t) => tags.includes(t));

const outputs = [
	['flat.svg', buildScene(), 'Ilustracja mieszkania: salon z jadalnią, sypialnia i łazienka'],
	['services/wykonczenia.svg', buildScene({ keys: true, pins: false }), 'Mieszkanie wykończone pod klucz'],
	['services/remonty.svg', buildScene({ furniture: false, renovation: true }), 'Mieszkanie w trakcie remontu'],
	['services/lazienki-kuchnie.svg', buildScene({ kitchen: true, focus: has('room:bath', 'kitchen', 'floor-tile', 'tiles') }), 'Wyróżniona łazienka i aneks kuchenny'],
	['services/zabudowy.svg', buildScene({ bookcase: true, focus: has('joinery') }), 'Wyróżnione zabudowy i meble na wymiar'],
	['services/malowanie-podlogi.svg', buildScene({ furniture: false, painting: true }), 'Malowanie ścian i układanie podłóg'],
	['services/nadzor.svg', buildScene({ pins: true }), 'Mieszkanie z zaznaczonymi etapami prac'],
];

mkdirSync(new URL('../public/services/', import.meta.url), { recursive: true });
for (const [file, svg, label] of outputs) {
	writeFileSync(new URL(`../public/${file}`, import.meta.url), svg(label));
	console.log(`public/${file}`);
}
console.log(`size ${Math.round(vw)}x${Math.round(vh)}`);
