// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

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
    const nav = document.querySelector('.glass-nav');
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

// Animaciones al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate__animated');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate__fadeInUp');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Tabs de especificaciones
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remover clase active de todos los botones y contenidos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Agregar clase active al botón y contenido seleccionado
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
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
            showAlert('Por favor complete todos los campos requeridos', 'error');
            return;
        }
        
        if (!validateEmail(email.value)) {
            showAlert('Por favor ingrese un correo electrónico válido', 'error');
            return;
        }
        
        // Simular envío
        showAlert('Gracias por su mensaje. Nos pondremos en contacto pronto.', 'success');
        contactForm.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert-box ${type}`;
    alertBox.textContent = message;
    
    document.body.appendChild(alertBox);
    
    setTimeout(() => {
        alertBox.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 500);
    }, 5000);
}

// Video placeholder click
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        // Aquí podrías abrir un modal con el video real
        showAlert('Reproduciendo video demostrativo', 'info');
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]');
        
        if (email.value.trim() === '') {
            showAlert('Por favor ingrese su correo electrónico', 'error');
            return;
        }
        
        if (!validateEmail(email.value)) {
            showAlert('Por favor ingrese un correo electrónico válido', 'error');
            return;
        }
        
        showAlert('Gracias por suscribirse a nuestro newsletter', 'success');
        newsletterForm.reset();
    });
}

// Inicializar animaciones al cargar
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});