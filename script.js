// ========== REGISTRAR SCROLL TRIGGER ==========
gsap.registerPlugin(ScrollTrigger);

// ========== VARIABLES GLOBALES ==========
const languageToggle = document.getElementById('languageToggle');
const menuBoton = document.getElementById('menuBoton');
const menuCerrar = document.getElementById('menuCerrar');
const expandableMenu = document.getElementById('expandableMenu');
const menuItems = document.querySelectorAll('.menu-item');
const splashScreen = document.getElementById('splashScreen');
const customCursor = document.querySelector('.custom-cursor');
let currentLanguage = 'es';

// ========== SPLASH SCREEN ==========
window.addEventListener('load', () => {
    if (splashScreen) {
        gsap.to(splashScreen, {
            opacity: 0,
            duration: 1,
            delay: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
                splashScreen.style.display = 'none';
            }
        });
    }
});

// ========== IDIOMA / TRADUCTOR ==========
function changeLanguage(lang) {
    currentLanguage = lang;
    const elements = document.querySelectorAll('[data-lang-es][data-lang-en]');
    
    elements.forEach(element => {
        if (lang === 'es') {
            element.textContent = element.getAttribute('data-lang-es');
        } else {
            element.textContent = element.getAttribute('data-lang-en');
        }
    });

    // Cambiar texto del toggle
    const toggleText = languageToggle.textContent.trim();
    if (toggleText === 'English' || currentLanguage === 'es') {
        languageToggle.textContent = 'Español';
    } else {
        languageToggle.textContent = 'English';
    }

    // Guardar preferencia
    localStorage.setItem('language', lang);
}

// Cargar idioma guardado
const savedLanguage = localStorage.getItem('language') || 'es';
currentLanguage = savedLanguage;
changeLanguage(savedLanguage);

// Toggle idioma
if (languageToggle) {
    languageToggle.addEventListener('click', () => {
        const newLang = currentLanguage === 'es' ? 'en' : 'es';
        changeLanguage(newLang);
    });
}

// ========== MENÚ EXPANDIBLE ==========
function toggleMenu() {
    const isOpen = expandableMenu.classList.contains('open');
    
    if (isOpen) {
        expandableMenu.classList.remove('open');
        gsap.to(expandableMenu, {
            duration: 0.3,
            x: 100,
            opacity: 0,
            ease: 'back.in'
        });
    } else {
        expandableMenu.classList.add('open');
        gsap.to(expandableMenu, {
            duration: 0.3,
            x: 0,
            opacity: 1,
            ease: 'back.out'
        });
    }
}

if (menuBoton) {
    menuBoton.addEventListener('click', toggleMenu);
}

if (menuCerrar) {
    menuCerrar.addEventListener('click', toggleMenu);
}

// Cerrar menú al hacer click en un item
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        toggleMenu();
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: element,
                    ease: 'power2.inOut'
                });
            }
        }
    });
});

// ========== CURSOR PERSONALIZADO ==========
document.addEventListener('mousemove', (e) => {
    if (customCursor) {
        gsap.to(customCursor, {
            x: e.clientX - 5,
            y: e.clientY - 5,
            duration: 0.1,
            overwrite: 'auto'
        });
    }
});

document.addEventListener('mouseenter', () => {
    if (customCursor) {
        customCursor.style.display = 'block';
    }
});

document.addEventListener('mouseleave', () => {
    if (customCursor) {
        customCursor.style.display = 'none';
    }
});

// Efecto al pasar sobre links
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (customCursor) {
            gsap.to(customCursor, {
                duration: 0.2,
                width: '30px',
                height: '30px',
                borderColor: 'var(--oro)',
                ease: 'back.out'
            });
        }
    });

    element.addEventListener('mouseleave', () => {
        if (customCursor) {
            gsap.to(customCursor, {
                duration: 0.2,
                width: '10px',
                height: '10px',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                ease: 'back.out'
            });
        }
    });
});

