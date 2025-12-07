document.addEventListener('DOMContentLoaded', () => {
    console.log("Le site Dufour Expertise est prêt !");

// --- 1. CODE DE DÉFILEMENT DOUX (CORRIGÉ POUR TOUTES LES ANCRES) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        
        const targetId = this.getAttribute('href');
        
        // S'assurer que le lien n'est pas simplement href="#" (lien vide)
        if (targetId && targetId.length > 1) { 
            e.preventDefault();

            // Cible l'élément correspondant à l'ID (ex: #cabinet)
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Active l'animation douce
                });
            }
        }
    });
});
// FIN --- CODE DE DÉFILEMENT DOUX ---


// --- NAVBAR DYNAMIQUE : CHANGEMENT DE COULEUR DU TEXTE ---
const navbar = document.querySelector('.navbar');
const heroHeight = 550; // Hauteur en pixels où la navbar doit changer

function updateNavbarOnScroll() {
    // Si l'utilisateur a défilé au-delà de la zone Hero
    if (window.scrollY >= heroHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Événement d'écoute du défilement
window.addEventListener('scroll', updateNavbarOnScroll);

// Pour s'assurer que si l'utilisateur recharge la page déjà défilée, la navbar est correcte
updateNavbarOnScroll();
// FIN --- NAVBAR DYNAMIQUE ---
















// --- BANNIÈRE COOKIES (CORRIGÉ) ---
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('acceptCookies');
const declineBtn = document.getElementById('declineCookies');
const consentKey = 'cookiesChoice';

function enableAnalytics() {
  const analytics = document.getElementById('analytics-script');
  if (analytics && analytics.type === "text/plain") {
    const newScript = document.createElement('script');
    // Important : Copier le contenu du script et non l'élément lui-même
    // sinon le type text/plain sera préservé.
    newScript.innerHTML = analytics.innerHTML; 
    newScript.setAttribute('id', 'analytics-activated'); // Pour le débug
    document.body.appendChild(newScript);
    console.log("📊 Google Analytics activé et inséré dans le DOM.");
  }
}

function handleConsent(consent) {
  // 1. Masquer la bannière
  cookieBanner.classList.remove('visible');
  
  // 2. Mémoriser le choix
  localStorage.setItem(consentKey, consent);
  console.log(`Choice saved: ${consent}`);
  
  // 3. Exécuter la fonction si 'accept'
  if (consent === 'accept') {
    enableAnalytics();
  }
}

// Vérification au chargement de la page
const userConsent = localStorage.getItem(consentKey);

if (cookieBanner && acceptBtn && declineBtn) {
  if (userConsent === 'accept') {
    // Si déjà accepté, on active l'Analytics directement
    enableAnalytics();
  } else if (userConsent === 'decline') {
    // Si refusé, on ne fait rien, on ne montre pas la bannière
    console.log("🚫 Cookies refusés par l'utilisateur.");
  } else {
    // Si aucun choix n'est fait, on affiche la bannière
    // On utilise un petit délai pour s'assurer que le reste de la page est chargé
    setTimeout(() => {
        cookieBanner.classList.add('visible');
    }, 500); 
  }

  // Événements des boutons
  acceptBtn.addEventListener('click', () => {
    handleConsent('accept');
  });

  declineBtn.addEventListener('click', () => {
    handleConsent('decline');
  });
}
// FIN --- BANNIÈRE COOKIES ---
}); // <-- Ligne manquante : Elle ferme le 'document.addEventListener'