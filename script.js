// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animación de los links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Cambiar navbar al hacer scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scrolling para los links de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                links.forEach(link => {
                    link.style.animation = '';
                });
            }
        }
    });
});

// Animación al cargar la página
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translate(-50%, -50%)';
});

// Validación del formulario
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validación simple
        const name = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');
        
        if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
            alert('Por favor complete todos los campos requeridos');
            return;
        }
        
        if (!validateEmail(email.value)) {
            alert('Por favor ingrese un correo electrónico válido');
            return;
        }
        
        // Simular envío
        alert('Gracias por su mensaje. Nos pondremos en contacto pronto.');
        contactForm.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}