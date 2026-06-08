/**
 * Page Loader & Transition Script
 * Optimized for production - prevents flicker and ensures stable loading
 */

(function() {
    'use strict';
    
    const loader = document.getElementById('page-loader');
    const progressBar = document.querySelector('.loader-progress-bar');
    const loaderText = document.querySelector('.loader-text');
    
    let isHiding = false;
    let progress = 0;
    let progressInterval = null;
    let textInterval = null;
    
    document.body.classList.add('loading');
    
    const loadingTexts = ['LOADING', 'INITIALIZING', 'ALMOST READY'];
    let textIndex = 0;
    
    textInterval = setInterval(() => {
        if (loaderText && !isHiding) {
            textIndex = (textIndex + 1) % loadingTexts.length;
            loaderText.textContent = loadingTexts[textIndex];
        }
    }, 1200);
    
    let startTime = Date.now();
    const progressDuration = 2000;
    
    function animateProgress() {
        if (progress < 85 && !isHiding) {
            const elapsed = Date.now() - startTime;
            const percentage = Math.min((elapsed / progressDuration) * 85, 85);
            progress = percentage;
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            
            if (progress < 85) {
                progressInterval = requestAnimationFrame(animateProgress);
            }
        }
    }
    
    progressInterval = requestAnimationFrame(animateProgress);
    
    function clearProgressAnimation() {
        if (progressInterval !== null) {
            cancelAnimationFrame(progressInterval);
            progressInterval = null;
        }
        clearInterval(textInterval);
    }
    
    /**
     * Immediately hide loader and restore page (used on back/forward navigation)
     */
    function forceHideLoader() {
        isHiding = true;
        clearProgressAnimation();
        
        if (loader) {
            loader.style.display = 'none';
            loader.classList.add('fade-out', 'hidden');
            loader.style.opacity = '';
            loader.style.visibility = '';
        }
        
        document.body.classList.remove('loading');
        document.body.style.overflow = '';
    }
    
    /**
     * Hide the loader with animation after initial page load
     */
    function hideLoader() {
        if (isHiding) return;
        isHiding = true;
        clearProgressAnimation();
        
        if (progressBar) {
            progressBar.style.transition = 'width 0.3s ease-out';
            progressBar.style.width = '100%';
        }
        
        if (loaderText) {
            loaderText.textContent = 'WELCOME';
        }
        
        setTimeout(() => {
            if (loader) {
                loader.classList.add('fade-out');
                
                setTimeout(() => {
                    loader.style.display = 'none';
                    loader.classList.add('hidden');
                    document.body.classList.remove('loading');
                    document.body.style.overflow = '';
                    window.dispatchEvent(new CustomEvent('loaderComplete'));
                    void document.body.offsetHeight;
                }, 400);
            }
        }, 400);
    }
    
    window.addEventListener('load', function() {
        setTimeout(hideLoader, 100);
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            if (!isHiding && document.body.classList.contains('loading')) {
                hideLoader();
            }
        }, 1500);
    });
    
    setTimeout(() => {
        if (!isHiding) {
            hideLoader();
        }
    }, 5000);
    
    /* Fix: browser back/forward restores page from bfcache with loader still visible */
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            forceHideLoader();
        }
    });
    
    /* Fix: reset loader state before page enters bfcache (prevents stuck loader on back) */
    window.addEventListener('pagehide', function() {
        if (loader) {
            loader.style.display = 'none';
            loader.classList.add('hidden');
        }
        document.body.classList.remove('loading');
        isHiding = true;
    });
    
    /* Page transitions for internal navigation */
    document.addEventListener('DOMContentLoaded', function() {
        const internalLinks = document.querySelectorAll('a[href$=".html"]:not([target="_blank"])');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                
                if (!href || href === currentPage || href.startsWith('http') || href.startsWith('//')) {
                    return;
                }
                
                e.preventDefault();
                
                if (loader) {
                    isHiding = false;
                    progress = 0;
                    startTime = Date.now();
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
                    
                    progressInterval = requestAnimationFrame(animateProgress);
                }
                
                document.body.classList.add('loading');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            });
        });
    });
})();
