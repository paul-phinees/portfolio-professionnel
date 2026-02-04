// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu mobile lors du clic sur un lien
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Créer le lien mailto
        const subject = encodeURIComponent(`Contact depuis le portfolio - ${name}`);
        const body = encodeURIComponent(`Bonjour,\n\n${message}\n\nCordialement,\n${name}\n${email}`);
        const mailtoLink = `mailto:ndinpaul7@gmail.com?subject=${subject}&body=${body}`;
        
        // Ouvrir le client de messagerie
        window.location.href = mailtoLink;
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Afficher un message de confirmation
        alert('Votre message va s\'ouvrir dans votre client de messagerie. Merci !');
    });
}

// Mise à jour de la date
const lastUpdate = document.getElementById('lastUpdate');
if (lastUpdate) {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    lastUpdate.textContent = today.toLocaleDateString('fr-FR', options);
}

// Mise à jour de la date du CV
const cvUpdateDate = document.getElementById('cvUpdateDate');
if (cvUpdateDate) {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    cvUpdateDate.textContent = today.toLocaleDateString('fr-FR', options);
}

// Système de pagination séquentielle
const pages = document.querySelectorAll('.page-section');
const totalPages = pages.length;
let currentPage = 0;

// Initialiser les indicateurs de pagination
function initPagination() {
    const indicatorsContainer = document.getElementById('paginationIndicators');
    indicatorsContainer.innerHTML = '';
    
    pages.forEach((page, index) => {
        const dot = document.createElement('div');
        dot.className = 'pagination-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(index));
        indicatorsContainer.appendChild(dot);
    });
    
    updatePagination();
}

// Aller à une page spécifique
function goToPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= totalPages) return;
    
    currentPage = pageIndex;
    const targetPage = pages[pageIndex];
    
    // Masquer toutes les pages
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Afficher la page cible
    targetPage.classList.add('active');
    targetPage.style.display = 'flex';
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Mettre à jour l'URL
    const sectionId = targetPage.getAttribute('id');
    window.history.pushState({ page: pageIndex }, '', `#${sectionId}`);
    
    updatePagination();
    updateNavLinks();
}

// Mettre à jour les boutons de pagination
function updatePagination() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.pagination-dot');
    
    // Boutons précédent/suivant
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
    
    // Indicateurs
    dots.forEach((dot, index) => {
        if (index === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Mettre à jour les liens de navigation
function updateNavLinks() {
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-menu a[data-page="${currentPage}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// Navigation précédent/suivant
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 0) goToPage(currentPage - 1);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1);
});

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPage > 0) {
        goToPage(currentPage - 1);
    } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
        goToPage(currentPage + 1);
    }
});

// Gérer les liens de navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageIndex = parseInt(link.getAttribute('data-page'));
        goToPage(pageIndex);
    });
});

// Gérer le hash de l'URL au chargement
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            const pageIndex = parseInt(targetSection.getAttribute('data-page'));
            goToPage(pageIndex);
            return;
        }
    }
    // Par défaut, afficher la première page
    goToPage(0);
});

// Gérer le bouton retour du navigateur
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page !== undefined) {
        goToPage(e.state.page);
    }
});

// Initialiser la pagination
initPagination();

// Gestion de l'image de profil
const profilePhoto = document.getElementById('profile-photo');
if (profilePhoto) {
    profilePhoto.addEventListener('error', function() {
        // Si l'image n'existe pas, masquer l'élément ou afficher une image par défaut
        this.style.display = 'none';
        // Ou utiliser une image placeholder
        // this.src = 'https://via.placeholder.com/300';
    });
}

// Système de traduction
let currentLang = localStorage.getItem('portfolioLang') || 'fr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolioLang', lang);
    document.documentElement.lang = lang;
    
    // Mettre à jour tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Mettre à jour les boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialiser la langue
