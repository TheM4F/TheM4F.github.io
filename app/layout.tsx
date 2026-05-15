import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const sora = Sora({
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studyogenc.com"),
  title: "Stüdyo Genç | Elmadağ Fotoğraf, Video & Drone Çekimi",
  description:
    "Ankara Elmadağ'da özel günlerinizi, markanızı ve emeğinizi doğal, sıcak ve yıllar sonra da hissettiren fotoğraf, video ve drone hikayelerine dönüştürüyoruz.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Stüdyo Genç | Elmadağ Fotoğraf, Video & Drone Çekimi",
    description:
      "Düğün, nikah, dış çekim, etkinlik, ürün fotoğrafı ve drone çekimlerinde insanın içini ısıtan, doğal ve özenli görsel hikayeler.",
    url: "https://studyogenc.com/",
    siteName: "Stüdyo Genç",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/assets/images/nikah/1.webp",
        width: 1200,
        height: 900,
        alt: "Stüdyo Genç fotoğraf çekimi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stüdyo Genç | Elmadağ Fotoğraf, Video & Drone Çekimi",
    description:
      "Elmadağ'da özel günleri, emekleri ve anıları doğal bir görsel hikayeye dönüştüren fotoğraf, video ve drone stüdyosu.",
    images: ["/assets/images/nikah/1.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Stüdyo Genç",
    url: "https://studyogenc.com/",
    image: "https://studyogenc.com/assets/images/nikah/1.webp",
    logo: "https://studyogenc.com/assets/logo/logo.svg",
    telephone: "+905532204169",
    email: "iletisim@studyogenc.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "İsmetpaşa, Cumhuriyet Cd. 53 A",
      addressLocality: "Elmadağ",
      addressRegion: "Ankara",
      postalCode: "06780",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.91874808994741,
      longitude: 33.23139448133649,
    },
    sameAs: ["https://www.instagram.com/studyo_genc", "https://www.instagram.com/06mef"],
    areaServed: ["Elmadağ", "Ankara"],
    priceRange: "$$",
  };

  return (
    <html lang="tr" className={sora.variable}>
      <head>
        <link rel="preload" as="image" href={`${basePath}/assets/images/nikah/1.webp`} />
        <link rel="preload" as="image" href={`${basePath}/assets/logo/logo.svg`} />
        <link rel="icon" href={`${basePath}/favicon.svg`} type="image/svg+xml" />
        <link rel="shortcut icon" href={`${basePath}/favicon.svg`} type="image/svg+xml" />
        <link rel="stylesheet" href={`${basePath}/assets/css/style.css`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
