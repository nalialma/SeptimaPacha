// Verificar elementos existentes
window.addEventListener('load', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.proyectos-content');
    
    console.log(`📊 Pestañas encontradas: ${tabs.length}`);
    console.log(`📄 Contenidos encontrados: ${contents.length}`);
    
    if (tabs.length > 0 && contents.length > 0) {
        console.log('✅ Sistema de pestañas listo para funcionar');
    }
});
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
// IDIOMA
// ==========================================
const languageToggle = document.getElementById('languageToggle');
if (languageToggle) {
    languageToggle.addEventListener('click', toggleLanguage);
}

// ==========================================
// CURSOR PERSONALIZADO
// ==========================================
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0;

if (cursor) {
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
}

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
// Animar chakana central
const heroChakana = document.querySelector('.hero-chakana');
if (heroChakana) {
    gsap.to(heroChakana, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: "none"
    });
}

// Parallax effect en hero
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
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
    if (e.key === 'Tab' && cursor) {
        cursor.style.display = 'none';
    }
    
    // Cerrar menú expandible con ESC
    if (e.key === 'Escape') {
        const menuExpandible = document.getElementById('expandableMenu');
        const menuBoton = document.getElementById('menuBoton');
        if (menuExpandible && menuExpandible.classList.contains('activo')) {
            cerrarMenu();
        }
    }
});

document.addEventListener('mousemove', () => {
    if (cursor) {
        cursor.style.display = 'block';
    }
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
// MENÚ EXPANDIBLE - VERSIÓN CORREGIDA Y MEJORADA
// ==========================================

// Selectores del menú
const menuBoton = document.getElementById('menuBoton');
const menuExpandible = document.getElementById('expandableMenu');
const menuCerrar = document.getElementById('menuCerrar');
const menuItems = document.querySelectorAll('.menu-item');

console.log('✨ Inicializando menú expandible...');
console.log('Menú elementos encontrados:', {
    boton: !!menuBoton,
    menu: !!menuExpandible,
    cerrar: !!menuCerrar,
    items: menuItems.length
});

// Función para abrir menú
function abrirMenu() {
    console.log('Abriendo menú...');
    if (menuExpandible && menuBoton) {
        menuExpandible.classList.add('activo');
        menuBoton.classList.add('activo');
        document.body.style.overflow = 'hidden';
        console.log('✅ Menú abierto');
    } else {
        console.error('❌ No se encontraron elementos del menú');
    }
}

// Función para cerrar menú
function cerrarMenu() {
    console.log('Cerrando menú...');
    if (menuExpandible && menuBoton) {
        menuExpandible.classList.remove('activo');
        menuBoton.classList.remove('activo');
        document.body.style.overflow = 'auto';
        console.log('✅ Menú cerrado');
    }
}

// Click en botón de menú
if (menuBoton) {
    menuBoton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Click en botón de menú');
        
        if (menuExpandible && menuExpandible.classList.contains('activo')) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    });
    console.log('✅ Event listener agregado al botón de menú');
} else {
    console.error('❌ No se encontró el botón de menú');
}

// Click en botón de cerrar
if (menuCerrar) {
    menuCerrar.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Click en botón de cerrar');
        cerrarMenu();
    });
    console.log('✅ Event listener agregado al botón de cerrar');
}

// Click en items del menú
menuItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log(`Click en item del menú ${index + 1}`);
        
        const targetSelector = item.getAttribute('data-scroll');
        console.log('Target selector:', targetSelector);
        
        const targetElement = document.querySelector(targetSelector);
        
        if (targetElement) {
            console.log('Elemento encontrado, cerrando menú y haciendo scroll...');
            cerrarMenu();
            
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 400);
        } else {
            console.error('❌ No se encontró el elemento:', targetSelector);
        }
    });
});

console.log(`✅ Event listeners agregados a ${menuItems.length} items del menú`);

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (menuExpandible && menuExpandible.classList.contains('activo')) {
        // Verificar si el click fue fuera del menú y del botón
        if (!menuExpandible.contains(e.target) && !menuBoton.contains(e.target)) {
            console.log('Click fuera del menú, cerrando...');
            cerrarMenu();
        }
    }
});

