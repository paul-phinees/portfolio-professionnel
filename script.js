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

