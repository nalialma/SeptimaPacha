// ==========================================
// CARRUSEL HORIZONTAL REAL - JAVASCRIPT
// ========================================== 

class CarruselHorizontal {
    constructor(carruselId, prevBtnId, nextBtnId, indicatorsContainerId) {
        this.carrusel = document.getElementById(carruselId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        this.indicatorsContainer = document.getElementById(indicatorsContainerId);
        
        if (!this.carrusel || !this.prevBtn || !this.nextBtn) {
            console.error('❌ No se encontraron los elementos del carrusel');
            return;
        }
        
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.items = this.carrusel.querySelectorAll('.plantilla-card');
        this.totalItems = this.items.length;
        this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
        
        this.init();
    }

    init() {
        console.log(`✨ Carrusel inicializado: ${this.totalItems} items, ${this.itemsPerView} por vista`);
        this.createIndicators();
        this.attachEventListeners();
        this.updateCarrusel();
        window.addEventListener('resize', () => this.handleResize());
        
        // Auto-play opcional (comentado por defecto)
        // this.startAutoPlay();
    }

    getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }

    createIndicators() {
        if (!this.indicatorsContainer) return;
        
        const totalSlides = Math.ceil(this.totalItems / this.itemsPerView);
        this.indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carrusel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }

    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Soporte para teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Soporte para toque (swipe)
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carrusel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        });
        
        this.carrusel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }

    updateCarrusel() {
        // Calcular el desplazamiento en píxeles
        const itemWidth = this.carrusel.parentElement.offsetWidth / this.itemsPerView;
        const offset = -this.currentIndex * itemWidth;
        
        // Aplicar transformación
        this.carrusel.style.transform = `translateX(${offset}px)`;
        
        // Actualizar indicadores
        if (this.indicatorsContainer) {
            const indicators = this.indicatorsContainer.querySelectorAll('.carrusel-indicator');
            const currentSlide = Math.floor(this.currentIndex / this.itemsPerView);
            
            indicators.forEach((indicator, index) => {
                indicator.classList.remove('active');
                if (index === currentSlide) {
                    indicator.classList.add('active');
                }
            });
        }
        
        console.log(`📍 Posición: ${this.currentIndex}/${this.totalItems}`);
    }

    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop
        }
        this.updateCarrusel();
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.maxIndex; // Loop inverso
        }
        this.updateCarrusel();
    }

    goToSlide(slideIndex) {
        this.currentIndex = slideIndex * this.itemsPerView;
        this.updateCarrusel();
    }

    handleResize() {
        const newItemsPerView = this.getItemsPerView();
        if (newItemsPerView !== this.itemsPerView) {
            this.itemsPerView = newItemsPerView;
            this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
            this.currentIndex = 0;
            this.createIndicators();
            this.updateCarrusel();
            console.log(`🔄 Redimensionado: ${this.itemsPerView} items por vista`);
        }
    }

    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎠 Inicializando carruseles horizontales...');
    
    // Carrusel de ofertas
    const carruselOferta = new CarruselHorizontal(
        'carruselOferta',
        'carruselPrev',
        'carruselNext',
        'carruselIndicators'
    );

    // Carrusel premium
    const carruselPremium = new CarruselHorizontal(
        'carruselPremium',
        'carruselPrevPremium',
        'carruselNextPremium',
        'carruselIndicatorsPremium'
    );

    console.log('✅ Carruseles horizontales listos');

    // Agregar efectos de partículas al hover
    document.querySelectorAll('.plantilla-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            if (typeof createPlantillaParticles === 'function') {
                createPlantillaParticles(e.clientX, e.clientY);
            }
        });
    });
});

// ==========================================
// LAZY LOADING DE IMÁGENES
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.plantilla-imagen[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('🎠 Sistema de carruseles horizontales cargado ✨');
