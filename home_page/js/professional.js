// Professional Interactive JavaScript for Enhanced User Experience

class NouvilWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupHeaderScroll();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupMicroInteractions();
        this.setupLazyLoading();
        this.setupTypingEffect();
    }

    // Header scroll effects
    setupHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // Scroll animations for elements
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.section-header, .course-card, .category-card, .track-card, .step-card, .quiz-category').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Parallax effects for hero section
    setupParallaxEffects() {
        const heroBackground = document.querySelector('.hero-background');
        const heroContent = document.querySelector('.hero-content');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;

            if (heroBackground && parallax > 0) {
                heroBackground.style.transform = `translateY(${parallax}px)`;
            }
            
            if (heroContent && scrolled < window.innerHeight) {
                const opacity = 1 - (scrolled / window.innerHeight) * 0.5;
                heroContent.style.opacity = opacity;
            }
        });
    }

    // Micro-interactions for buttons and links
    setupMicroInteractions() {
        // Button ripple effects
        document.querySelectorAll('.btn, .enroll-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                this.createRipple(e, this);
            });
        });

        // Course card tilt effect
        document.querySelectorAll('.course-card, .category-card').forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleCardTilt(e, card));
            card.addEventListener('mouseleave', () => this.resetCardTilt(card));
        });
    }

    // Create ripple effect
    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // 3D card tilt effect
    handleCardTilt(event, card) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }

    resetCardTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }

    // Lazy loading for images
    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Professional typing effect for hero title
    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect when page loads
        setTimeout(typeWriter, 1000);
    }

    // Smooth scroll for anchor links
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    img.loaded {
        animation: imageFadeIn 0.6s ease-out;
    }

    @keyframes imageFadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NouvilWebsite();
});