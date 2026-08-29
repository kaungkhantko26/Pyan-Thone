// Minimal dependency-free PNG icon generator for the PWA.
// Produces a solid brand-blue rounded tile with a white "P" glyph.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const BLUE = [0x25, 0x63, 0xeb];
const WHITE = [0xff, 0xff, 0xff];
const BG = [0xf8, 0xf8, 0xf5];

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const t = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([t, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function png(size) {
  const s = size;
  const r = s * 0.22; // corner radius
  // simple bitmap font "P": bounding box in a 0..1 space
  const px = (x, y) => {
    // rounded-rect mask
    const inCorner =
      (x < r && y < r && (x - r) ** 2 + (y - r) ** 2 > r * r) ||
      (x > s - r && y < r && (x - (s - r)) ** 2 + (y - r) ** 2 > r * r) ||
      (x < r && y > s - r && (x - r) ** 2 + (y - (s - r)) ** 2 > r * r) ||
      (x > s - r && y > s - r && (x - (s - r)) ** 2 + (y - (s - r)) ** 2 > r * r);
    if (inCorner) return BG;

    // "P" glyph geometry (normalized to size)
    const gx = x / s;
    const gy = y / s;
    const stem = gx > 0.3 && gx < 0.42 && gy > 0.24 && gy < 0.76;
    const bowlOuter = (gx - 0.42) ** 2 / 0.22 ** 2 + (gy - 0.37) ** 2 / 0.15 ** 2 < 1 && gx > 0.36;
    const bowlInner = (gx - 0.42) ** 2 / 0.11 ** 2 + (gy - 0.37) ** 2 / 0.075 ** 2 < 1 && gx > 0.36;
    if ((stem || bowlOuter) && !bowlInner) return WHITE;
    return BLUE;
  };

  const raw = Buffer.alloc((s * 3 + 1) * s);
  let o = 0;
  for (let y = 0; y < s; y++) {
    raw[o++] = 0; // filter: none
    for (let x = 0; x < s; x++) {
      const [rr, gg, bb] = px(x, y);
      raw[o++] = rr;
      raw[o++] = gg;
      raw[o++] = bb;
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(s, 0);
  ihdr.writeUInt32BE(s, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

mkdirSync(new URL("../public/icons/", import.meta.url), { recursive: true });
for (const size of [192, 512]) {
  const out = new URL(`../public/icons/icon-${size}.png`, import.meta.url);
  writeFileSync(out, png(size));
  console.log("wrote", out.pathname);
}
