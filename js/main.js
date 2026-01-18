/**
 * Main JavaScript File
 * AquaSafe Industries Website
 * Enhanced with modern animations and performance optimizations
 */

(function() {
    'use strict';

    // ==================== PERFORMANCE UTILITIES ====================
    // Debounce function for scroll/resize events
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for high-frequency events
    function throttle(func, limit = 100) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ==================== DOM ELEMENTS ====================
    const navbar = document.getElementById('mainNavbar');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contact-form');
    const testimonialSlider = document.getElementById('testimonials-slider');

    // ==================== MOBILE DROPDOWN FIX ====================
    function initMobileDropdown() {
        // Only initialize on mobile devices
        if (window.innerWidth < 992) {
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            const dropdownMenu = document.querySelector('.dropdown-menu');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (dropdownToggle && dropdownMenu) {
                // Remove existing event listeners to prevent conflicts
                const newDropdownToggle = dropdownToggle.cloneNode(true);
                dropdownToggle.parentNode.replaceChild(newDropdownToggle, dropdownToggle);
                
                newDropdownToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle dropdown
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !isExpanded);
                    
                    if (!isExpanded) {
                        dropdownMenu.classList.add('show');
                        this.classList.add('show');
                    } else {
                        dropdownMenu.classList.remove('show');
                        this.classList.remove('show');
                    }
                });
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function(e) {
                    if (!newDropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                        dropdownMenu.classList.remove('show');
                        newDropdownToggle.classList.remove('show');
                        newDropdownToggle.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Close dropdown when clicking on menu items
                const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
                dropdownItems.forEach(item => {
                    item.addEventListener('click', function() {
                        dropdownMenu.classList.remove('show');
                        newDropdownToggle.classList.remove('show');
                        newDropdownToggle.setAttribute('aria-expanded', 'false');
                        
                        // Also close the main navbar
                        if (navbarCollapse) {
                            navbarCollapse.classList.remove('show');
                            const toggler = document.querySelector('.navbar-toggler');
                            if (toggler) {
                                toggler.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });
                });
            }
        }
    }

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
        // Only initialize on desktop devices
        if (window.innerWidth >= 992) {
            const dropdowns = document.querySelectorAll('.nav-item.dropdown');
            
            dropdowns.forEach(dropdown => {
                const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                
                // Disable Bootstrap dropdown on desktop for hover effect
                if (dropdownToggle) {
                    dropdownToggle.removeAttribute('data-bs-toggle');
                    dropdownToggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        // Still allow navigation to products.html if clicked
                        if (this.getAttribute('href')) {
                            window.location.href = this.getAttribute('href');
                        }
                    });
                }
                
                dropdown.addEventListener('mouseenter', function() {
                    if (dropdownMenu) {
                        dropdownMenu.classList.add('show');
                    }
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    if (dropdownMenu) {
                        dropdownMenu.classList.remove('show');
                    }
                });
            });
        } else {
            // Re-enable Bootstrap dropdown on mobile
            const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            dropdownToggles.forEach(toggle => {
                toggle.setAttribute('data-bs-toggle', 'dropdown');
            });
        }
    }

    // ==================== MOBILE NESTED DROPDOWN ====================
    function initMobileNestedDropdown() {
        if (window.innerWidth < 992) {
            const nestedDropdowns = document.querySelectorAll('.dropdown-menu .dropdown-submenu-item');
            
            nestedDropdowns.forEach(submenuItem => {
                const nestedMenu = submenuItem.nextElementSibling;
                
                if (nestedMenu && nestedMenu.classList.contains('dropdown-menu')) {
                    // Always set expanded state and show menu by default on mobile
                    submenuItem.setAttribute('aria-expanded', 'true');
                    nestedMenu.style.display = 'block';
                    
                    // Allow clicking to navigate directly
                    submenuItem.addEventListener('click', function(e) {
                        // Menu items are always expanded on mobile - allow direct navigation
                    });
                }
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

    // ==================== MODERN REVEAL ANIMATIONS ====================
    function initRevealAnimations() {
        // Select all elements with reveal classes
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        
        if (revealElements.length === 0) return;
        
        // Create Intersection Observer for reveal animations
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optionally unobserve after revealing (for one-time animation)
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all reveal elements
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ==================== SCROLL PROGRESS INDICATOR ====================
    function initScrollProgress() {
        // Create scroll progress element if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.prepend(progressBar);
        }
        
        // Update progress on scroll (throttled for performance)
        const updateProgress = throttle(() => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }, 16); // ~60fps
        
        window.addEventListener('scroll', updateProgress, { passive: true });
    }

    // ==================== BUTTON RIPPLE EFFECT ====================
    function initButtonRipple() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Don't create ripple if button has disabled state
                if (this.disabled) return;
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Create ripple element
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ==================== SMOOTH SCROLL ANCHOR LINKS (Enhanced) ====================
    function initSmoothScroll() {
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
    }

    // ==================== LAZY LOADING FOR IMAGES ====================
    function initLazyLoading() {
        // Check for native lazy loading support
        if ('loading' in HTMLImageElement.prototype) {
            // Use native lazy loading
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.loading = 'lazy';
            });
        } else {
            // Fallback with Intersection Observer
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '50px 0px' });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ==================== INITIALIZATION ====================
    function init() {
        createParticles();
        initScrollAnimations();
        initDropdownHover();
        initMobileDropdown();
        initMobileNestedDropdown();
        initProductFilter();
        initRevealAnimations();      // New: Reveal animations
        initScrollProgress();         // New: Scroll progress bar
        initButtonRipple();           // New: Button ripple effect
        initSmoothScroll();           // New: Enhanced smooth scroll
        initLazyLoading();            // New: Lazy loading
        handleNavbarScroll();
        handleBackToTop();
        setCurrentPageActive();
        
        // Ensure content is visible
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        
        console.log('Aquasafe website initialized successfully');
    }
    
    // ==================== SET ACTIVE NAV BASED ON CURRENT PAGE ====================
    function setCurrentPageActive() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Check if this link matches the current page
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
            
            // Add click handler to close mobile menu
            link.addEventListener('click', function() {
                // Close mobile navbar when a link is clicked
                const navbarCollapse = document.querySelector('.navbar-collapse');
                const toggler = document.querySelector('.navbar-toggler');
                
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                    if (toggler) {
                        toggler.setAttribute('aria-expanded', 'false');
                        toggler.classList.add('collapsed');
                    }
                }
            });
        });
    }

    // Initialize on loader complete or DOM ready
    window.addEventListener('loaderComplete', init);
    
    // Fallback initialization
    if (document.readyState === 'complete') {
        setTimeout(init, 100);
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

    // Re-initialize dropdowns on resize
    window.addEventListener('resize', function() {
        // Debounce resize events
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(() => {
            initDropdownHover();
            initMobileDropdown();
            initMobileNestedDropdown();
        }, 250);
    });

})();