// Animación del botón al hacer hover
if (menuBoton) {
    menuBoton.addEventListener('mouseenter', () => {
        if (!menuBoton.classList.contains('activo')) {
            gsap.to(menuBoton, {
                duration: 0.3,
                scale: 1.15,
                ease: "back.out"
            });
        }
    });

    menuBoton.addEventListener('mouseleave', () => {
        if (!menuBoton.classList.contains('activo')) {
            gsap.to(menuBoton, {
                duration: 0.3,
                scale: 1,
                ease: "back.out"
            });
        }
    });
}

// Efecto hover en items del menú
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1.05,
            x: 10,
            ease: "back.out"
        });
    });

    item.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1,
            x: 0,
            ease: "back.out"
        });
    });
});

// ==========================================
// INICIALIZACIÓN FINAL
// ==========================================
console.log('✨ Sistema de animaciones cargado correctamente');
console.log('🎨 Menú expandible activo');
console.log('🌐 Efectos interactivos listos');

// Verificar que el menú esté presente en el DOM después de cargar
setTimeout(() => {
    const verificarMenu = document.getElementById('menuBoton');
    if (verificarMenu) {
        console.log('✅ Verificación final: Menú presente en el DOM');
    } else {
        console.error('❌ Verificación final: Menú NO encontrado en el DOM');
    }
}, 1000);

