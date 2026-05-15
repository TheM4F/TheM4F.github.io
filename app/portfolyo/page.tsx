import { basePath, getSiteData } from "@/lib/site-data";
import { HomeInteractions } from "../HomeInteractions";

export const metadata = {
  title: "Portfolyo | Stüdyo Genç",
  description: "Stüdyo Genç'in gerçek anlardan, özel günlerden ve emek verilen işlerden seçilmiş fotoğraf, video ve drone hikayeleri.",
  alternates: {
    canonical: "/portfolyo/",
  },
  openGraph: {
    title: "Portfolyo | Stüdyo Genç",
    description: "Düğün, nikah, dış çekim, etkinlik, ürün ve drone çekimlerinden seçilmiş gerçek Stüdyo Genç hikayeleri.",
    url: "https://studyogenc.com/portfolyo/",
    images: [
      {
        url: "/assets/images/dis-cekim/1.webp",
        width: 1200,
        height: 900,
        alt: "Stüdyo Genç portfolyo",
      },
    ],
  },
};

export default async function PortfolioPage() {
  const { config, categories } = await getSiteData();

  return (
    <>
      <header className="site-header solid-header">
        <div className="shell nav-shell">
          <a className="brand-mark" href={`${basePath}/`} aria-label="Stüdyo Genç anasayfa">
            <img src={config.brand.logo} alt="Stüdyo Genç" />
          </a>
          <nav id="siteMenu" className="site-menu" aria-label="Ana menü">
            <a href={`${basePath}/`}>Ana Sayfa</a>
            <a href={`${basePath}/#services`}>Hizmetler</a>
            <a href={`${basePath}/portfolyo/`}>Portfolyo</a>
            <a href={`${basePath}/#about`}>Hikaye</a>
            <a href={`${basePath}/#contact`}>İletişim</a>
          </nav>
          <a className="nav-action" href={config.contact.whatsappLink} target="_blank" rel="noreferrer">
            İletişime Geç
          </a>
          <button className="menu-toggle" data-menu-toggle aria-label="Menüyü aç veya kapat">
            <span />
            <span />
          </button>
        </div>
      </header>

      <main className="portfolio-page-v2">
        <section className="portfolio-hero">
          <div className="shell section-head split-head">
            <div>
              <p className="section-kicker">Portfolyo</p>
              <h1>Portfolyo</h1>
            </div>
            <p>Buradaki her kare, birilerinin heyecanından, emeğinden ya da unutmak istemediği bir günden kaldı. Kendi hikayenizin nasıl hissedilebileceğine buradan bakabilirsiniz.</p>
          </div>
        </section>

        <section className="portfolio-archive shell">
          {categories.map((category) => (
            <div className="archive-group" key={category.folder}>
              <div className="archive-title">
                <h2>{category.name}</h2>
                <span>{category.images.length} kare</span>
              </div>
              <div className="archive-grid">
                {category.images.map((image, index) => (
                  <figure key={image}>
                    <img src={image} alt={`${category.name} ${index + 1}`} loading={index < 4 ? "eager" : "lazy"} />
                    <figcaption>{category.name}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-layout compact-footer">
          <div className="footer-brand">
            <img src={config.brand.logo} alt="Stüdyo Genç" />
            <p>İnsanların kıymetli anlarına sakinlikle eşlik eden, hatıraları doğal ve güçlü bir görsel dile dönüştüren stüdyo.</p>
          </div>
          <div>
            <h3>Kısa Yol</h3>
            <a href={`${basePath}/`}>Ana sayfa</a>
            <a href={`${basePath}/#services`}>Hizmetler</a>
            <a href={`${basePath}/#contact`}>İletişim</a>
          </div>
          <div>
            <h3>İletişim</h3>
            <a href={`tel:${config.contact.phone.replace(/\s+/g, "")}`}>{config.contact.phone}</a>
            <a href={config.contact.whatsappLink} target="_blank" rel="noreferrer">İletişime geç</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Stüdyo Genç. Tüm hakları saklıdır.</span>
          <a href={`${basePath}/`}>Ana sayfaya dön</a>
        </div>
      </footer>

      <HomeInteractions heroSlides={[]} />
    </>
  );
}
