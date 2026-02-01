// Translations object
const translations = {
    fr: {
        // Navigation
        'nav.brand': 'Mon Portfolio',
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.skills': 'Compétences',
        'nav.experience': 'Expérience',
        'nav.education': 'Formation',
        'nav.services': 'Services',
        'nav.cv': 'CV',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.welcome': 'Bienvenue sur mon portfolio — ravi de vous rencontrer !',
        'hero.downloadCv': 'Télécharger mon CV',
        'hero.contact': 'Me contacter',
        'hero.viewApp': 'Voir mon application',
        
        // About Section
        'about.title': 'À propos de moi',
        'about.location': 'Localisation:',
        'about.availability': 'Disponibilité:',
        'about.languages': 'Langues:',
        'about.status': 'Statut:',
        'about.hobbies': 'Passe-temps',
        'about.music': 'Musique',
        'about.musicDesc': 'Musicien passionné',
        'about.reading': 'Lecture',
        'about.readingDesc': 'Passionné de lecture',
        
        // Skills Section
        'skills.title': 'Compétences',
        'skills.expertise': 'Domaines d\'Expertise',
        'skills.tools': 'Outils & Technologies',
        'skills.technical': 'Compétences Techniques',
        'skills.soft': 'Soft Skills',
        
        // Experience Section
        'experience.title': 'Expérience Professionnelle',
        
        // Education Section
        'education.title': 'Formation',
        'education.inProgress': 'En cours',
        'education.certificates': 'Certificats',
        'education.english': 'Certificat d\'aptitude en Anglais',
        'education.project': 'Certificat en Gestion de projet',
        'education.ai': 'Certificat en Intelligence Artificielle',
        'education.web': 'Certificat en Création de site Web',
        
        // Services Section
        'services.title': 'Services Freelance',
        'services.intro': 'Je propose mes services en freelance dans les domaines de l\'agriculture durable, de l\'environnement et du développement durable.',
        'services.consultation': 'Consultation en Agriculture Durable',
        'services.consultationDesc': 'Conseil et accompagnement pour des pratiques agricoles durables et respectueuses de l\'environnement.',
        'services.evaluation': 'Évaluation Environnementale',
        'services.evaluationDesc': 'Réalisation de bilans carbone, audits environnementaux et analyses d\'impact.',
        'services.water': 'Gestion des Ressources en Eau',
        'services.waterDesc': 'Expertise en gestion durable des ressources hydriques et optimisation de leur utilisation.',
        'services.sustainable': 'Développement Durable',
        'services.sustainableDesc': 'Accompagnement dans la mise en place de stratégies de développement durable.',
        'services.cta': 'Intéressé par mes services ? Contactez-moi pour discuter de votre projet !',
        'services.contact': 'Me contacter',
        'services.app': 'Mon Application Web',
        'services.appDesc': 'Outil d\'aide à la décision pour les agriculteurs',
        'services.viewApp': 'Voir l\'application',
        
        // CV Section
        'cv.title': 'Curriculum Vitae',
        'cv.downloadTitle': 'Téléchargez mon CV complet',
        'cv.downloadDesc': 'Consultez mon curriculum vitae détaillé au format PDF',
        'cv.downloadButton': 'Télécharger le CV (PDF)',
        'cv.overview': 'Vue d\'ensemble',
        'cv.format': 'Format:',
        'cv.lastUpdate': 'Dernière mise à jour:',
        'cv.availableLanguages': 'Langues disponibles:',
        'cv.languages': 'Français, Anglais',
        'cv.downloads': 'Téléchargements:',
        
        // Contact Section
        'contact.title': 'Contact',
        'contact.info': 'Informations de contact',
        'contact.email': 'Email:',
        'contact.whatsapp': 'WhatsApp:',
        'contact.phone': 'Téléphone:',
        'contact.linkedin': 'LinkedIn:',
        'contact.github': 'GitHub:',
        'contact.sendMessage': 'Envoyez-moi un message',
        'contact.name': 'Nom',
        'contact.emailPlaceholder': 'Votre email',
        'contact.message': 'Message',
        'contact.send': 'Envoyer',
        
        // Footer
        'footer.visitors': 'Visiteurs',
        'footer.downloads': 'Téléchargements CV',
        'footer.rights': 'Tous droits réservés',
        'footer.lastUpdate': 'Dernière mise à jour:'
    },
    en: {
        // Navigation
        'nav.brand': 'My Portfolio',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.experience': 'Experience',
        'nav.education': 'Education',
        'nav.services': 'Services',
        'nav.cv': 'Resume',
        'nav.contact': 'Contact',
        
        // Hero Section
        'hero.welcome': 'Welcome to my portfolio — pleased to meet you!',
        'hero.downloadCv': 'Download my CV',
        'hero.contact': 'Contact me',
        'hero.viewApp': 'View my application',
        
        // About Section
        'about.title': 'About me',
        'about.location': 'Location:',
        'about.availability': 'Availability:',
        'about.languages': 'Languages:',
        'about.status': 'Status:',
        'about.hobbies': 'Hobbies',
        'about.music': 'Music',
        'about.musicDesc': 'Passionate musician',
        'about.reading': 'Reading',
        'about.readingDesc': 'Passionate reader',
        
        // Skills Section
        'skills.title': 'Skills',
        'skills.expertise': 'Areas of Expertise',
        'skills.tools': 'Tools & Technologies',
        'skills.technical': 'Technical Skills',
        'skills.soft': 'Soft Skills',
        
        // Experience Section
        'experience.title': 'Professional Experience',
        
        // Education Section
        'education.title': 'Education',
        'education.inProgress': 'In progress',
        'education.certificates': 'Certificates',
        'education.english': 'English Proficiency Certificate',
        'education.project': 'Project Management Certificate',
        'education.ai': 'Artificial Intelligence Certificate',
        'education.web': 'Web Development Certificate',
        
        // Services Section
        'services.title': 'Freelance Services',
        'services.intro': 'I offer freelance services in sustainable agriculture, environment and sustainable development.',
        'services.consultation': 'Sustainable Agriculture Consulting',
        'services.consultationDesc': 'Advice and support for sustainable and environmentally friendly agricultural practices.',
        'services.evaluation': 'Environmental Assessment',
        'services.evaluationDesc': 'Carbon footprint, environmental audits and impact analysis.',
        'services.water': 'Water Resources Management',
        'services.waterDesc': 'Expertise in sustainable water resource management and optimization of their use.',
        'services.sustainable': 'Sustainable Development',
        'services.sustainableDesc': 'Support in implementing sustainable development strategies.',
        'services.cta': 'Interested in my services? Contact me to discuss your project!',
        'services.contact': 'Contact me',
        'services.app': 'My Web Application',
        'services.appDesc': 'Decision support tool for farmers',
        'services.viewApp': 'View application',
        
        // CV Section
        'cv.title': 'Curriculum Vitae',
        'cv.downloadTitle': 'Download my complete CV',
        'cv.downloadDesc': 'View my detailed curriculum vitae in PDF format',
        'cv.downloadButton': 'Download CV (PDF)',
        'cv.overview': 'Overview',
        'cv.format': 'Format:',
        'cv.lastUpdate': 'Last update:',
        'cv.availableLanguages': 'Available languages:',
        'cv.languages': 'French, English',
        'cv.downloads': 'Downloads:',
        
        // Contact Section
        'contact.title': 'Contact',
        'contact.info': 'Contact information',
        'contact.email': 'Email:',
        'contact.whatsapp': 'WhatsApp:',
        'contact.phone': 'Phone:',
        'contact.linkedin': 'LinkedIn:',
        'contact.github': 'GitHub:',
        'contact.sendMessage': 'Send me a message',
        'contact.name': 'Name',
        'contact.emailPlaceholder': 'Your email',
        'contact.message': 'Message',
        'contact.send': 'Send',
        
        // Footer
        'footer.visitors': 'Visitors',
        'footer.downloads': 'CV Downloads',
        'footer.rights': 'All rights reserved',
        'footer.lastUpdate': 'Last update:'
    }
};

