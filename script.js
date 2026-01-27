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
        const mailtoLink = `mailto:votre.email@example.com?subject=${subject}&body=${body}`;
        
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

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Highlight actif dans la navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

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