if (typeof translations !== 'undefined') {
    setLanguage(currentLang);
    
    // Gestion du changement de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}

// Détection mode admin (pour les statistiques privées)
const urlParams = new URLSearchParams(window.location.search);
const isAdmin = urlParams.get('admin') === '1';

// Système de comptage des visiteurs (stockage local, par navigateur)
function incrementVisitor() {
    let visitorCount = parseInt(localStorage.getItem('portfolioVisitors') || '0');
    const lastVisit = localStorage.getItem('portfolioLastVisit');
    const today = new Date().toDateString();
    
    // Incrémenter seulement si c'est une nouvelle visite (nouveau jour)
    if (lastVisit !== today) {
        visitorCount++;
        localStorage.setItem('portfolioVisitors', visitorCount.toString());
        localStorage.setItem('portfolioLastVisit', today);
    }
    
    return visitorCount;
}

// Système de comptage des téléchargements CV (stockage local, par navigateur)
function incrementCvDownload() {
    let downloadCount = parseInt(localStorage.getItem('portfolioCvDownloads') || '0');
    downloadCount++;
    localStorage.setItem('portfolioCvDownloads', downloadCount.toString());
    return downloadCount;
}

// Afficher les compteurs (seulement pour l'administrateur avec ?admin=1)
function updateCounters() {
    const visitorCountEl = document.getElementById('visitorCount');
    const cvDownloadCountEl = document.getElementById('cvDownloadCount');
    const totalCvDownloadsEl = document.getElementById('totalCvDownloads');
    const adminBlocks = document.querySelectorAll('.footer-stats');
    const cvDownloadContainer = cvDownloadCountEl ? cvDownloadCountEl.parentElement : null;

    // Si pas en mode admin, masquer les blocs d'admin et ne pas afficher les valeurs
    if (!isAdmin) {
        adminBlocks.forEach(el => el.style.display = 'none');
        if (cvDownloadContainer) {
            cvDownloadContainer.style.display = 'none';
        }
        // On continue à incrémenter en arrière-plan, mais sans afficher
        incrementVisitor();
        return;
    }

    // Mode admin : afficher les blocs
    adminBlocks.forEach(el => el.style.display = '');
    if (cvDownloadContainer) {
        cvDownloadContainer.style.display = '';
    }
    
    if (visitorCountEl) {
        const visitors = incrementVisitor();
        visitorCountEl.textContent = visitors.toLocaleString();
    }
    
    if (cvDownloadCountEl || totalCvDownloadsEl) {
        const downloads = parseInt(localStorage.getItem('portfolioCvDownloads') || '0');
        if (cvDownloadCountEl) cvDownloadCountEl.textContent = downloads.toLocaleString();
        if (totalCvDownloadsEl) totalCvDownloadsEl.textContent = downloads.toLocaleString();
    }
}

// Gérer les téléchargements du CV
document.querySelectorAll('#cvDownloadBtn, #cvDownloadBtnLarge').forEach(btn => {
    btn.addEventListener('click', () => {
        incrementCvDownload();
        updateCounters();
    });
});

// Initialiser les compteurs au chargement
updateCounters();

// Carrousel d'images d'agriculture intelligente
const agriCarousel = document.getElementById('agriCarousel');
const agriCarouselContainer = document.querySelector('.hero-carousel');

// Liste des images disponibles (sélectionnées parmi vos images)
const agriImages = [
    'assets/Paul pro/agriculture.jpg',
    'assets/Paul pro/developpement-agricole-durable-55.png',
    'assets/Paul pro/Lagriculture-durable-face-aux-changements-climatiques.jpg',
    'assets/Paul pro/20251216_100648.jpg',
    'assets/Paul pro/IMG_20251107_005223_261.jpg',
    'assets/Paul pro/IMG_20251107_005228_860.jpg'
];

// Fonction pour vérifier si une image existe
function checkImageExists(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

// Charger les images disponibles
async function loadAgriImages() {
    if (!agriCarousel) return;
    
    const availableImages = [];
    
    // Vérifier chaque image
    for (const imgSrc of agriImages) {
        const exists = await checkImageExists(imgSrc);
        if (exists) {
            availableImages.push(imgSrc);
        }
    }
    
    // Si aucune image trouvée, masquer le carrousel
    if (availableImages.length === 0) {
        if (agriCarouselContainer) {
            agriCarouselContainer.style.display = 'none';
        }
        return;
    }
    
    // Afficher le carrousel
    if (agriCarouselContainer) {
        agriCarouselContainer.style.display = 'block';
    }
    
    // Initialiser avec la première image
    agriCarousel.src = availableImages[0];
    agriCarousel.style.opacity = '1';
    
    let agriIndex = 0;
    
    function updateAgriImage() {
        if (availableImages.length <= 1) return; // Pas besoin de changer s'il n'y a qu'une image
        
        agriIndex = (agriIndex + 1) % availableImages.length;
        agriCarousel.style.opacity = '0';
        setTimeout(() => {
            agriCarousel.src = availableImages[agriIndex];
            agriCarousel.style.opacity = '1';
        }, 400);
    }
    
    // Démarrer le carrousel seulement s'il y a plusieurs images (toutes les 6 secondes)
    if (availableImages.length > 1) {
        setInterval(updateAgriImage, 6000);
    }
}

// Charger les images au démarrage
loadAgriImages();