// ========== HERO SECTION - ANIMACIONES ==========

// Animar título principal
const tituloPrincipal = document.querySelector('.titulo-principal');
if (tituloPrincipal) {
    gsap.fromTo(tituloPrincipal,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            delay: 0.3
        }
    );
}

// Animar subtítulo
const subtitulo = document.querySelector('.subtitulo');
if (subtitulo) {
    gsap.fromTo(subtitulo,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            delay: 0.5
        }
    );
}

// Animar descripción
const heroDescription = document.querySelector('.hero-description');
if (heroDescription) {
    gsap.fromTo(heroDescription,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            delay: 0.7
        }
    );
}

// Animar CTAs
const heroCtas = document.querySelectorAll('.hero-ctas a');
heroCtas.forEach((cta, index) => {
    gsap.fromTo(cta,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            delay: 0.9 + (index * 0.2)
        }
    );

    // Efecto hover
    cta.addEventListener('mouseenter', () => {
        gsap.to(cta, {
            duration: 0.3,
            scale: 1.05,
            ease: 'back.out'
        });
    });

    cta.addEventListener('mouseleave', () => {
        gsap.to(cta, {
            duration: 0.3,
            scale: 1,
            ease: 'back.out'
        });
    });
});

// Animar scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    gsap.to(scrollIndicator, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// ========== SERVICIOS CIRCULARES - INTERACTIVIDAD ==========

document.addEventListener('DOMContentLoaded', () => {
    const serviciosCirculos = document.querySelectorAll('.servicio-circulo');

    serviciosCirculos.forEach((circulo) => {
        // Animación al pasar el mouse
        circulo.addEventListener('mouseenter', () => {
            gsap.to(circulo, {
                duration: 0.4,
                scale: 1.15,
                y: -20,
                ease: 'back.out'
            });

            // Animar el símbolo
            const simbolo = circulo.querySelector('.circulo-simbolo');
            if (simbolo) {
                gsap.to(simbolo, {
                    duration: 0.4,
                    scale: 1.2,
                    rotation: 360,
                    ease: 'back.out'
                });
            }
        });

        // Animación al salir el mouse
        circulo.addEventListener('mouseleave', () => {
            gsap.to(circulo, {
                duration: 0.4,
                scale: 1,
                y: 0,
                ease: 'back.out'
            });

            // Resetear símbolo
            const simbolo = circulo.querySelector('.circulo-simbolo');
            if (simbolo) {
                gsap.to(simbolo, {
                    duration: 0.4,
                    scale: 1,
                    rotation: 0,
                    ease: 'back.out'
                });
            }
        });

        // Click para ir a detalles (placeholder)
        circulo.addEventListener('click', (e) => {
            const href = circulo.getAttribute('href');
            if (href && !href.includes('-detail')) {
                return; // Si hay un href real, permitir navegación
            }
            e.preventDefault();
            console.log('🔄 Sección de detalle:', circulo.classList);
        });
    });

    console.log('✅ Servicios Circulares - Interactividad cargada');
});

// ========== SECCIÓN SOBRE SEPTIMA PACHA - ANIMACIONES ==========

// Animar secciones de elementos
gsap.utils.toArray('.seccion-elemento').forEach((elemento, index) => {
    gsap.fromTo(elemento,
        {
            y: 50,
            opacity: 0,
            scale: 0.9
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: elemento,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// Efectos hover en las secciones de elementos
document.querySelectorAll('.seccion-elemento').forEach((elemento) => {
    elemento.addEventListener('mouseenter', () => {
        gsap.to(elemento, {
            duration: 0.3,
            y: -10,
            scale: 1.02,
            ease: 'back.out'
        });
    });

    elemento.addEventListener('mouseleave', () => {
        gsap.to(elemento, {
            duration: 0.3,
            y: 0,
            scale: 1,
            ease: 'back.out'
        });
    });
});

// Animaciones para filosofía items
gsap.utils.toArray('.filosofia-item').forEach((item, index) => {
    gsap.fromTo(item,
        {
            x: -50,
            opacity: 0
        },
        {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// Animación para CTA buttons
document.querySelectorAll('.cta-btn').forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            duration: 0.3,
            y: -3,
            ease: 'back.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            duration: 0.3,
            y: 0,
            ease: 'back.out'
        });
    });

    // Ripple effect en click
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            transform: scale(0);
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        gsap.to(ripple, {
            duration: 0.6,
            scale: 1,
            opacity: 0,
            ease: 'power2.out',
            onComplete: () => {
                ripple.remove();
            }
        });
    });
});

