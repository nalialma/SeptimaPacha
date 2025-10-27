
        // Sistema de traducción
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
            
            // Actualizar todos los elementos con data-lang
            const elements = document.querySelectorAll('[data-lang-es], [data-lang-en]');
            elements.forEach(element => {
                const text = element.getAttribute(`data-lang-${currentLang}`);
                if (text) {
                    element.textContent = text;
                }
            });
            
            // Actualizar placeholders si los hay
            const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
            inputs.forEach(input => {
                const placeholder = input.getAttribute(`data-placeholder-${currentLang}`);
                if (placeholder) {
                    input.placeholder = placeholder;
                }
            });
        }

        // Registro de plugins GSAP
        gsap.registerPlugin(ScrollTrigger);

        // Animación del logo en splash screen
        window.addEventListener('load', () => {
            const logoPaths = document.querySelectorAll('.logo-path');
            const logoText = document.querySelector('.logo-text');
            const splashScreen = document.getElementById('splashScreen');
            
            // Animar cada path del logo
            logoPaths.forEach((path, index) => {
                gsap.to(path, {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    delay: index * 0.2,
                    ease: "power2.inOut"
                });
            });
            
            // Animar texto del logo
            gsap.to(logoText, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 2,
                ease: "power2.out"
            });
            
            // Ocultar splash screen
            setTimeout(() => {
                splashScreen.classList.add('hide');
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                }, 1000);
            }, 4000);
        });

        // Event listener para cambio de idioma
        document.getElementById('languageToggle').addEventListener('click', toggleLanguage);

        // Cursor personalizado
        const cursor = document.querySelector('.custom-cursor');
        let trails = [];
        
        // Crear estelas del cursor
        for (let i = 0; i < 10; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            trails.push(trail);
        }

        let mouseX = 0, mouseY = 0;
        let trailX = [], trailY = [];

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            gsap.to(cursor, {
                x: mouseX - 10,
                y: mouseY - 10,
                duration: 0.1
            });
        });

        // Animación de estelas
        function animateTrails() {
            trailX.unshift(mouseX);
            trailY.unshift(mouseY);
            
            if (trailX.length > trails.length) {
                trailX.pop();
                trailY.pop();
            }

            trails.forEach((trail, index) => {
                if (trailX[index] !== undefined) {
                    gsap.to(trail, {
                        x: trailX[index] - 2,
                        y: trailY[index] - 2,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            requestAnimationFrame(animateTrails);
        }
        animateTrails();

        // Scroll suave para la flecha
        document.querySelector('.scroll-arrow').addEventListener('click', () => {
            gsap.to(window, {duration: 1.5, scrollTo: ".proyectos", ease: "power2.inOut"});
        });

        // Animaciones de scroll
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
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Animación de proyectos en timeline
        gsap.utils.toArray('.proyecto').forEach((proyecto, index) => {
            gsap.fromTo(proyecto,
                { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: proyecto,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Interacción con las fases
        document.querySelectorAll('.fase').forEach(fase => {
            fase.addEventListener('mouseenter', () => {
                gsap.to(fase, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            fase.addEventListener('mouseleave', () => {
                gsap.to(fase, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Interacción con la huella
        const huella = document.querySelector('.huella');
        const frases = document.querySelectorAll('.frase');
        let fraseActual = 0;

        huella.addEventListener('mouseenter', () => {
            // Ocultar frase actual si existe
            if (frases[fraseActual]) {
                frases[fraseActual].classList.remove('activa');
            }
            
            // Mostrar siguiente frase
            fraseActual = (fraseActual + 1) % frases.length;
            frases[fraseActual].classList.add('activa');
        });

        // Animación del formulario
        document.querySelector('.formulario').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = document.querySelector('.btn-enviar');
            const originalText = btn.textContent;
            
            btn.textContent = translations[currentLang]['btn-sending'];
            btn.disabled = true;
            
            // Simular envío
            setTimeout(() => {
                btn.textContent = translations[currentLang]['btn-sent'];
                
                // Animación de semilla creciendo
                const semilla = document.createElement('div');
                semilla.innerHTML = '🌱';
                semilla.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    font-size: 2rem;
                    z-index: 10000;
                    pointer-events: none;
                `;
                document.body.appendChild(semilla);
                
                gsap.fromTo(semilla, 
                    { scale: 0, y: 0 },
                    { 
                        scale: 3, 
                        y: -100, 
                        duration: 2,
                        ease: "power2.out",
                        onComplete: () => semilla.remove()
                    }
                );
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    document.querySelector('.formulario').reset();
                }, 3000);
            }, 2000);
        });

        // Cambios de cursor según sección
        const secciones = [
            { selector: '.umbral', cursor: '✨' },
            { selector: '.proyectos', cursor: '🎨' },
            { selector: '.fases', cursor: '⚡' },
            { selector: '.servicios', cursor: '💫' },
            { selector: '.sobre-mi', cursor: '👋' },
            { selector: '.contacto', cursor: '📧' }
        ];

        secciones.forEach(seccion => {
            ScrollTrigger.create({
                trigger: seccion.selector,
                start: "top center",
                end: "bottom center",
                onEnter: () => cursor.innerHTML = seccion.cursor,
                onEnterBack: () => cursor.innerHTML = seccion.cursor
            });
        });

        // Efecto parallax sutil en el fondo
        gsap.to('.umbral::before', {
            y: '-20%',
            ease: "none",
            scrollTrigger: {
                trigger: '.umbral',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Responsividad mejorada para dispositivos móviles
        function updateResponsiveElements() {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Ajustar animaciones para móvil
                ScrollTrigger.batch('.fade-in', {
                    onEnter: elements => gsap.fromTo(elements, 
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
                    )
                });
            }
        }

        window.addEventListener('resize', updateResponsiveElements);
        updateResponsiveElements();

        // Optimización de rendimiento para dispositivos móviles
        if (window.innerWidth <= 768) {
            // Reducir la cantidad de trails del cursor en móvil
            trails = trails.slice(0, 5);
            
            // Simplificar algunas animaciones
            gsap.set('.cursor-trail', { display: 'none' });
        }

        // Accesibilidad mejorada
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                cursor.style.display = 'none';
            }
        });

        document.addEventListener('mousemove', () => {
            cursor.style.display = 'block';
        });

        // Preload de recursos para mejor rendimiento
        const preloadImages = () => {
            const imageUrls = [
                // Aquí podrías agregar URLs de imágenes si las tuvieras
            ];
            
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        };

        preloadImages();
 
// === ANIMACIONES PARA SECCIÓN PLANTILLAS ===

// Animación de entrada para tarjetas de plantillas
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

// Efecto hover mejorado con partículas
document.querySelectorAll('.plantilla-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        gsap.to(card, {
            duration: 0.3,
            ease: "power2.out"
        });

        // Crear efecto de partículas al hover
        const rect = card.getBoundingClientRect();
        createPlantillaParticles(e.clientX, e.clientY);
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Función para crear partículas de esmeralda
function createPlantillaParticles(x, y) {
    const particleCount = 5;
    
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

// Animación de números de precios (contador)
const observerPrecios = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            
            const priceText = entry.target.textContent;
            const priceNumber = parseInt(priceText.replace('$', ''));
            
            gsap.fromTo(entry.target, 
                { textContent: 0 },
                {
                    textContent: priceNumber,
                    duration: 1,
                    snap: { textContent: 1 },
                    ease: "power2.out",
                    onUpdate: function() {
                        entry.target.textContent = '$' + Math.round(this.targets()[0].textContent);
                    }
                }
            );
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.plantilla-precio').forEach(precio => {
    observerPrecios.observe(precio);
});

// Animación de features con delay
gsap.utils.toArray('.feature').forEach((feature, index) => {
    gsap.fromTo(feature,
        { 
            opacity: 0,
            scale: 0.8,
            y: 10
        },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: "back.out",
            scrollTrigger: {
                trigger: feature.closest('.plantilla-card'),
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
});

// Pulsación sutil de íconos de plantilla
gsap.utils.toArray('.plantilla-icono').forEach(icono => {
    gsap.to(icono, {
        duration: 2,
        scale: 1.1,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        scrollTrigger: {
            trigger: icono.closest('.plantilla-card'),
            start: "top 80%",
            onEnter: () => {
                gsap.to(icono, {
                    duration: 2,
                    scale: 1.1,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            }
        }
    });
});

// Efecto de destello en bordes de tarjetas
document.querySelectorAll('.plantilla-card').forEach(card => {
    const preview = card.querySelector('.plantilla-preview');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const moveX = (x - rect.width / 2) * 0.02;
        const moveY = (y - rect.height / 2) * 0.02;
        
        gsap.to(card, {
            rotateX: moveY,
            rotateY: moveX,
            duration: 0.3,
            transformOrigin: "center center",
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    });
});

// Efecto ripple al hacer click
document.querySelectorAll('.plantilla-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const rect = card.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(26, 188, 156, 0.6);
            transform: scale(0);
            pointer-events: none;
        `;
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        card.appendChild(ripple);
        
        gsap.to(ripple, {
            scale: 1,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => ripple.remove()
        });
    });
});

console.log('✨ Animaciones de Plantillas cargadas correctamente');


// === MENÚ EXPANDIBLE - NAVEGACIÓN MEJORADA ===

const menuBoton = document.getElementById('menuBoton');
const menuExpandible = document.getElementById('menuExpandible');
const menuCerrar = document.getElementById('menuCerrar');
const menuItems = document.querySelectorAll('.menu-item');

// Abrir menú
menuBoton.addEventListener('click', () => {
    menuExpandible.classList.add('activo');
    menuBoton.classList.add('activo');
    document.body.style.overflow = 'hidden';
});

// Cerrar menú con botón X
menuCerrar.addEventListener('click', cerrarMenu);

// Cerrar menú al hacer click en un item
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Obtener el selector de la sección
        const targetClass = item.getAttribute('data-scroll');
        const target = document.querySelector(targetClass);
        
        // Cerrar menú primero
        cerrarMenu();
        
        // Luego hacer scroll a la sección
        if (target) {
            setTimeout(() => {
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: target,
                        offsetY: 60
                    },
                    ease: "power2.inOut"
                });
            }, 300); // Esperar a que cierre el menú
        }
    });
});

// Función para cerrar menú
function cerrarMenu() {
    menuExpandible.classList.remove('activo');
    menuBoton.classList.remove('activo');
    document.body.style.overflow = 'auto';
}

// Cerrar menú al presionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuExpandible.classList.contains('activo')) {
        cerrarMenu();
    }
});

// Cerrar menú al hacer click fuera del menú
document.addEventListener('click', (e) => {
    if (menuExpandible.classList.contains('activo') && 
        !menuExpandible.contains(e.target) && 
        !menuBoton.contains(e.target)) {
        cerrarMenu();
    }
});

// Animación del botón al hacer hover
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

// Efecto de onda al hacer hover en items
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1.1,
            ease: "back.out"
        });
    });

    item.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1,
            ease: "back.out"
        });
    });
});

console.log('✨ Menú expandible con navegación correcta - Séptima Pacha Co.');
