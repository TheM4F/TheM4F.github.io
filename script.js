// script.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. AOS Animations
  AOS.init({ duration: 700, once: true });

  // 2. Navbar background toggle on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // 3. Mobile menu toggle & close handlers
  const navLinks = document.querySelector(".nav-links");
  const navToggle = document.querySelector(".nav-toggle");
  const navClose  = document.querySelector(".nav-close");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  if (navClose) {
    navClose.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  }

  // Close when clicking any link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // 4. Render hero phone bar
  renderHeroPhones();

  // 5. Embed Google Map
  document.getElementById("mapEmbed").innerHTML =
    `<iframe src="${siteConfig.mapsEmbedUrl}" frameborder="0" loading="lazy"></iframe>`;

  // 6. Scroll progress bar + back-to-top button
  initScrollUI();

  // 7. Countdown timer
  initCountdown("2025-06-06T00:00:00+03:00", updateCountdown);

  // 8. Render service categories
  renderCategories();

  // 9. Render testimonial carousel
  renderTestimonialsCarousel();

  // 11. Setup floating contact panel
  setupContactPanel();
});


// Smooth-scroll helper
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Open Maps link
function openMaps() {
  window.open(siteConfig.mapsLink, "_blank");
}

// Render the phone numbers in hero section
function renderHeroPhones() {
  const bar = document.getElementById("heroPhones");
  bar.innerHTML = "";
  siteConfig.phoneNumbers.forEach(item => {
    const num = item.number.replace(/\s+/g, "");
    const a = document.createElement("a");
    a.href = `tel:+90${num}`;
    a.setAttribute("data-owner", item.owner);
    a.innerHTML = `
      <i class="fas fa-phone-alt"></i>
      <span class="number">${item.number}</span>
    `;
    bar.appendChild(a);
  });
}

// Initialize scroll-progress-bar and back-to-top button
function initScrollUI() {
  const bar = document.getElementById("progressBar");
  const btn = document.createElement("button");
  btn.id = "toTop";
  btn.innerHTML = `<i class="fas fa-chevron-up"></i>`;
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "20px",
    right: "90px",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "50%",
    background: "var(--accent)",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
    opacity: "0",
    transition: "opacity 0.3s",
    zIndex: "2000"
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    const pct =
      (window.scrollY /
        (document.body.scrollHeight - window.innerHeight)) *
      100;
    bar.style.width = `${pct}%`;
    btn.style.opacity = pct > 10 ? "1" : "0";
  });
}

// Initialize countdown
function initCountdown(targetISO, callback) {
  const end = new Date(targetISO).getTime();
  (function tick() {
    const now = Date.now();
    let diff = end - now;
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    callback({ days, hours, minutes, seconds });
    if (diff > 0) requestAnimationFrame(tick);
  })();
}

// Update countdown display
function updateCountdown({ days, hours, minutes, seconds }) {
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// Render the category grid
function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  grid.innerHTML = "";
  siteConfig.categories.forEach((cat, i) => {
    const div = document.createElement("div");
    div.className = "category-card";
    div.setAttribute("data-aos", "fade-up");
    div.setAttribute("data-aos-delay", i * 100);
    div.innerHTML = `
      <div class="bg" style="background-image:url('${cat.bgImage}')"></div>
      <div class="info">
        <h3>${cat.title}</h3>
        <p>${cat.description}</p>
      </div>`;
    grid.appendChild(div);
  });
}

function renderTestimonialsCarousel() {
  const cont = document.getElementById("testimonialCarousel");
  cont.innerHTML = "";
  const inner = document.createElement("div");
  inner.className = "testimonial-inner";
  cont.appendChild(inner);

  // Kartları ekle
  siteConfig.testimonials.forEach(t => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    let stars = '<div class="stars">';
    for (let s = 1; s <= 5; s++) {
      if (t.stars >= s)       stars += '<i class="star full fas fa-star"></i>';
      else if (t.stars >= s-0.5) stars += '<i class="star half fas fa-star-half-alt"></i>';
      else                     stars += '<i class="star empty far fa-star"></i>';
    }
    stars += "</div>";
    card.innerHTML = `
      ${stars}
      <p>${t.text}</p>
      <div class="date">${t.date}</div>
      <h4>- ${t.author}</h4>
    `;
    inner.appendChild(card);
  });

  // Ölçümler
  const style = window.getComputedStyle(inner);
  const gap   = parseFloat(style.getPropertyValue("gap"));
  const first = inner.querySelector(".testimonial-card");
  const cardW = first.offsetWidth + gap;
  const maxIdx = siteConfig.testimonials.length - 1;
  let idx = 0;

  // Başlangıçta geçiş animasyonu ayarla
  inner.style.transition = "transform 0.5s ease";

  function slide() {
    inner.style.transform = `translateX(-${cardW * idx}px)`;
  }

  setInterval(() => {
    if (idx < maxIdx) {
      // normal kaydırma
      idx++;
      inner.style.transition = "transform 0.5s ease";
      slide();
    } else {
      // sonda wrap-around: animasyonu kaldır, sıfıra atla
      idx = 0;
      inner.style.transition = "none";
      slide();
      // küçük bir gecikmeyle animasyonu geri aç
      setTimeout(() => {
        inner.style.transition = "transform 0.5s ease";
      }, 50);
    }
  }, 5000);
}

