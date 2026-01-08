/**
 * Main JavaScript File
 * AquaSafe Industries Website
 */

(function() {
    'use strict';

    // ==================== DOM ELEMENTS ====================
    const navbar = document.getElementById('mainNavbar');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contact-form');
    const testimonialSlider = document.getElementById('testimonials-slider');

    // ==================== GSAP INITIALIZATION ====================
    gsap.registerPlugin(ScrollTrigger);

    // ==================== NAVBAR SCROLL EFFECT ====================
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // ==================== BACK TO TOP BUTTON ====================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // ==================== ACTIVE NAV LINK ON SCROLL ====================
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(currentSection) && currentSection !== '') {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // ==================== COUNTER ANIMATION ====================
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Trigger counter animation on scroll - works for counter-section and stat-cards
    const counterSection = document.querySelector('.counter-section, .project-stats, .stat-card');
    if (counterSection) {
        ScrollTrigger.create({
            trigger: counterSection,
            start: 'top 80%',
            once: true,
            onEnter: animateCounters
        });
    }
    
    // Also animate counters with .counter class (projects page stats)
    const statsCounters = document.querySelectorAll('.stat-number.counter');
    if (statsCounters.length > 0) {
        statsCounters.forEach(counter => {
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + '+';
                        }
                    };
                    
                    updateCounter();
                }
            });
        });
    }

    // ==================== TESTIMONIALS SLIDER ====================
    class TestimonialsSlider {
        constructor(element) {
            this.slider = element;
            this.track = element.querySelector('.testimonials-track');
            this.items = element.querySelectorAll('.testimonial-item');
            this.prevBtn = element.querySelector('.slider-prev');
            this.nextBtn = element.querySelector('.slider-next');
            this.dotsContainer = element.querySelector('.slider-dots');
            
            this.currentIndex = 0;
            this.totalItems = this.items.length;
            this.autoplayInterval = null;
            
            this.init();
        }
        
        init() {
            // Create dots
            this.createDots();
            
            // Event listeners
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }
            
            // Autoplay
            this.startAutoplay();
            
            // Pause on hover
            this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
            this.slider.addEventListener('mouseleave', () => this.startAutoplay());
            
            // Touch support
            this.addTouchSupport();
        }
        
        createDots() {
            for (let i = 0; i < this.totalItems; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goTo(i));
                this.dotsContainer.appendChild(dot);
            }
            this.dots = this.dotsContainer.querySelectorAll('.slider-dot');
        }
        
        updateDots() {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
        
        goTo(index) {
            this.currentIndex = index;
            this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
            this.updateDots();
        }
        
        next() {
            this.currentIndex = (this.currentIndex + 1) % this.totalItems;
            this.goTo(this.currentIndex);
        }
        
        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
            this.goTo(this.currentIndex);
        }
        
        startAutoplay() {
            this.autoplayInterval = setInterval(() => this.next(), 5000);
        }
        
        stopAutoplay() {
            clearInterval(this.autoplayInterval);
        }
        
        addTouchSupport() {
            let startX = 0;
            let endX = 0;
            
            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            }, { passive: true });
            
            this.track.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            }, { passive: true });
        }
    }

    // Initialize testimonials slider
    if (testimonialSlider) {
        new TestimonialsSlider(testimonialSlider);
    }

    // ==================== GSAP SCROLL ANIMATIONS ====================
    function initScrollAnimations() {
        // Hero section animations
        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.2
        });
        
        gsap.from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.4
        });
        
        gsap.from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.6
        });
        
        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.8
        });

        // Section titles animation
        gsap.utils.toArray('.section-subtitle, .section-title, .section-description').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8
            });
        });

        // Service cards animation
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.6,
                delay: index * 0.1
            });
        });

        // About section animation
        gsap.from('.about-image-wrapper', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -50,
            duration: 1
        });

        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: 50,
            duration: 1
        });

        // Project cards animation
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: 0.6,
                delay: (index % 3) * 0.1
            });
        });

        // Counter section animation
        gsap.utils.toArray('.counter-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: index * 0.1
            });
        });

        // Contact info animation
        gsap.utils.toArray('.contact-info-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: -30,
                duration: 0.6,
                delay: index * 0.1
            });
        });

        // Contact form animation
        gsap.from('.contact-form-wrapper', {
            scrollTrigger: {
                trigger: '.contact-form-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8
        });

        // Footer animation
        gsap.utils.toArray('.footer-widget').forEach((widget, index) => {
            gsap.from(widget, {
                scrollTrigger: {
                    trigger: widget,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: index * 0.1
            });
        });
    }

    // ==================== HERO PARTICLES EFFECT ====================
    function createParticles() {
        const container = document.getElementById('hero-particles');
        if (!container) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(244, 121, 32, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
            `;
            container.appendChild(particle);
            
            // Animate particle
            gsap.to(particle, {
                y: -100 - Math.random() * 200,
                x: (Math.random() - 0.5) * 100,
                opacity: 0,
                duration: 3 + Math.random() * 4,
                repeat: -1,
                delay: Math.random() * 3,
                ease: 'none'
            });
        }
    }

    // ==================== CONTACT FORM HANDLING ====================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const formMessage = document.getElementById('form-message');
            
            // Show loading state
            btnText.classList.add('d-none');
            btnLoading.classList.remove('d-none');
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Reset button state
                btnText.classList.remove('d-none');
                btnLoading.classList.add('d-none');
                submitBtn.disabled = false;
                
                // Show success message
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 2000);
        });
    }

    // ==================== NAVBAR DROPDOWN HOVER (DESKTOP) ====================
    function initDropdownHover() {
        if (window.innerWidth >= 992) {
            const dropdowns = document.querySelectorAll('.nav-item.dropdown');
            
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', function() {
                    const menu = this.querySelector('.dropdown-menu');
                    menu.classList.add('show');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    const menu = this.querySelector('.dropdown-menu');
                    menu.classList.remove('show');
                });
            });
        }
    }

    // ==================== PRODUCT/PROJECT FILTER ====================
    function initProductFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productItems = document.querySelectorAll('.product-item, .project-item');
        
        if (filterBtns.length === 0 || productItems.length === 0) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                productItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        // Show item with animation
                        item.style.display = 'block';
                        gsap.fromTo(item, 
                            { opacity: 0, scale: 0.8, y: 20 },
                            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' }
                        );
                    } else {
                        // Hide item
                        gsap.to(item, {
                            opacity: 0,
                            scale: 0.8,
                            y: 20,
                            duration: 0.3,
                            ease: 'power2.in',
                            onComplete: () => {
                                item.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }

    // ==================== INITIALIZATION ====================
    function init() {
        createParticles();
        initScrollAnimations();
        initDropdownHover();
        initProductFilter();
        handleNavbarScroll();
        handleBackToTop();
        setActiveNavLink();
    }

    // Initialize on loader complete or DOM ready
    window.addEventListener('loaderComplete', init);
    
    // Fallback initialization
    if (document.readyState === 'complete') {
        setTimeout(init, 100);
    }

    // Re-initialize dropdown hover on resize
    window.addEventListener('resize', initDropdownHover);

})();
