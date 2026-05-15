import fs from "fs/promises";
import path from "path";

export type Category = {
  name: string;
  folder: string;
  images: string[];
};

export type SiteConfig = {
  siteTitle: string;
  metaDescription: string;
  brand: { logo: string };
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsappLink: string;
  };
  socialMedia: Array<{ name: string; icon?: string; url: string }>;
  homepage: {
    heroSubtitle: string;
    heroSlides: string[];
  };
  about: {
    title: string;
    text: string;
    signature: string;
    stats: Array<{ value: number; label: string }>;
  };
  services: Array<{ title: string; description: string; image: string }>;
  categories: Record<string, string>;
  portfolioOrder: string[];
};

const root = process.cwd();
const publicDir = path.join(root, "public");
const imagesDir = path.join(publicDir, "assets", "images");
const configPath = path.join(publicDir, "config.json");
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function assetPath(value: string) {
  if (!value) return value;
  if (value.startsWith("http")) return value;
  if (value.startsWith("/")) return `${basePath}${value}`;
  return `${basePath}/${value.replace(/^\/+/, "")}`;
}

async function listImages(folder: string) {
  const dir = path.join(imagesDir, folder);

  try {
    const files = await fs.readdir(dir);
    const byName = new Map<string, string>();

    for (const file of files) {
      if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue;
      const ext = path.extname(file).toLowerCase();
      const base = path.basename(file, ext);
      const previous = byName.get(base);
      if (!previous || ext === ".webp" || ext === ".avif") byName.set(base, file);
    }

    return Array.from(byName.values())
      .sort((a, b) => a.localeCompare(b, "tr", { numeric: true }))
      .map((file) => `${basePath}/assets/images/${folder}/${file}`);
  } catch {
    return [];
  }
}

export async function getSiteData() {
  const raw = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(raw) as SiteConfig;
  const order = Array.isArray(config.portfolioOrder) ? config.portfolioOrder : [];
  const knownFolders = new Set([...order, ...Object.keys(config.categories || {})]);

  const categories: Category[] = [];
  for (const folder of knownFolders) {
    const images = await listImages(folder);
    if (!images.length) continue;
    categories.push({
      folder,
      name: config.categories?.[folder] || folder.replace(/[-_]+/g, " "),
      images,
    });
  }

  categories.sort((a, b) => {
    const ai = order.indexOf(a.folder);
    const bi = order.indexOf(b.folder);
    if (ai === -1 && bi === -1) return a.name.localeCompare(b.name, "tr");
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return {
    config: {
      ...config,
      brand: { ...config.brand, logo: assetPath(config.brand.logo) },
      homepage: {
        ...config.homepage,
        heroSlides: (config.homepage.heroSlides || []).map(assetPath),
      },
      services: config.services.map((service) => ({
        ...service,
        image: assetPath(service.image),
      })),
    },
    categories,
    featuredImages: categories.flatMap((category) =>
      category.images.slice(0, 2).map((image) => ({ image, category: category.name }))
    ),
  };
}
