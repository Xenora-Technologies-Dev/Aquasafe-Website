/**
 * Page Loader & Transition Script
 * Premium ThemeForest-style loading animation and page transitions
 */

(function() {
    'use strict';
    
    const loader = document.getElementById('page-loader');
    const progressBar = document.querySelector('.loader-progress-bar');
    const loaderText = document.querySelector('.loader-text');
    
    // Body should already have 'loading' class from HTML
    // This is a fallback to ensure it's set
    if (!document.body.classList.contains('loading')) {
        document.body.classList.add('loading');
    }
    
    // Counter for loading percentage
    let progress = 0;
    let loadingTexts = ['LOADING', 'INITIALIZING', 'ALMOST READY'];
    let textIndex = 0;
    
    // Animate loading text
    const textInterval = setInterval(() => {
        if (loaderText) {
            textIndex = (textIndex + 1) % loadingTexts.length;
            loaderText.textContent = loadingTexts[textIndex];
        }
    }, 800);
    
    // Simulate loading progress with easing
    const progressInterval = setInterval(() => {
        if (progress < 85) {
            // Faster at start, slower as it progresses
            const increment = Math.max(1, (85 - progress) / 10);
            progress += increment;
            if (progressBar) {
                progressBar.style.width = Math.min(progress, 85) + '%';
            }
        }
    }, 80);
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', function() {
        console.log('Page load event fired');
        hideLoader();
    });
    
    // Fallback: hide loader after max time
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            console.log('Fallback timeout triggered');
            hideLoader();
        }
    }, 5000);
    
    // Function to hide loader
    function hideLoader() {
        clearInterval(progressInterval);
        clearInterval(textInterval);
        
        // Complete the progress bar smoothly
        if (progressBar) {
            progressBar.style.transition = 'width 0.4s ease-out';
            progressBar.style.width = '100%';
        }
        
        if (loaderText) {
            loaderText.textContent = 'WELCOME';
        }
        
        // Hide loader after showing WELCOME
        setTimeout(() => {
            if (loader) {
                // Use display:none which cannot be overridden
                loader.style.display = 'none';
                document.body.classList.remove('loading');
                // Reset body background to white for page content
                document.body.style.background = '';
                
                // Force reflow
                void document.body.offsetHeight;
                
                // Trigger entrance animations
                initPageAnimations();
            }
        }, 600);
    }
    
    // Initialize page animations after loader
    function initPageAnimations() {
        // Dispatch custom event for main.js to listen to
        window.dispatchEvent(new CustomEvent('loaderComplete'));
        
        // Animate page content entrance
        const mainContent = document.querySelector('.top-bar');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }
    }
    
    // Page transition for internal links
    document.addEventListener('DOMContentLoaded', function() {
        const internalLinks = document.querySelectorAll('a[href$=".html"]:not([target="_blank"])');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's the current page
                if (href === window.location.pathname.split('/').pop()) {
                    e.preventDefault();
                    return;
                }
                
                // Skip external links
                if (href.startsWith('http') || href.startsWith('//')) {
                    return;
                }
                
                e.preventDefault();
                
                // Show the loader again before navigating
                if (loader) {
                    loader.style.display = 'flex';
                    loader.style.opacity = '1';
                    loader.style.visibility = 'visible';
                    // Reset progress bar
                    if (progressBar) {
                        progressBar.style.transition = 'none';
                        progressBar.style.width = '0%';
                    }
                    if (loaderText) {
                        loaderText.textContent = 'LOADING';
                    }
                }
                
                // Add page transition class
                document.body.classList.add('page-transition-out');
                document.body.classList.add('loading');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    });
})();
