// ==========================================
// SISTEMA DE TRADUCCIÓN
// ==========================================
let currentLang = 'es';
const translations = {
    es: {
        'btn-sending': 'Sembrando...',
        'btn-sent': 'Mensaje Sembrado ✨',
        'thanks-message': 'Gracias. Tu mensaje ha sido sembrado.'
    },
    en: {
        'btn-sending': 'Planting...',
        'btn-sent': 'Message Planted ✨',
        'thanks-message': 'Thank you. Your message has been planted.'
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    document.documentElement.lang = currentLang;
    
    const elements = document.querySelectorAll('[data-lang-es], [data-lang-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-lang-${currentLang}`);
        if (text) {
            element.textContent = text;
        }
    });
}

// ==========================================
// REGISTRO DE PLUGINS GSAP
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// ANIMACIÓN DEL SPLASH SCREEN
// ==========================================
window.addEventListener('load', () => {
    const logoPaths = document.querySelectorAll('.logo-path');
    const logoText = document.querySelector('.logo-text');
    const splashScreen = document.getElementById('splashScreen');
    
    logoPaths.forEach((path, index) => {
        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.5,
            delay: index * 0.2,
            ease: "power2.inOut"
        });
    });
    
    gsap.to(logoText, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 2,
        ease: "power2.out"
    });
    
    setTimeout(() => {
        splashScreen.classList.add('hide');
    }, 4000);
});

// ==========================================
// MENÚ DE NAVEGACIÓN
// ==========================================
const mainNav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Smooth scroll y cierre de menú
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// ==========================================
// IDIOMA
// ==========================================
document.getElementById('languageToggle').addEventListener('click', toggleLanguage);

// ==========================================
// CURSOR PERSONALIZADO
// ==========================================
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    gsap.to(cursor, {
        x: mouseX - 10,
        y: mouseY - 10,
        duration: 0.15,
        ease: "power2.out"
    });
});

// Cambiar cursor en hover de elementos interactivos
document.querySelectorAll('a, button, .plantilla-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 1.5,
            duration: 0.3
        });
    });
    
    element.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.3
        });
    });
});

// ==========================================
// ANIMACIONES DE SCROLL
// ==========================================
gsap.utils.toArray('.fade-in').forEach(element => {
    gsap.fromTo(element, 
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        }
    );
});

// ==========================================
// ANIMACIONES DE PLANTILLAS
// ==========================================
gsap.utils.toArray('.plantilla-card').forEach((card, index) => {
    gsap.fromTo(card,
        { 
            y: 60, 
            opacity: 0,
            scale: 0.9
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none none"
            }
        }
    );
});

// Efecto hover de plantillas
document.querySelectorAll('.plantilla-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        createPlantillaParticles(e.clientX, e.clientY);
    });
});

