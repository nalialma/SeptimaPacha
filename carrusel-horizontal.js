// ========== CARRUSEL HORIZONTAL ==========
// Script para animaciones de carrusel horizontal en secciones de proyectos y plantillas

const setupCarousel = () => {
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dots = carousel.querySelectorAll('.carousel-dot');

        if (!container || items.length === 0) return;

        let currentIndex = 0;
        const itemWidth = 100 / items.length;

        // Función para actualizar posición
        const updateCarousel = (index) => {
            currentIndex = (index + items.length) % items.length;
            
            gsap.to(container, {
                x: -(currentIndex * 100) + '%',
                duration: 0.6,
                ease: 'power2.inOut'
            });

            // Actualizar dots
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                    gsap.to(dot, { scale: 1.2, duration: 0.3 });
                } else {
                    dot.classList.remove('active');
                    gsap.to(dot, { scale: 1, duration: 0.3 });
                }
            });

            // Animar items
            items.forEach((item, i) => {
                if (i === currentIndex) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(item, {
                        opacity: 0.5,
                        scale: 0.95,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        };

        // Event listeners para botones
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateCarousel(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateCarousel(currentIndex + 1);
            });
        }

        // Event listeners para dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateCarousel(index);
            });
        });

        // Auto-play (opcional)
        const autoplay = carousel.getAttribute('data-autoplay');
        if (autoplay === 'true') {
            setInterval(() => {
                updateCarousel(currentIndex + 1);
            }, 5000);
        }

        // Inicializar
        updateCarousel(0);
    });

    console.log('✅ Carouseles configurados correctamente');
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCarousel);
} else {
    setupCarousel();
}

// ========== PESTAÑAS / TABS ==========

const setupTabs = () => {
    const tabGroups = document.querySelectorAll('[data-tabs]');

    tabGroups.forEach(group => {
        const buttons = group.querySelectorAll('[data-tab-button]');
        const contents = group.querySelectorAll('[data-tab-content]');

        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remover active de todos
                buttons.forEach(btn => {
                    btn.classList.remove('active');
                    gsap.to(btn, { opacity: 0.6, duration: 0.2 });
                });

                contents.forEach(content => {
                    gsap.to(content, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            content.classList.remove('active');
                        }
                    });
                });

                // Activar seleccionado
                button.classList.add('active');
                gsap.to(button, { opacity: 1, duration: 0.2 });

                const tabId = button.getAttribute('data-tab-button');
                const selectedContent = group.querySelector(`[data-tab-content="${tabId}"]`);

                if (selectedContent) {
                    selectedContent.classList.add('active');
                    gsap.fromTo(selectedContent,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            ease: 'power2.out'
                        }
                    );
                }
            });
        });

        // Activar primer tab por defecto
        if (buttons.length > 0) {
            buttons[0].click();
        }
    });

    console.log('✅ Sistema de pestañas configurado');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTabs);
} else {
    setupTabs();
}

// ========== MODAL / LIGHTBOX ==========

const setupLightbox = () => {
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');

    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();

            const content = trigger.getAttribute('data-lightbox');
            const modal = document.createElement('div');
            modal.className = 'lightbox-modal';
            modal.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close">✕</button>
                    <div class="lightbox-body">
                        ${content}
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Animación de entrada
            gsap.fromTo(modal.querySelector('.lightbox-overlay'),
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );

            gsap.fromTo(modal.querySelector('.lightbox-content'),
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: 'back.out' }
            );

            // Cerrar modal
            const closeBtn = modal.querySelector('.lightbox-close');
            const overlay = modal.querySelector('.lightbox-overlay');

            const closeModal = () => {
                gsap.to(modal.querySelector('.lightbox-overlay'), {
                    opacity: 0,
                    duration: 0.2
                });

                gsap.to(modal.querySelector('.lightbox-content'), {
                    y: 50,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'back.in',
                    onComplete: () => {
                        modal.remove();
                    }
                });
            };

            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);

            // Cerrar con ESC
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEsc);
                }
            };

            document.addEventListener('keydown', handleEsc);
        });
    });

    console.log('✅ Sistema de lightbox configurado');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLightbox);
} else {
    setupLightbox();
}

// ========== CONTADOR / COUNTER ==========

const setupCounters = () => {
    const counters = document.querySelectorAll('[data-counter]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = parseFloat(counter.getAttribute('data-duration') || '2');

        ScrollTrigger.create({
            trigger: counter,
            onEnter: () => {
                let current = 0;

                gsap.to({ value: current }, {
                    value: target,
                    duration: duration,
                    ease: 'power2.out',
                    onUpdate: function() {
                        counter.textContent = Math.ceil(this.targets()[0].value);
                    }
                });
            },
            once: true
        });
    });

    console.log('✅ Sistema de contadores configurado');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCounters);
} else {
    setupCounters();
}

// ========== HOVER EFFECTS ==========

const setupHoverEffects = () => {
    const hoverElements = document.querySelectorAll('[data-hover-effect]');

    hoverElements.forEach(element => {
        const effect = element.getAttribute('data-hover-effect');

        element.addEventListener('mouseenter', () => {
            switch(effect) {
                case 'scale':
                    gsap.to(element, { scale: 1.05, duration: 0.3, ease: 'back.out' });
                    break;
                case 'lift':
                    gsap.to(element, { y: -10, duration: 0.3, ease: 'back.out' });
                    break;
                case 'rotate':
                    gsap.to(element, { rotation: 5, duration: 0.3 });
                    break;
                case 'glow':
                    gsap.to(element, { 
                        boxShadow: `0 0 30px rgba(243, 156, 18, 0.6)`,
                        duration: 0.3 
                    });
                    break;
            }
        });

        element.addEventListener('mouseleave', () => {
            switch(effect) {
                case 'scale':
                    gsap.to(element, { scale: 1, duration: 0.3, ease: 'back.out' });
                    break;
                case 'lift':
                    gsap.to(element, { y: 0, duration: 0.3, ease: 'back.out' });
                    break;
                case 'rotate':
                    gsap.to(element, { rotation: 0, duration: 0.3 });
                    break;
                case 'glow':
                    gsap.to(element, { 
                        boxShadow: `0 0 0px rgba(243, 156, 18, 0)`,
                        duration: 0.3 
                    });
                    break;
            }
        });
    });

    console.log('✅ Efectos hover configurados');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHoverEffects);
} else {
    setupHoverEffects();
}

// ========== LAZY LOADING ==========

const setupLazyLoading = () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => observer.observe(img));
    }

    console.log('✅ Lazy loading configurado');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLazyLoading);
} else {
    setupLazyLoading();
}

console.log('%c✨ Carrusel Horizontal - Scripts Cargados ✨', 'font-size: 14px; color: #F39C12; font-weight: bold;');
console.log('✅ Todos los scripts adicionales están activos');
