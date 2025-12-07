document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Script chargé !");

  // MENU BURGER
  const burger = document.getElementById('burger');
  const navMenu = document.querySelector('.navbar ul');
  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // SCROLL DOUX
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // FORMULAIRE
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        alert("Merci de remplir tous les champs.");
        return;
      }
      alert("Merci pour votre message, nous vous répondrons rapidement !");
      form.reset();
    });
  }

  // ANIMATION AU DÉFILEMENT
  const fades = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fades.forEach(section => observer.observe(section));
  } else {
    fades.forEach(el => el.classList.add('visible'));
  }

// --- BANNIÈRE COOKIES ---
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('acceptCookies');
const declineBtn = document.getElementById('declineCookies');

function enableAnalytics() {
  const analytics = document.getElementById('analytics-script');
  if (analytics && analytics.type === "text/plain") {
    const newScript = document.createElement('script');
    newScript.innerHTML = analytics.innerHTML;
    document.body.appendChild(newScript);
    console.log("📊 Google Analytics activé");
  }
}

if (cookieBanner && acceptBtn && declineBtn) {
  // 💡 Supprime toute mémoire précédente pour réafficher la bannière à chaque fois
  localStorage.removeItem('cookiesChoice');

  // Affiche la bannière à chaque chargement
  cookieBanner.classList.add('visible');

  acceptBtn.addEventListener('click', () => {
    console.log("✅ Cookies acceptés");
    cookieBanner.classList.remove('visible');
    enableAnalytics(); // active Google Analytics
  });

  declineBtn.addEventListener('click', () => {
    console.log("🚫 Cookies refusés");
    cookieBanner.classList.remove('visible');
  });
}



  // --- HERO BACKGROUND SLIDESHOW ---
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // 🔹 Les images locales dans /static/vitrine/images/
  const backgrounds = [
    "url('/static/vitrine/images/chantal.jpg')",
    "url('/static/vitrine/images/hunters.jpg')",
    "url('/static/vitrine/images/logo8.png')"
  ];

  let index = 0;
  hero.style.backgroundImage = `linear-gradient(rgba(0,43,92,0.8), rgba(0,43,92,0.8)), ${backgrounds[index]}`;
  hero.style.transition = "opacity 1s ease-in-out";

  setInterval(() => {
    hero.style.opacity = 0;
    setTimeout(() => {
      index = (index + 1) % backgrounds.length;
      hero.style.backgroundImage = `linear-gradient(rgba(0,43,92,0.8), rgba(0,43,92,0.8)), ${backgrounds[index]}`;
      hero.style.opacity = 1;
    }, 1000);
  }, 4000);
});

// --- Carrousel Témoignages ---
const track = document.querySelector('.temoignages-track');
if (track) {
  const clones = track.innerHTML; 
  track.innerHTML += clones; // on duplique le contenu pour un effet infini
}

