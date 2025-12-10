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


/* ==========================================
   SECCIÓN: Las 4 Fases del Arte - ESTILOS MEJORADOS
   ========================================== */

:root {
    --tierra: #8B4513;
    --fuego: #FF6B35;
    --aire: #4A90E2;
    --agua: #2ECC71;
    --oro: #F39C12;
    --sombra: #2C3E50;
}

/* ========== FASES SECTION ========== */
.fases {
    min-height: 100vh;
    padding: 4rem 2rem;
    background: radial-gradient(ellipse at center, #2d2d2d 0%, #1a1a1a 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: visible;
}

/* SVGs decorativos en fases */
.fases-decorative-svg {
    position: absolute;
    width: 250px;
    height: 250px;
    opacity: 0.08;
    pointer-events: none;
    z-index: 0;
    animation: floatDecorativeFases 8s ease-in-out infinite;
}

.fases-top-left {
    top: 5%;
    left: 5%;
    animation-delay: 0s;
}

.fases-top-right {
    top: 5%;
    right: 5%;
    animation-delay: 1.5s;
}

.fases-bottom-left {
    bottom: 5%;
    left: 5%;
    animation-delay: 3s;
}

.fases-bottom-right {
    bottom: 5%;
    right: 5%;
    animation-delay: 4.5s;
}

@keyframes floatDecorativeFases {
    0%, 100% { 
        transform: translateY(0) rotate(0deg); 
    }
    50% { 
        transform: translateY(-20px) rotate(2deg); 
    }
}

.fases .section-title {
    position: relative;
    z-index: 10;
    margin-bottom: 3rem;
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: var(--oro);
    text-align: center;
    animation: fadeInDown 0.8s ease;
}

/* ========== CHAKANA CONTAINER ========== */
.chakana-container {
    position: relative;
    width: clamp(280px, 90vw, 700px);
    height: clamp(280px, 90vw, 700px);
    margin: 0 auto;
    z-index: 10;
    animation: fadeInScale 1s ease 0.2s both;
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* ========== CHAKANA CIRCLE ========== */
.chakana-circle {
    width: 100%;
    height: 100%;
    border: 4px solid var(--oro);
    border-radius: 50%;
    position: relative;
    background: radial-gradient(circle at center, 
        rgba(139, 69, 19, 0.1) 0%, 
        rgba(255, 107, 53, 0.1) 25%,
        rgba(74, 144, 226, 0.1) 50%,
        rgba(46, 204, 113, 0.1) 75%,
        transparent 100%);
    backdrop-filter: blur(10px);
    box-shadow: 
        0 0 40px rgba(243, 156, 18, 0.4),
        inset 0 0 40px rgba(243, 156, 18, 0.15),
        0 0 80px rgba(243, 156, 18, 0.2);
    animation: pulseCircle 6s ease-in-out infinite;
}

@keyframes pulseCircle {
    0%, 100% {
        box-shadow: 
            0 0 40px rgba(243, 156, 18, 0.4),
            inset 0 0 40px rgba(243, 156, 18, 0.15),
            0 0 80px rgba(243, 156, 18, 0.2);
    }
    50% {
        box-shadow: 
            0 0 60px rgba(243, 156, 18, 0.6),
            inset 0 0 50px rgba(243, 156, 18, 0.2),
            0 0 100px rgba(243, 156, 18, 0.35);
    }
}

/* ========== CHAKANA CROSS ========== */
.chakana-cross {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.cross-line {
    position: absolute;
    background: linear-gradient(90deg, 
        transparent 0%, 
        var(--oro) 20%, 
        var(--oro) 80%, 
        transparent 100%);
    box-shadow: 0 0 15px rgba(243, 156, 18, 0.6);
    animation: glowPulse 3s ease-in-out infinite;
}

.cross-horizontal {
    width: 100%;
    height: 3px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

.cross-vertical {
    width: 3px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    background: linear-gradient(180deg, 
        transparent 0%, 
        var(--oro) 20%, 
        var(--oro) 80%, 
        transparent 100%);
}

.cross-vertical {
    animation-delay: 1.5s;
}

@keyframes glowPulse {
    0%, 100% {
        opacity: 0.5;
        box-shadow: 0 0 15px rgba(243, 156, 18, 0.6);
    }
    50% {
        opacity: 1;
        box-shadow: 0 0 25px rgba(243, 156, 18, 1);
    }
}

/* ========== CHAKANA CENTER ========== */
.chakana-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: radial-gradient(circle, var(--oro) 0%, var(--sombra) 100%);
    border-radius: 50%;
    border: 3px solid var(--oro);
    box-shadow: 
        0 0 30px rgba(243, 156, 18, 0.8),
        inset 0 0 15px rgba(243, 156, 18, 0.4);
    z-index: 20;
    animation: rotatePulse 8s linear infinite;
}

@keyframes rotatePulse {
    0% {
        transform: translate(-50%, -50%) rotate(0deg) scale(1);
        box-shadow: 0 0 30px rgba(243, 156, 18, 0.8), inset 0 0 15px rgba(243, 156, 18, 0.4);
    }
    50% {
        transform: translate(-50%, -50%) rotate(180deg) scale(1.1);
        box-shadow: 0 0 50px rgba(243, 156, 18, 1), inset 0 0 25px rgba(243, 156, 18, 0.6);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg) scale(1);
        box-shadow: 0 0 30px rgba(243, 156, 18, 0.8), inset 0 0 15px rgba(243, 156, 18, 0.4);
    }
}

/* ========== FASES - POSICIONAMIENTO Y ESTILOS ========== */
.fase {
    position: absolute;
    width: clamp(140px, 25vw, 220px);
    height: clamp(140px, 25vw, 220px);
    border-radius: 20px;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    backdrop-filter: blur(25px);
    border: 2px solid;
    background-clip: padding-box;
    z-index: 5;
    text-decoration: none;
    color: inherit;
    transform-origin: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.fase::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 20px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.5s ease;
    background: linear-gradient(135deg, currentColor, var(--oro));
}

/* TIERRA - Arriba Izquierda */
.fase-tierra {
    top: clamp(5%, 5vw, 12%);
    left: clamp(5%, 5vw, 12%);
    background: rgba(139, 69, 19, 0.25);
    border-color: var(--tierra);
    color: #FFE5CC;
    animation: slideInTierra 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both;
}

.fase-tierra::before {
    background: linear-gradient(135deg, var(--tierra), var(--oro));
}

@keyframes slideInTierra {
    from {
        opacity: 0;
        transform: translate(-50px, -50px) scale(0.5);
    }
    to {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }
}

/* AGUA - Arriba Derecha */
.fase-agua {
    top: clamp(5%, 5vw, 12%);
    right: clamp(5%, 5vw, 12%);
    background: rgba(74, 144, 226, 0.25);
    border-color: var(--aire);
    color: #B3E5FF;
    animation: slideInAguaTop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s both;
}

.fase-agua::before {
    background: linear-gradient(135deg, var(--aire), var(--oro));
}

@keyframes slideInAguaTop {
    from {
        opacity: 0;
        transform: translate(50px, -50px) scale(0.5);
    }
    to {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }
}

/* FUEGO - Abajo Derecha */
.fase-fuego {
    bottom: clamp(5%, 5vw, 12%);
    right: clamp(5%, 5vw, 12%);
    background: rgba(255, 107, 53, 0.25);
    border-color: var(--fuego);
    color: #FFD4B3;
    animation: slideInFuego 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s both;
}

.fase-fuego::before {
    background: linear-gradient(135deg, var(--fuego), var(--oro));
}

@keyframes slideInFuego {
    from {
        opacity: 0;
        transform: translate(50px, 50px) scale(0.5);
    }
    to {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }
}

/* AIRE - Abajo Izquierda */
.fase-aire {
    bottom: clamp(5%, 5vw, 12%);
    left: clamp(5%, 5vw, 12%);
    background: rgba(46, 204, 113, 0.25);
    border-color: var(--agua);
    color: #B3FFD4;
    animation: slideInAireBottom 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s both;
}

.fase-aire::before {
    background: linear-gradient(135deg, var(--agua), var(--oro));
}

@keyframes slideInAireBottom {
    from {
        opacity: 0;
        transform: translate(-50px, 50px) scale(0.5);
    }
    to {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }
}

/* ========== HOVER EFFECTS ========== */
.fase:hover {
    transform: scale(1.15);
    z-index: 15;
    filter: brightness(1.15);
    backdrop-filter: blur(35px);
}

.fase:hover::before {
    opacity: 0.35;
}

.fase-tierra:hover {
    box-shadow: 0 20px 60px rgba(139, 69, 19, 0.5);
    background: rgba(139, 69, 19, 0.4);
}

.fase-agua:hover {
    box-shadow: 0 20px 60px rgba(74, 144, 226, 0.5);
    background: rgba(74, 144, 226, 0.4);
}

.fase-fuego:hover {
    box-shadow: 0 20px 60px rgba(255, 107, 53, 0.5);
    background: rgba(255, 107, 53, 0.4);
}

.fase-aire:hover {
    box-shadow: 0 20px 60px rgba(46, 204, 113, 0.5);
    background: rgba(46, 204, 113, 0.4);
}

.fase:hover .fase-inner {
    transform: translateY(0);
}

.fase:hover .fase-circle {
    animation: rotateSVG 2s linear infinite;
}

/* ========== FASE INNER STRUCTURE ========== */
.fase-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    gap: clamp(0.3rem, 2vw, 0.5rem);
    transition: transform 0.4s ease;
}

/* ========== FASE CIRCLE (SVG CONTAINER) ========== */
.fase-circle {
    width: clamp(50px, 12vw, 90px);
    height: clamp(50px, 12vw, 90px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    animation: floatIcon 3s ease-in-out infinite;
    transition: all 0.4s ease;
}

@keyframes floatIcon {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-6px);
    }
}