// ==========================================
// SISTEMA DE PESTAÑAS DE PROYECTOS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Inicializando sistema de pestañas de proyectos...');

    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectContents = document.querySelectorAll('.proyectos-content');

    if (tabButtons.length === 0) {
        console.warn('⚠️ No se encontraron botones de pestaña');
        return;
    }

    // Función para cambiar de pestaña
    function switchTab(tabName) {
        console.log(`📁 Cambiando a pestaña: ${tabName}`);

        // Remover clase active de todos los botones
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Remover clase active de todo el contenido
        projectContents.forEach(content => {
            content.classList.remove('active');
        });

        // Agregar clase active al botón clickeado
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
            console.log('✅ Botón activado:', tabName);
        } else {
            console.error('❌ No se encontró botón para:', tabName);
        }

        // Agregar clase active al contenido correspondiente
        const activeContent = document.querySelector(`.proyectos-content[data-content="${tabName}"]`);
        if (activeContent) {
            activeContent.classList.add('active');
            console.log('✅ Contenido activado:', tabName);

            // Trigger animation for fade-in elements
            const fadeInElements = activeContent.querySelectorAll('.proyecto');
            fadeInElements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.15}s`;
            });
        } else {
            console.error('❌ No se encontró contenido para:', tabName);
        }
    }

    // Event listeners para los botones - CON PREVENCIÓN DE PROPAGACIÓN
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const tabName = button.getAttribute('data-tab');
            console.log('🖱️ Click en botón:', tabName);
            
            switchTab(tabName);

            // Animar el botón
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });

        // Efecto al pasar el mouse
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('active')) {
                button.style.transform = 'translateY(-2px)';
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // Inicializar con la primera pestaña activa
    if (tabButtons.length > 0) {
        const firstTab = tabButtons[0].getAttribute('data-tab');
        switchTab(firstTab);
    }

    // Soporte de teclado - Navegar con flechas
    document.addEventListener('keydown', (e) => {
        const currentActiveBtn = document.querySelector('.tab-btn.active');
        const allBtns = Array.from(tabButtons);
        const currentIndex = allBtns.indexOf(currentActiveBtn);

        if (e.key === 'ArrowRight' && currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % allBtns.length;
            const nextTab = allBtns[nextIndex].getAttribute('data-tab');
            switchTab(nextTab);
        } else if (e.key === 'ArrowLeft' && currentIndex !== -1) {
            const prevIndex = (currentIndex - 1 + allBtns.length) % allBtns.length;
            const prevTab = allBtns[prevIndex].getAttribute('data-tab');
            switchTab(prevTab);
        }
    });

    console.log('✅ Sistema de pestañas cargado correctamente');
});


// ==========================================
// SCRIPT PARA LAS 4 FASES - ANIMACIONES COMPLETAS
// ==========================================

// Registrar ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ========== SPLASH SCREEN ==========
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splashScreen');
    const logo = document.querySelector('.logo-path');
    const logoText = document.querySelector('.logo-text');

    // Animar las líneas del logo
    if (logo) {
        gsap.to(logo, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.out'
        });
    }

    // Animar el texto del logo
    if (logoText) {
        gsap.to(logoText, {
            opacity: 1,
            duration: 1,
            delay: 1.5,
            ease: 'power2.out'
        });
    }

    // Ocultar splash screen después de 3.5 segundos
    setTimeout(() => {
        if (splashScreen) {
            gsap.to(splashScreen, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => {
                    splashScreen.classList.add('hide');
                }
            });
        }
    }, 3000);
});

// ========== ANIMACIONES DE FASES ==========

// Animar el contenedor de chakana al hacer scroll
gsap.to('.chakana-container', {
    scrollTrigger: {
        trigger: '.fases',
        start: 'top 70%',
        end: 'center center',
        scrub: false,
        once: true
    },
    opacity: 1,
    duration: 0.8
});

// Animar cada fase individualmente
const fases = document.querySelectorAll('.fase');
fases.forEach((fase, index) => {
    gsap.from(fase, {
        scrollTrigger: {
            trigger: '.fases',
            start: 'top 60%',
            toggleActions: 'play none none none',
            once: true
        },
        opacity: 0,
        duration: 0.8,
        delay: 0.15 * (index + 1),
        ease: 'back.out'
    });
});

// ========== INTERACTIVIDAD DE FASES ==========

fases.forEach(fase => {
    const faseCircle = fase.querySelector('.fase-circle');
    const faseSvg = fase.querySelector('.fase-svg');
    const faseEpigrafe = fase.querySelector('.fase-epigrafe');
    const faseSubtitulo = fase.querySelector('.fase-subtitulo');
    const faseTitulo = fase.querySelector('.fase-titulo');

    // Timeline para hover
    const hoverTimeline = gsap.timeline({ paused: true });

    // Configurar animaciones del timeline
    hoverTimeline
        .to(fase, {
            scale: 1.25,
            duration: 0.3,
            ease: 'power2.out'
        }, 0)
        .to(faseTitulo, {
            transform: 'scale(1.15)',
            duration: 0.3
        }, 0)
        .to(faseSubtitulo, {
            opacity: 1,
            letterSpacing: '3px',
            transform: 'scale(1.05)',
            duration: 0.3
        }, 0.05)
        .to(faseEpigrafe, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'back.out'
        }, 0.15);

    // Hover enter
    fase.addEventListener('mouseenter', () => {
        hoverTimeline.play();

        if (faseCircle) {
            gsap.to(faseCircle, {
                rotation: 360,
                duration: 2,
                ease: 'none',
                repeat: -1
            });
        }

        // Efecto glow mejorado
        if (faseSvg) {
            gsap.to(faseSvg, {
                filter: 'drop-shadow(0 0 25px currentColor)',
                duration: 0.3
            });
        }
    });

    // Hover leave
    fase.addEventListener('mouseleave', () => {
        hoverTimeline.reverse();

        if (faseCircle) {
            gsap.killTweensOf(faseCircle);
            gsap.to(faseCircle, {
                rotation: 0,
                duration: 0.5
            });
        }

        if (faseSvg) {
            gsap.to(faseSvg, {
                filter: 'drop-shadow(0 0 10px currentColor)',
                duration: 0.3
            });
        }
    });

    // Touch support para móvil
    fase.addEventListener('touchstart', () => {
        if (!fase.classList.contains('active')) {
            // Remover active de otras fases
            fases.forEach(f => f.classList.remove('active'));
            fase.classList.add('active');
            hoverTimeline.play();
        } else {
            fase.classList.remove('active');
            hoverTimeline.reverse();
        }
    });
});

// ========== ANIMACIÓN DE CHAKANA CENTER ==========

// Rotación continua del chakana center
gsap.to('.chakana-center', {
    rotation: 360,
    duration: 10,
    ease: 'none',
    repeat: -1
});

// Pulso del chakana circle
gsap.fromTo('.chakana-circle', 
    {
        boxShadow: '0 0 40px rgba(243, 156, 18, 0.4), inset 0 0 40px rgba(243, 156, 18, 0.15), 0 0 80px rgba(243, 156, 18, 0.2)'
    },
    {
        boxShadow: '0 0 60px rgba(243, 156, 18, 0.6), inset 0 0 50px rgba(243, 156, 18, 0.2), 0 0 100px rgba(243, 156, 18, 0.35)',
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    }
);

// ========== ANIMACIÓN DE CRUZ (CROSS LINES) ==========

const crossHorizontal = document.querySelector('.cross-horizontal');
const crossVertical = document.querySelector('.cross-vertical');

if (crossHorizontal) {
    gsap.fromTo(crossHorizontal,
        {
            opacity: 0.5,
            boxShadow: '0 0 15px rgba(243, 156, 18, 0.6)'
        },
        {
            opacity: 1,
            boxShadow: '0 0 25px rgba(243, 156, 18, 1)',
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        }
    );
}

if (crossVertical) {
    gsap.fromTo(crossVertical,
        {
            opacity: 0.5,
            boxShadow: '0 0 15px rgba(243, 156, 18, 0.6)'
        },
        {
            opacity: 1,
            boxShadow: '0 0 25px rgba(243, 156, 18, 1)',
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.5
        }
    );
}

// ========== ANIMACIÓN DE ICONOS (SVGs) ==========

const faseIcons = document.querySelectorAll('.fase-circle');
faseIcons.forEach((icon, index) => {
    gsap.to(icon, {
        y: -8,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
    });
});

// ========== EFECTO PARALLAX DECORATIVO ==========

gsap.utils.toArray('.fases-decorative-svg').forEach((svg, index) => {
    gsap.to(svg, {
        scrollTrigger: {
            trigger: '.fases',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -50 * (index % 2 === 0 ? 1 : -1),
        rotation: 10 * (index % 2 === 0 ? 1 : -1),
        ease: 'none'
    });
});

// ========== ANIMACIÓN AL HACER CLICK EN FASE ==========

fases.forEach(fase => {
    fase.addEventListener('click', (e) => {
        // Crear efecto ripple
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.borderRadius = '20px';
        ripple.style.border = '2px solid currentColor';
        ripple.style.pointerEvents = 'none';
        
        fase.style.position = 'relative';
        fase.appendChild(ripple);

        gsap.to(ripple, {
            scale: 1.5,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                ripple.remove();
            }
        });
    });
});

// ========== ANIMACIONES SCROLL TRIGGER PARA SECCIÓN ==========

// Animar el título de la sección
gsap.to('.fases .section-title', {
    scrollTrigger: {
        trigger: '.fases',
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
});

// ========== EFECTO SHINE EN FASES ==========

fases.forEach(fase => {
    const shineTimeline = gsap.timeline({ paused: true });
    
    shineTimeline.to(fase, {
        backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(243, 156, 18, 0.2) 50%, transparent 100%)',
        backgroundPosition: '200% center',
        duration: 0.6,
        ease: 'power2.inOut'
    });

    fase.addEventListener('mouseenter', () => {
        shineTimeline.play();
    });

    fase.addEventListener('mouseleave', () => {
        shineTimeline.reverse();
    });
});

// ========== RESPONSIVE ADJUSTMENTS ==========

// Ajustar animaciones en dispositivos móviles
const isMobile = window.innerWidth < 768;

if (isMobile) {
    // Reducir duración de animaciones en móvil
    gsap.globalTimeline.timeScale(0.9);
}

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// ========== ANIMACIÓN CONTINUA DE FASES AL CARGAR ==========

// Timeline para animar todo junto
const phasesTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.fases',
        start: 'top 70%',
        once: true
    }
});

phasesTimeline
    .to('.chakana-circle', { opacity: 1, duration: 0.6 }, 0)
    .to('.chakana-center', { scale: 1, opacity: 1, duration: 0.6 }, 0)
    .staggerTo('.fase', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out'
    }, 0.1, 0);

// ========== EFECTOS VISUALES ADICIONALES ==========

// Brillo en los bordes al hacer hover
fases.forEach(fase => {
    fase.addEventListener('mouseenter', () => {
        gsap.to(fase, {
            borderColor: getComputedStyle(fase).getPropertyValue('border-color'),
            boxShadow: `0 0 30px ${getComputedStyle(fase).color}99`,
            duration: 0.3
        });
    });
});

// ========== CONSOLE LOGS PARA DEBUG ==========

if (process.env.NODE_ENV === 'development') {
    console.log('✨ Animaciones de Las 4 Fases cargadas correctamente');
    console.log('🎨 Total de fases animadas:', fases.length);
}