function createPlantillaParticles(x, y) {
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #1ABC9C, #16A085);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 10px rgba(26, 188, 156, 0.6);
        `;
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 3 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        gsap.to(particle, {
            x: vx * 100,
            y: vy * 100,
            opacity: 0,
            scale: 0,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
}

// ==========================================
// ANIMACIÓN DE SVGs DECORATIVOS
// ==========================================
gsap.utils.toArray('.decorative-svg').forEach((svg, index) => {
    gsap.to(svg, {
        rotation: 360,
        duration: 20 + (index * 5),
        repeat: -1,
        ease: "none"
    });
});

// ==========================================
// ANIMACIONES DEL HERO
// ==========================================
const heroElements = {
    title: document.querySelector('.animate-title'),
    subtitle: document.querySelector('.animate-subtitle'),
    description: document.querySelector('.animate-description'),
    ctas: document.querySelector('.animate-ctas')
};

// Animar chakana central
gsap.to('.hero-chakana', {
    rotation: 360,
    duration: 120,
    repeat: -1,
    ease: "none"
});

// Parallax effect en hero
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroChakana = document.querySelector('.hero-chakana');
        const decorativeSvgs = document.querySelectorAll('.decorative-svg');
        
        if (heroChakana) {
            heroChakana.style.transform = `translateY(${scrolled * 0.5}px) rotate(${scrolled * 0.1}deg)`;
            heroChakana.style.opacity = 1 - (scrolled / 800);
        }
        
        decorativeSvgs.forEach((svg, index) => {
            const speed = 0.3 + (index * 0.1);
            svg.style.transform = `translateY(${scrolled * speed}px)`;
            svg.style.opacity = 1 - (scrolled / 1000);
        });
    });
}

// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================
const formulario = document.querySelector('.formulario');
if (formulario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.querySelector('.btn-enviar');
        const originalText = btn.textContent;
        
        btn.textContent = translations[currentLang]['btn-sending'];
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = translations[currentLang]['btn-sent'];
            
            const semilla = document.createElement('div');
            semilla.innerHTML = '🌱';
            semilla.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                font-size: 3rem;
                z-index: 10000;
                pointer-events: none;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(semilla);
            
            gsap.fromTo(semilla, 
                { scale: 0, y: 0, rotation: 0 },
                { 
                    scale: 3, 
                    y: -100,
                    rotation: 360,
                    duration: 2,
                    ease: "power2.out",
                    onComplete: () => semilla.remove()
                }
            );
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                formulario.reset();
            }, 3000);
        }, 2000);
    });
}

// ==========================================
// OPTIMIZACIÓN PARA MÓVILES
// ==========================================
function updateResponsiveElements() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Desactivar efectos pesados en móvil
        document.querySelectorAll('.floating-particles .particle').forEach(p => {
            p.style.display = 'none';
        });
    } else {
        document.querySelectorAll('.floating-particles .particle').forEach(p => {
            p.style.display = 'block';
        });
    }
}

window.addEventListener('resize', updateResponsiveElements);
updateResponsiveElements();

// ==========================================
// ACCESIBILIDAD
// ==========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        cursor.style.display = 'none';
    }
    
    // Cerrar menú móvil con ESC
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

document.addEventListener('mousemove', () => {
    cursor.style.display = 'block';
});

// ==========================================
// CAMBIO DE CURSOR POR SECCIÓN
// ==========================================
const secciones = [
    { selector: '.umbral', emoji: '✨' },
    { selector: '.plantillas', emoji: '🌐' },
    { selector: '.proyectos', emoji: '🎨' },
    { selector: '.fases', emoji: '⚡' },
    { selector: '.servicios', emoji: '💫' },
    { selector: '.sobre-mi', emoji: '👋' },
    { selector: '.contacto', emoji: '📧' }
];

secciones.forEach(seccion => {
    ScrollTrigger.create({
        trigger: seccion.selector,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
            if (cursor) cursor.innerHTML = seccion.emoji;
        },
        onEnterBack: () => {
            if (cursor) cursor.innerHTML = seccion.emoji;
        }
    });
});

// ==========================================
// EFECTOS DE ENTRADA SUAVES
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ==========================================
// ANIMACIÓN DEL SCROLL INDICATOR
// ==========================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const plantillasSection = document.querySelector('#plantillas');
        if (plantillasSection) {
            window.scrollTo({
                top: plantillasSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Reducir animaciones cuando la batería está baja
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        if (battery.level < 0.2) {
            document.body.classList.add('low-power-mode');
            gsap.globalTimeline.timeScale(0.5);
        }
    });
}

// ==========================================
// CONSOLE ART
// ==========================================
console.log('%c✨ Séptima Pacha ✨', 'font-size: 2rem; color: #F39C12; font-weight: bold;');
console.log('%cArte multidisciplinario ancestral-tecnológico', 'font-size: 1rem; color: #1ABC9C;');
console.log('%cHecho con 💛 por Séptima Pacha', 'font-size: 0.9rem; color: #fff;');

// ==========================================
// INICIALIZACIÓN FINAL
// ==========================================
console.log('✨ Sistema de animaciones cargado correctamente');
console.log('🎨 Menú de navegación activo');
console.log('🌐 Efectos interactivos listos');
