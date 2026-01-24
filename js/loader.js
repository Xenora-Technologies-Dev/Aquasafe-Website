/**
 * Page Loader & Transition Script
 * Optimized for production - prevents flicker and ensures stable loading
 */

(function() {
    'use strict';
    
    // Cache DOM elements
    const loader = document.getElementById('page-loader');
    const progressBar = document.querySelector('.loader-progress-bar');
    const loaderText = document.querySelector('.loader-text');
    
    // State management
    let isHiding = false;
    let progress = 0;
    let progressInterval = null;
    let textInterval = null;
    
    // Ensure body has loading class immediately
    document.body.classList.add('loading');
    
    // Loading text animation
    const loadingTexts = ['LOADING', 'INITIALIZING', 'ALMOST READY'];
    let textIndex = 0;
    
    textInterval = setInterval(() => {
        if (loaderText && !isHiding) {
            textIndex = (textIndex + 1) % loadingTexts.length;
            loaderText.textContent = loadingTexts[textIndex];
        }
    }, 800);
    
    // Smooth progress animation
    progressInterval = setInterval(() => {
        if (progress < 85 && !isHiding) {
            const increment = Math.max(1, (85 - progress) / 10);
            progress += increment;
            if (progressBar) {
                progressBar.style.width = Math.min(progress, 85) + '%';
            }
        }
    }, 80);
    
    /**
     * Hide the loader and show page content
     */
    function hideLoader() {
        if (isHiding) return;
        isHiding = true;
        
        // Clear intervals
        clearInterval(progressInterval);
        clearInterval(textInterval);
        
        // Complete progress bar
        if (progressBar) {
            progressBar.style.transition = 'width 0.3s ease-out';
            progressBar.style.width = '100%';
        }
        
        if (loaderText) {
            loaderText.textContent = 'WELCOME';
        }
        
        // Hide loader after brief pause
        setTimeout(() => {
            if (loader) {
                loader.classList.add('fade-out');
                
                // After fade animation completes
                setTimeout(() => {
                    loader.style.display = 'none';
                    loader.classList.add('hidden');
                    
                    // Remove loading class and show content
                    document.body.classList.remove('loading');
                    document.body.style.overflow = '';
                    
                    // Dispatch event for main.js
                    window.dispatchEvent(new CustomEvent('loaderComplete'));
                    
                    // Force repaint
                    void document.body.offsetHeight;
                }, 400);
            }
        }, 400);
    }
    
    // Primary trigger: window.load
    window.addEventListener('load', function() {
        // Small delay to ensure styles are applied
        setTimeout(hideLoader, 100);
    });
    
    // Secondary trigger: DOMContentLoaded (with delay)
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            if (!isHiding && document.body.classList.contains('loading')) {
                hideLoader();
            }
        }, 1500);
    });
    
    // Failsafe: maximum loading time
    setTimeout(() => {
        if (!isHiding) {
            console.warn('Loader failsafe triggered');
            hideLoader();
        }
    }, 5000);
    
    // Page transitions for internal navigation
    document.addEventListener('DOMContentLoaded', function() {
        const internalLinks = document.querySelectorAll('a[href$=".html"]:not([target="_blank"])');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const currentPage = window.location.pathname.split('/').pop();
                
                // Skip if same page or external
                if (href === currentPage || href.startsWith('http') || href.startsWith('//')) {
                    return;
                }
                
                e.preventDefault();
                
                // Show loader for page transition
                if (loader) {
                    isHiding = false;
                    loader.style.display = 'flex';
                    loader.classList.remove('fade-out', 'hidden');
                    loader.style.opacity = '1';
                    loader.style.visibility = 'visible';
                    
                    if (progressBar) {
                        progressBar.style.transition = 'none';
                        progressBar.style.width = '0%';
                    }
                    if (loaderText) {
                        loaderText.textContent = 'LOADING';
                    }
                }
                
                document.body.classList.add('loading');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            });
        });
    });
})();