/* SVG STYLING */
.fase-svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 10px currentColor);
    opacity: 0.95;
    transition: all 0.4s ease;
}

.fase:hover .fase-svg {
    opacity: 1;
    filter: drop-shadow(0 0 20px currentColor);
}

@keyframes rotateSVG {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/* ========== FASE TITULO ========== */
.fase-titulo {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.1rem, 3.5vw, 1.5rem);
    font-weight: 700;
    margin: 0;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 2px;
    flex-shrink: 0;
}

.fase:hover .fase-titulo {
    transform: scale(1.1);
}

/* ========== FASE SUBTITULO ========== */
.fase-subtitulo {
    font-size: clamp(0.6rem, 1.4vw, 0.8rem);
    font-weight: 700;
    margin: 0;
    opacity: 0.95;
    line-height: 1.25;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.4s ease;
    flex-shrink: 0;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
}

.fase:hover .fase-subtitulo {
    opacity: 1;
    letter-spacing: 1.5px;
    transform: scale(1.05);
}

/* ========== FASE EPIGRAFE ========== */
.fase-epigrafe {
    font-size: clamp(0.55rem, 1.2vw, 0.75rem);
    font-weight: 500;
    margin: 0;
    opacity: 0;
    line-height: 1.5;
    font-style: italic;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: translateY(15px);
    pointer-events: none;
    flex-shrink: 0;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    max-width: 95%;
    text-align: center;
}