// Setup floating contact panel
function setupContactPanel() {
  const fab = document.getElementById("fab");
  const panel = document.getElementById("contactPanel");
  const list = document.getElementById("contactList");
  list.innerHTML = "";

  siteConfig.phoneNumbers.forEach(item => {
    const num = item.number.replace(/\s+/g, "");
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.owner}</span>
      <div>
        <a href="tel:+90${num}" class="icon-btn"><i class="fas fa-phone-alt"></i></a>
      </div>`;
    list.appendChild(li);
  });

  fab.addEventListener("click", () => panel.classList.toggle("open"));
  document.addEventListener("click", e => {
    if (!fab.contains(e.target) && !panel.contains(e.target)) {
      panel.classList.remove("open");
    }
  });
}


// YORUM 
// 12. Review Form Submission → Discord Webhook
const reviewForm = document.getElementById("reviewForm");
if (reviewForm) {
  reviewForm.addEventListener("submit", async e => {
    e.preventDefault();
    const statusEl = document.getElementById("reviewStatus");
    const rating = document.getElementById("reviewRating").value;
    const name   = document.getElementById("reviewName").value.trim();
    const email  = document.getElementById("reviewEmail").value.trim();
    const text   = document.getElementById("reviewText").value.trim();

    // Basit doğrulama
    if (!rating || !name || !email || !text) {
      statusEl.textContent = "Lütfen tüm alanları doldurun.";
      return;
    }
    statusEl.textContent = "Gönderiliyor...";

    // Discord webhook payload
    const payload = {
      embeds: [{
        title: `Yeni Yorum: ${rating} ⭐`,
        color: 0x4CAF50,
        fields: [
          { name: "İsim",   value: name,  inline: true },
          { name: "E-posta", value: email, inline: true },
          { name: "Yorum",  value: text }
        ],
        timestamp: new Date().toISOString()
      }]
    };

    try {
      const res = await fetch(siteConfig.discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        statusEl.textContent = "Teşekkürler! Yorumunuz gönderildi.";
        reviewForm.reset();
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Gönderimde hata oldu. Lütfen tekrar deneyin.";
    }
  });
}


(async function loadWeather() {
  const lat =  39.9142180875812, lon = 33.23690246619596; // Elmadağ koordinatları
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current_weather=true&timezone=Europe%2FIstanbul`
    );
    const data = await res.json();
    const weather = data.current_weather;
    const temp = Math.round(weather.temperature);
    const code = weather.weathercode;

    // Basit kod → emoji eşlemesi
    const codeMap = {
      0: '☀️',    1: '🌤️',  2: '⛅',   3: '☁️',
      45: '🌫️', 48: '🌫️',
      51: '🌦️', 53: '🌦️', 55: '🌧️',
      61: '🌦️', 63: '🌧️', 65: '🌧️',
      71: '❄️', 73: '❄️', 75: '❄️',
      80: '🌧️', 81: '🌧️', 82: '🌧️',
      95: '⛈️', 96: '⛈️', 99: '⛈️'
    };
    const icon = codeMap[code] || '❓';

    document.getElementById("weatherIcon").textContent = icon;
    document.getElementById("weatherTemp").textContent = `${temp}°C`;
  } catch (e) {
    console.error("Hava yüklenemedi:", e);
  }
})();

// Kapat butonu
document.getElementById("weatherClose").addEventListener("click", () => {
  document.getElementById("weatherWidget").style.display = "none";
});