console.log('✅ Sección Sobre Séptima Pacha - Animaciones cargadas');

// ========== SVG DECORATIVOS - ANIMACIONES INFINITAS ==========

// Animar SVGs decorativos del hero
gsap.utils.toArray('.decorative-svg').forEach((svg, index) => {
    gsap.to(svg, {
        duration: 8 + (index * 2),
        y: -20,
        rotation: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
});

// SVGs de servicios
gsap.utils.toArray('.servicios-top-left, .servicios-bottom-right').forEach((svg, index) => {
    gsap.to(svg, {
        duration: 10 + (index * 2),
        y: index % 2 === 0 ? -30 : 30,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });
});

// SVGs de sobre-septima
gsap.utils.toArray('.sobre-top-left, .sobre-bottom-right').forEach((svg, index) => {
    gsap.to(svg, {
        duration: 12 + (index * 2),
        y: index % 2 === 0 ? -25 : 25,
        rotation: -360,
        repeat: -1,
        ease: 'none'
    });
});

// SVG de contacto
const contactoSvg = document.querySelector('.contacto-bg-svg');
if (contactoSvg) {
    gsap.to(contactoSvg, {
        duration: 15,
        y: -40,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });
}

console.log('✅ SVGs Decorativos - Animaciones infinitas activas');

// ========== SCROLL ANIMATIONS GLOBALES ==========

// Animar todos los elementos con clase fade-in
gsap.utils.toArray('.fade-in').forEach((element) => {
    gsap.fromTo(element,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// ========== SECTION TITLES ANIMATION ==========

document.querySelectorAll('.section-title').forEach((title) => {
    gsap.fromTo(title,
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// ========== CHAKANA CENTER ANIMATION ==========

const chakanaCenter = document.querySelector('.chakana-center-fill');
if (chakanaCenter) {
    gsap.to(chakanaCenter, {
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// ========== PARALLAX EFFECT EN SCROLL ==========

gsap.registerEffect({
    name: 'fadeInUp',
    effect: (targets, config) => {
        return gsap.to(targets, {
            duration: config.duration,
            y: 0,
            opacity: 1,
            ease: 'power2.out'
        });
    },
    defaults: { duration: 0.5 }
});

// ========== CONSOLE LOGS PARA DEBUG ==========

console.log('%c✨ Séptima Pacha - Sistema Completo Cargado ✨', 'font-size: 16px; color: #F39C12; font-weight: bold;');
console.log('%c🎨 Hero: SVGs animados en lado izquierdo', 'color: #fff;');
console.log('%c💧 Servicios: Círculos con hover dinámico', 'color: #2ECC71;');
console.log('%c📚 Sobre Séptima Pacha: Sección completa activa', 'color: #4A90E2;');
console.log('%c🔄 SVGs: Animaciones infinitas en progreso', 'color: #FF6B35;');
console.log('%c🌐 Idioma actual:', 'color: #9B59B6;', currentLanguage.toUpperCase());

// ========== PERFORMANCE MONITORING ==========

if (typeof performance !== 'undefined' && performance.timing) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⏱️ Tiempo de carga total: ${loadTime}ms`);
    });
}

console.log('✅ Todos los scripts están activos y funcionando correctamente');
