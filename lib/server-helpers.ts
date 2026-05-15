import path from "path";
import fs from "fs/promises";
import fssync from "fs";

export const ROOT = process.cwd();
export const PUBLIC_DIR = path.join(ROOT, "public");
export const ASSETS_DIR = path.join(PUBLIC_DIR, "assets");
export const IMAGES_DIR = path.join(ASSETS_DIR, "images");
export const CONFIG_PATH = path.join(PUBLIC_DIR, "config.json");

export async function ensureDir(p: string) {
  if (!fssync.existsSync(p)) await fs.mkdir(p, { recursive: true });
}

export async function loadConfig() {
  const raw = await fs.readFile(CONFIG_PATH, "utf8");
  return JSON.parse(raw);
}

// Prefer webp when the same image exists in multiple formats.
export async function listImagesIn(slug: string) {
  const folder = path.join(IMAGES_DIR, slug);
  if (!fssync.existsSync(folder)) return [];

  const files = await fs.readdir(folder);
  const candidates = files.filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

  const byBaseName = new Map<string, string>();
  for (const filename of candidates) {
    const ext = path.extname(filename).toLowerCase();
    const base = path.basename(filename, ext);
    const previous = byBaseName.get(base);
    if (!previous || ext === ".webp") byBaseName.set(base, filename);
  }

  return Array.from(byBaseName.values())
    .sort((a, b) => a.localeCompare(b, "tr", { numeric: true }))
    .map((filename) => ({
      filename,
      url: path.posix.join("assets", "images", slug, filename),
    }));
}
