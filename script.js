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

// Carrousel d'images en background de la page d'accueil
// Liste de TOUTES les images disponibles
const allAgriImages = [
    'assets/Paul%20pro/agriculture.jpg',
    'assets/Paul%20pro/developpement-agricole-durable-55.png',
    'assets/Paul%20pro/Lagriculture-durable-face-aux-changements-climatiques.jpg',
    'assets/Paul%20pro/20250930_115719.jpg',
    'assets/Paul%20pro/20251216_100648.jpg',
    'assets/Paul%20pro/IMG-20250424-WA0026.jpg',
    'assets/Paul%20pro/IMG-20250428-WA0021.jpg',
    'assets/Paul%20pro/IMG-20250428-WA0024.jpg',
    'assets/Paul%20pro/IMG-20250524-WA0031.jpg',
    'assets/Paul%20pro/IMG-20250606-WA0059.jpg',
    'assets/Paul%20pro/IMG-20250612-WA0018.jpg',
    'assets/Paul%20pro/IMG-20250630-WA0032.jpg',
    'assets/Paul%20pro/IMG-20250630-WA0300.jpg',
    'assets/Paul%20pro/IMG-20250703-WA0005.jpg',
    'assets/Paul%20pro/IMG-20250909-WA0120.jpg',
    'assets/Paul%20pro/IMG-20251220-WA0059.jpg',
    'assets/Paul%20pro/IMG-20251220-WA0060.jpg',
    'assets/Paul%20pro/IMG-20251222-WA0130.jpg',
    'assets/Paul%20pro/IMG_1398.jpeg',
    'assets/Paul%20pro/IMG_20250920_224608_834.jpg',
    'assets/Paul%20pro/IMG_20250929_194133_234.jpg',
    'assets/Paul%20pro/IMG_20251106_161052_504.jpg',
    'assets/Paul%20pro/IMG_20251106_161052_598.jpg',
    'assets/Paul%20pro/IMG_20251107_005223_261.jpg',
    'assets/Paul%20pro/IMG_20251107_005228_860.jpg',
    'assets/Paul%20pro/IMG_20260104_172026_094.jpg',
    'assets/Paul%20pro/IMG_20260104_172032_359.jpg',
    'assets/Paul%20pro/IMG_20260104_172032_643.jpg',
    'assets/Paul%20pro/IMG_2221.jpeg',
    'assets/Paul%20pro/izEmKPSF8ySJBM6XE_lVv.jpg',
    'assets/Paul%20pro/Screenshot_20251111_032358_One%20UI%20Home.jpg',
    'assets/Paul%20pro/Vert%20et%20Blanc%20Citations%20Facebook%20Publication_20251008_172235_0000.png'
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

// Charger toutes les images disponibles en background
async function loadAllAgriBackgroundImages() {
    const bgImage1 = document.getElementById('heroBgImage1');
    const bgImage2 = document.getElementById('heroBgImage2');
    
    if (!bgImage1 || !bgImage2) return;
    
    const availableImages = [];
    
    // Vérifier toutes les images
    for (const imgSrc of allAgriImages) {
        const exists = await checkImageExists(imgSrc);
        if (exists) {
            availableImages.push(imgSrc);
        }
    }
    
    if (availableImages.length === 0) return;
    
    // Mélanger les images pour plus de variété
    const shuffledImages = availableImages.sort(() => Math.random() - 0.5);
    
    let currentIndex = 0;
    let nextIndex = 1;
    
    // Initialiser les deux backgrounds
    bgImage1.style.backgroundImage = `url('${shuffledImages[0]}')`;
    bgImage1.classList.add('active');
    
    if (shuffledImages.length > 1) {
        bgImage2.style.backgroundImage = `url('${shuffledImages[1]}')`;
    }
    
    // Fonction pour changer l'image
    function changeBackgroundImage() {
        if (shuffledImages.length <= 1) return;
        
        // Préparer la prochaine image
        nextIndex = (nextIndex + 1) % shuffledImages.length;
        const nextImage = shuffledImages[nextIndex];
        
        // Déterminer quelle image est active
        const activeBg = bgImage1.classList.contains('active') ? bgImage1 : bgImage2;
        const inactiveBg = bgImage1.classList.contains('active') ? bgImage2 : bgImage1;
        
        // Charger la nouvelle image dans l'inactive
        inactiveBg.style.backgroundImage = `url('${nextImage}')`;
        
        // Transition
        activeBg.classList.remove('active');
        inactiveBg.classList.add('active');
        
        currentIndex = nextIndex;
    }
    
    // Changer l'image toutes les 5 secondes (plus dynamique)
    setInterval(changeBackgroundImage, 5000);
}

// Charger les images au démarrage
loadAllAgriBackgroundImages();

