import { basePath, getSiteData } from "@/lib/site-data";
import { HeroSlideshow, HomeInteractions } from "./HomeInteractions";

export default async function HomePage() {
  const { config, featuredImages } = await getSiteData();
  const heroSlides = [
    ...(config.homepage.heroSlides || []),
    ...featuredImages.map((item) => item.image),
  ].filter((image, index, list) => image && list.indexOf(image) === index);
  const heroImage = heroSlides[0] || `${basePath}/assets/images/nikah/1.webp`;
  const preview = featuredImages.slice(0, 5);
  const marquee = heroSlides.slice(0, 8);

  return (
    <>
      <header className="site-header">
        <div className="shell nav-shell">
          <a className="brand-mark" href={`${basePath}/`} aria-label="Stüdyo Genç anasayfa">
            <img src={config.brand.logo} alt="Stüdyo Genç" />
          </a>
          <nav id="siteMenu" className="site-menu" aria-label="Ana menü">
            <a href="#home">Ana Sayfa</a>
            <a href="#services">Hizmetler</a>
            <a href="#portfolio">Portfolyo</a>
            <a href="#about">Hikaye</a>
            <a href="#contact">İletişim</a>
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

      <main>
        <section id="home" className="hero-v2">
          <div className="scene-glow scene-glow-one" />
          <div className="scene-glow scene-glow-two" />
          <div className="scene-grid" aria-hidden="true" />

          <div className="shell hero-layout">
            <div className="hero-copy" data-reveal>
              <p className="section-kicker">Elmadağ'da fotoğraf, video ve drone hikayeleri</p>
              <h1>O günü tekrar yaşatacak kareleri, telaşınızı alıp duygunuzu koruyarak çekelim.</h1>
              <p className="hero-lead">
                Sizin için sıradan olmayan anları, doğal halinizle ve yıllar sonra bakınca aynı sıcaklığı hissettirecek bir özenle kaydediyoruz.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#portfolio">Hikayelere Bak</a>
                <a className="button button-glass" href={config.contact.whatsappLink} target="_blank" rel="noreferrer">
                  İletişime Geç
                </a>
              </div>
              <div className="hero-trust" aria-label="Çekim avantajları">
                <span>Yanınızda sakin bir rehberlik</span>
                <span>Zorlama değil, gerçek duygu</span>
                <span>Özenle teslim edilen anılar</span>
              </div>
            </div>

            <div className="hero-showcase" data-reveal>
              <div className="hero-stage" aria-label="Öne çıkan çalışma">
                <HeroSlideshow slides={heroSlides} fallback={heroImage} />
                <div className="hero-glass-line" aria-hidden="true" />
                <div className="hero-card">
                  <span>Stüdyo Genç</span>
                  <strong>Bugünün heyecanını, yarının en değerli hatırasına dönüştürelim.</strong>
                </div>
              </div>
              <div className="floating-badge badge-top">
                <strong>12+</strong>
                <span>yıllık güven</span>
              </div>
              <div className="floating-badge badge-bottom">
                <strong>150K+</strong>
                <span>saklanan an</span>
              </div>
            </div>
          </div>

          <div className="shell hero-marquee" aria-label="Öne çıkan görseller">
            <div className="marquee-track">
              {[...marquee, ...marquee].map((image, index) => (
                <img src={image} alt="" aria-hidden="true" key={`${image}-${index}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="metrics-band" aria-label="Stüdyo özeti">
          <div className="shell metrics-strip" data-reveal>
            <span><strong>150K+</strong> İnsanların dönüp dönüp baktığı kare</span>
            <span><strong>100+</strong> Heyecanına eşlik edilen hikaye</span>
            <span><strong>9</strong> Farklı an, aynı özen</span>
            <span><strong>1</strong> Rahat, açık ve güvenli süreç</span>
          </div>
        </section>

        <section id="services" className="section-block services-block">
          <div className="shell section-head split-head" data-reveal>
            <div>
              <p className="section-kicker">Hizmetler</p>
              <h2>Her çekimde önce sizi rahatlatır, sonra o rahatlığı karelere taşırız.</h2>
            </div>
            <p>
              Çünkü en güzel fotoğraflar, kendinizi kasmadığınız; gününüzün içinde gerçekten var olduğunuz anlarda ortaya çıkar.
            </p>
          </div>

          <div className="shell service-grid">
            {config.services.map((service, index) => (
              <article className="service-tile" data-reveal key={service.title}>
                <img src={service.image} alt={service.title} loading={index < 3 ? "eager" : "lazy"} />
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="section-block portfolio-block">
          <div className="shell section-head split-head" data-reveal>
            <div>
              <p className="section-kicker">Portfolyo</p>
              <h2>Bir bakışta o günün sesi, telaşı, neşesi ve kalbi hissedilsin.</h2>
            </div>
            <a className="text-link" href={`${basePath}/portfolyo/`}>Daha fazla hikaye gör</a>
          </div>

          <div className="shell portfolio-mosaic">
            {preview.map((item, index) => (
              <figure className={index === 0 ? "portfolio-feature" : ""} data-reveal key={`${item.image}-${index}`}>
                <img src={item.image} alt={`${item.category} çekimi`} loading={index < 4 ? "eager" : "lazy"} />
                <figcaption>
                  <strong>{item.category}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="about" className="section-block about-block">
          <div className="shell about-layout">
            <div className="about-portrait" data-reveal>
              <img src={`${basePath}/assets/images/mustafa/1.webp`} alt="Mustafa Genç" loading="lazy" />
            </div>
            <div className="about-copy" data-reveal>
              <p className="section-kicker">Kamera arkasındaki his</p>
              <h2>Ben Mustafa Genç. İnsanların en doğal halini incitmeden görünür kılmayı severim.</h2>
              <p>{config.about.text}</p>
              <div className="about-stats">
                {config.about.stats.map((stat) => (
                  <span key={stat.label}>
                    <strong>{stat.value.toLocaleString("tr-TR")}+</strong>
                    {stat.label}
                  </span>
                ))}
              </div>
              <a className="button button-glass" href="#contact">Gününüzü Konuşalım</a>
            </div>
          </div>
        </section>

        <section id="contact" className="section-block contact-block">
          <div className="shell contact-layout" data-reveal>
            <div>
              <p className="section-kicker">İlk mesaj yeter</p>
              <h2>Aklınızdaki günü anlatın; neye ihtiyacınız olduğunu birlikte sadeleştirelim.</h2>
              <div className="contact-cards">
                <a href={`tel:${config.contact.phone.replace(/\s+/g, "")}`}>
                  <span>Telefon</span>
                  <strong>{config.contact.phone}</strong>
                </a>
                <a href={`mailto:${config.contact.email}`}>
                  <span>E-posta</span>
                  <strong>{config.contact.email}</strong>
                </a>
                <a href={config.contact.whatsappLink} target="_blank" rel="noreferrer">
                  <span>WhatsApp</span>
                  <strong>İletişime geç</strong>
                </a>
              </div>
            </div>

            <div className="contact-panel">
              <span>Adres</span>
              <strong>{config.contact.address}</strong>
              <p>Henüz her şey net olmak zorunda değil. Tarihi, mekanı, aklınızdaki hissi yazın; gerisini birlikte sakin sakin şekillendirelim.</p>
              <a className="button button-primary" href="https://maps.app.goo.gl/mhTL4oNZVnUaYPHt9" target="_blank" rel="noreferrer">
                Yol Tarifi Al
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-layout">
          <div className="footer-brand">
            <img src={config.brand.logo} alt="Stüdyo Genç" />
            <p>Elmadağ merkezli; insanların en kıymetli günlerine sakinlikle eşlik eden, anıları özenle görünür kılan fotoğraf, video ve drone stüdyosu.</p>
          </div>
          <div>
            <h3>Menü</h3>
            <a href="#home">Ana Sayfa</a>
            <a href="#services">Hizmetler</a>
            <a href="#portfolio">Portfolyo</a>
            <a href="#about">Hikaye</a>
          </div>
          <div>
            <h3>Hizmetler</h3>
            {config.services.slice(0, 5).map((service) => (
              <a href="#services" key={service.title}>{service.title}</a>
            ))}
          </div>
          <div>
            <h3>Sosyal</h3>
            {config.socialMedia.map((item) => (
              <a href={item.url} target="_blank" rel="noreferrer" key={item.name}>{item.name}</a>
            ))}
            <a href={`mailto:${config.contact.email}`}>{config.contact.email}</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Stüdyo Genç. Tüm hakları saklıdır.</span>
          <a href="#home">Yukarı dön</a>
        </div>
      </footer>

      <HomeInteractions heroSlides={heroSlides} />
    </>
  );
}
