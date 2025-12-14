document.addEventListener('DOMContentLoaded', () => {
    console.log("Le site Dufour Expertise est prêt !");

    // ===============================================
    // 1. NAVBAR DYNAMIQUE (scroll + logo)
    // ===============================================
    const navbar = document.querySelector('.navbar');
    const logoImg = document.getElementById('site-logo');

    if (!navbar || !logoImg) return;

    // Logos définis dans le HTML (data-attributes)
    const logoDefaultSrc = logoImg.dataset.logoDefault;
    const logoScrolledSrc = logoImg.dataset.logoScrolled;

    const desktopBreakpoint = 768;
    const triggerHeightDesktop = 550;
    const triggerHeightMobile = 450;

    function updateNavbarOnScroll() {
        const isMobile = window.innerWidth <= desktopBreakpoint;
        const triggerHeight = isMobile ? triggerHeightMobile : triggerHeightDesktop;

        if (window.scrollY >= triggerHeight) {
            // ÉTAT SCROLLÉ
            navbar.classList.add('scrolled');

            if (logoImg.src !== logoScrolledSrc) {
                logoImg.src = logoScrolledSrc;
            }
        } else {
            // ÉTAT AU REPOS
            navbar.classList.remove('scrolled');

            if (logoImg.src !== logoDefaultSrc) {
                logoImg.src = logoDefaultSrc;
            }
        }
    }

    // Throttle léger pour le scroll
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbarOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateNavbarOnScroll);

    // Initialisation
    updateNavbarOnScroll();

    // ===============================================
    // 2. GESTION DU CONSENTEMENT COOKIES / RGPD
    // ===============================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    const analyticsScript = document.getElementById('analytics-script');
    const settingsButton = document.getElementById('cookie-settings-btn');
    const consentKey = 'cookiesChoice';

    function enableAnalytics() {
        if (analyticsScript && analyticsScript.type === 'text/plain') {
            const newScript = document.createElement('script');
            newScript.innerHTML = analyticsScript.innerHTML;
            newScript.id = 'analytics-activated';
            document.body.appendChild(newScript);
            console.log('📊 Google Analytics activé.');
        }
    }

    function handleConsent(consent) {
        localStorage.setItem(consentKey, consent);

        if (cookieBanner) cookieBanner.classList.remove('visible');
        if (settingsButton) settingsButton.style.display = 'block';

        if (consent === 'accept') {
            enableAnalytics();
        }
    }

    const userConsent = localStorage.getItem(consentKey);

    if (cookieBanner && acceptBtn && declineBtn && settingsButton) {
        if (userConsent === 'accept' || userConsent === 'decline') {
            if (userConsent === 'accept') enableAnalytics();
            cookieBanner.style.display = 'none';
            settingsButton.style.display = 'block';
        } else {
            cookieBanner.style.display = 'flex';
            settingsButton.style.display = 'none';

            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 100);
        }

        acceptBtn.addEventListener('click', () => handleConsent('accept'));
        declineBtn.addEventListener('click', () => handleConsent('decline'));

        settingsButton.addEventListener('click', (e) => {
            e.preventDefault();
            settingsButton.style.display = 'none';
            cookieBanner.style.display = 'flex';

            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 100);
        });
    }
});