/* MOSTRAR EPIGRAFE AL HOVER */
.fase:hover .fase-epigrafe {
    opacity: 1;
    transform: translateY(0);
}

/* ========== RESPONSIVE DESIGN ========== */
@media (max-width: 1200px) {
    .chakana-container {
        width: clamp(260px, 85vw, 600px);
        height: clamp(260px, 85vw, 600px);
    }

    .fase {
        width: clamp(130px, 23vw, 200px);
        height: clamp(130px, 23vw, 200px);
    }
}

@media (max-width: 768px) {
    .fases {
        padding: 3rem 1.5rem;
        min-height: auto;
    }

    .fases .section-title {
        font-size: 2rem;
        margin-bottom: 2.5rem;
    }

    .chakana-container {
        width: min(90vw, 450px);
        height: min(90vw, 450px);
        margin: 2rem auto;
    }

    .fase {
        width: clamp(120px, 22vw, 180px);
        height: clamp(120px, 22vw, 180px);
        padding: 1rem;
    }

    .fase-circle {
        width: clamp(50px, 10vw, 75px);
        height: clamp(50px, 10vw, 75px);
    }

    .fase-titulo {
        font-size: clamp(1rem, 3vw, 1.3rem);
    }

    .fase-subtitulo {
        font-size: clamp(0.55rem, 1.2vw, 0.75rem);
    }

    .fase-epigrafe {
        font-size: clamp(0.5rem, 1.1vw, 0.7rem);
    }

    /* Ajustes de posicionamiento para tablet */
    .fase-tierra {
        top: 8%;
        left: 8%;
    }

    .fase-agua {
        top: 8%;
        right: 8%;
    }

    .fase-fuego {
        bottom: 8%;
        right: 8%;
    }

    .fase-aire {
        bottom: 8%;
        left: 8%;
    }
}

