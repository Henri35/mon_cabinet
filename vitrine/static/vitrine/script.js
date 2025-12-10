document.addEventListener('DOMContentLoaded', () => {
    console.log("Le site Dufour Expertise est prêt !");

    // ===============================================
    // 1. NAVBAR DYNAMIQUE : CHANGEMENT DE COULEUR
    // ===============================================
    const navbar = document.querySelector('.navbar');
    // Hauteur en pixels où la navbar doit changer (bas de la section hero)
    // Nous utilisons une valeur fixe car la navbar est fixe.
    const heroHeight = 550; 


    function updateNavbarOnScroll() {
        if (navbar) {
            // Si l'utilisateur a défilé au-delà de la zone Hero
            if (window.scrollY >= heroHeight) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    // Événement d'écoute du défilement
    window.addEventListener('scroll', updateNavbarOnScroll);

    // S'assurer que si l'utilisateur recharge la page déjà défilée, la navbar est correcte
    updateNavbarOnScroll();
    // FIN --- NAVBAR DYNAMIQUE ---


    // ===============================================
    // 2. GESTION DU CONSENTEMENT RGPD / COOKIES
    // ===============================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    const analyticsScript = document.getElementById('analytics-script');
    const consentKey = 'cookiesChoice';
    const settingsButton = document.getElementById('cookie-settings-btn');

    function enableAnalytics() {
        if (analyticsScript && analyticsScript.type === "text/plain") {
            const newScript = document.createElement('script');
            
            // Copie le contenu du script analytique bloqué
            newScript.innerHTML = analyticsScript.innerHTML; 
            newScript.setAttribute('id', 'analytics-activated'); 
            
            // Exécute le script en l'insérant dans le DOM
            document.body.appendChild(newScript);
            console.log("📊 Google Analytics activé.");
        }
    }

    function handleConsent(consent) {
        // 1. Masquer la bannière
        if (cookieBanner) {
            cookieBanner.classList.remove('visible');
            // Optionnel : Retirer complètement le display: flex pour éviter les interférences
        }
        // NOUVEAU : Afficher le bouton de gestion des cookies
        if (settingsButton) {
            settingsButton.style.display = 'block';
        }
        
        // 2. Mémoriser le choix dans le stockage local
        localStorage.setItem(consentKey, consent);
        console.log(`Choix des cookies enregistré : ${consent}`);
        
        // 3. Exécuter la fonction si 'accept'
        if (consent === 'accept') {
            enableAnalytics();
        }
    }

// --- LOGIQUE D'AFFICHAGE ET D'ÉCOUTE ---
    const userConsent = localStorage.getItem(consentKey);

    if (cookieBanner && acceptBtn && declineBtn && settingsButton) {
        
        if (userConsent === 'accept') {
            // Si déjà accepté, on active l'Analytics directement
            enableAnalytics();
            // AFFICHAGE CORRIGÉ : Afficher le bouton flottant pour changer le consentement
            settingsButton.style.display = 'block'; 

        } else if (userConsent === 'decline') {
            // Si refusé, on ne montre pas la bannière
            cookieBanner.style.display = 'none';
            // AFFICHAGE CORRIGÉ : Afficher le bouton flottant pour changer le consentement
            settingsButton.style.display = 'block'; 

        } else {
            // Si aucun choix n'est fait, on affiche la bannière
            cookieBanner.style.display = 'flex'; // Rendre visible (sans l'animation)
            settingsButton.style.display = 'none'; // Masquer le bouton de gestion pendant que la bannière est ouverte
            
            setTimeout(() => {
                cookieBanner.classList.add('visible'); // Lance l'animation CSS
            }, 100); 
        }

        // Événements des boutons (restent corrects)
        acceptBtn.addEventListener('click', () => {
            handleConsent('accept');
        });

        declineBtn.addEventListener('click', () => {
            handleConsent('decline');
        });
        
        // NOUVEAU : Gérer le clic sur le bouton flottant pour réafficher la bannière
        settingsButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            settingsButton.style.display = 'none'; // Cacher le bouton flottant
            cookieBanner.style.display = 'flex';
            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 100);
        });
    }
    // FIN --- BANNIÈRE COOKIES ---

});