@media (max-width: 600px) {
    .fases {
        padding: 2.5rem 1rem;
    }

    .fases .section-title {
        font-size: 1.75rem;
        margin-bottom: 2rem;
    }

    .chakana-container {
        width: min(95vw, 350px);
        height: min(95vw, 350px);
        margin: 1.5rem auto;
    }

    .chakana-circle {
        border-width: 3px;
    }

    .fase {
        width: clamp(110px, 20vw, 160px);
        height: clamp(110px, 20vw, 160px);
        padding: 0.9rem;
        border-radius: 15px;
    }

    .fase-circle {
        width: clamp(45px, 9vw, 65px);
        height: clamp(45px, 9vw, 65px);
    }

    .fase-titulo {
        font-size: clamp(0.9rem, 2.5vw, 1.1rem);
        letter-spacing: 1px;
    }

    .fase-subtitulo {
        font-size: clamp(0.5rem, 1rem, 0.65rem);
        letter-spacing: 0.5px;
        line-height: 1.2;
    }

    .fase-epigrafe {
        font-size: clamp(0.48rem, 0.9vw, 0.6rem);
        line-height: 1.4;
    }

    .fase-inner {
        gap: clamp(0.25rem, 1.5vw, 0.4rem);
    }
}

@media (max-width: 480px) {
    .fases {
        padding: 2rem 0.75rem;
    }

    .fases .section-title {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .chakana-container {
        width: min(100vw, 300px);
        height: min(100vw, 300px);
        margin: 1rem auto;
    }

    .chakana-circle {
        border-width: 2px;
    }

    .fase {
        width: clamp(105px, 18vw, 150px);
        height: clamp(105px, 18vw, 150px);
        padding: 0.8rem;
    }

    .fase-circle {
        width: clamp(40px, 8vw, 60px);
        height: clamp(40px, 8vw, 60px);
    }

    .fase-titulo {
        font-size: clamp(0.85rem, 2.2vw, 1rem);
    }

    .fase-subtitulo {
        font-size: clamp(0.48rem, 0.95vw, 0.6rem);
    }

    .fase-epigrafe {
        font-size: clamp(0.45rem, 0.85vw, 0.55rem);
    }
}

/* ========== ANIMACIONES DE ENTRADA ========== */
.fade-in {
    animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ========== EFECTOS ADICIONALES ========== */
.fase::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(45deg, transparent 30%, var(--oro), transparent 70%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    animation: shine 3s infinite;
    pointer-events: none;
}

@keyframes shine {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: translateX(100%);
    }
}

.fase:hover::after {
    animation: shine 1.5s infinite;
}
