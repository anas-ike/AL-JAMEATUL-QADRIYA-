// AL-JAMEATUL QADRIYA Website JavaScript

class MadrasaWebsite {
    constructor() {
        this.currentPage = 'home';
        this.currentLanguage = 'en';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupGalleryFilters();
        this.setupDonationForm();
        this.setupContactForm();
        this.setupLanguageSelector();
        this.setupMobileMenu();
        this.setupAnimations();
        this.showPage('home');
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link, .footer-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const pageId = href.substring(1);
                    this.showPage(pageId);
                }
            });
        });

        // Donate button in hero
        const donateBtn = document.querySelector('.donate-btn');
        if (donateBtn) {
            donateBtn.addEventListener('click', () => this.showPage('donate'));
        }

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Scroll handler for animations
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    setupNavigation() {
        // Update active nav link
        const updateActiveNav = (pageId) => {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${pageId}`) {
                    link.classList.add('active');
                }
            });
        };

        this.updateActiveNav = updateActiveNav;
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            this.updateActiveNav(pageId);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Update page title
            this.updatePageTitle(pageId);
            
            // Trigger animations for visible elements
            setTimeout(() => {
                this.animateVisibleElements();
            }, 100);
        }
    }

    updatePageTitle(pageId) {
        const titles = {
            home: 'AL-JAMEATUL QADRIYA - Islamic Educational Institution',
            about: 'About Us - AL-JAMEATUL QADRIYA',
            gallery: 'Gallery - AL-JAMEATUL QADRIYA',
            donate: 'Donate - AL-JAMEATUL QADRIYA',
            contact: 'Contact Us - AL-JAMEATUL QADRIYA'
        };
        document.title = titles[pageId] || titles.home;
    }

    setupGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active filter button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                });

                // Animate visible items
                setTimeout(() => {
                    this.animateGalleryItems();
                }, 50);
            });
        });

        // Initialize gallery
        this.animateGalleryItems();
    }

    animateGalleryItems() {
        const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
        visibleItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupDonationForm() {
        const amountButtons = document.querySelectorAll('.amount-btn');
        const amountInput = document.getElementById('donation-amount');
        const donateForm = document.querySelector('.donate-form');

        // Handle amount button clicks
        amountButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                amountButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const amount = btn.getAttribute('data-amount');
                if (amount && amountInput) {
                    amountInput.value = amount;
                } else if (btn.classList.contains('custom-amount')) {
                    amountInput.focus();
                }
            });
        });

        // Handle custom amount input
        if (amountInput) {
            amountInput.addEventListener('input', () => {
                if (amountInput.value) {
                    amountButtons.forEach(b => b.classList.remove('active'));
                    const customBtn = document.querySelector('.custom-amount');
                    if (customBtn) customBtn.classList.add('active');
                }
            });
        }

        // Handle form submission
        if (donateForm) {
            donateForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleDonationSubmission(donateForm);
            });
        }
    }

    handleDonationSubmission(form) {
        const formData = new FormData(form);
        const amount = document.getElementById('donation-amount').value;
        
        if (!amount || amount <= 0) {
            this.showNotification('Please enter a valid donation amount.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.classList.add('loading');

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
            this.showNotification('Thank you for your generous donation! You will be redirected to payment processing.', 'success');
            
            // Reset form after success
            setTimeout(() => {
                form.reset();
                document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
            }, 2000);
        }, 2000);
    }

    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmission(contactForm);
            });
        }
    }

    handleContactSubmission(form) {
        const formData = new FormData(form);
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        // Check required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--color-error)';
            } else {
                field.style.borderColor = '';
            }
        });

        if (!isValid) {
            this.showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
            this.showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form after success
            setTimeout(() => {
                form.reset();
            }, 1000);
        }, 1500);
    }

    setupLanguageSelector() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
                
                // Update active language button
                langButtons.forEach(b => b.classList.remove('btn--primary'));
                btn.classList.add('btn--primary');
            });
        });

        // Initialize with English
        const enBtn = document.querySelector('.lang-btn[data-lang="en"]');
        if (enBtn) enBtn.classList.add('btn--primary');
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        
        // Update document direction for RTL languages
        if (lang === 'ar' || lang === 'ur') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }

        // Show notification about language change
        const langNames = {
            en: 'English',
            ar: 'Arabic (عربي)',
            ur: 'Urdu (اردو)'
        };
        
        this.showNotification(`Language switched to ${langNames[lang]}`, 'info');
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        let isMenuOpen = false;

        if (mobileToggle && nav) {
            mobileToggle.addEventListener('click', () => {
                isMenuOpen = !isMenuOpen;
                
                if (isMenuOpen) {
                    nav.style.display = 'block';
                    nav.style.position = 'absolute';
                    nav.style.top = '100%';
                    nav.style.left = '0';
                    nav.style.right = '0';
                    nav.style.background = 'var(--color-surface)';
                    nav.style.boxShadow = 'var(--shadow-md)';
                    nav.style.borderRadius = '0 0 var(--radius-lg) var(--radius-lg)';
                    nav.style.padding = 'var(--space-16)';
                    nav.style.zIndex = '1001';
                    
                    // Update nav list for mobile
                    const navList = nav.querySelector('.nav-list');
                    if (navList) {
                        navList.style.flexDirection = 'column';
                        navList.style.gap = 'var(--space-16)';
                    }
                    
                    // Animate hamburger
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    nav.style.display = '';
                    nav.style.position = '';
                    nav.style.top = '';
                    nav.style.left = '';
                    nav.style.right = '';
                    nav.style.background = '';
                    nav.style.boxShadow = '';
                    nav.style.borderRadius = '';
                    nav.style.padding = '';
                    nav.style.zIndex = '';
                    
                    // Reset nav list
                    const navList = nav.querySelector('.nav-list');
                    if (navList) {
                        navList.style.flexDirection = '';
                        navList.style.gap = '';
                    }
                    
                    // Reset hamburger
                    const spans = mobileToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = '';
                        span.style.opacity = '';
                    });
                }
            });

            // Close menu when clicking nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (isMenuOpen && window.innerWidth <= 768) {
                        mobileToggle.click();
                    }
                });
            });
        }
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        const animateElements = document.querySelectorAll(
            '.feature-card, .news-card, .gallery-item, .founder-card, .contact-item'
        );
        
        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    animateVisibleElements() {
        const currentPageElements = document.querySelectorAll(`#${this.currentPage} .fade-in`);
        currentPageElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }

    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > 768) {
            const nav = document.querySelector('.nav');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (nav && mobileToggle) {
                nav.style.display = '';
                // Reset hamburger
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        }
    }

    handleScroll() {
        // Add header shadow on scroll
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            color: var(--color-text);
            padding: var(--space-16) var(--space-20);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            border-left: 4px solid ${this.getNotificationColor(type)};
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform var(--duration-normal) var(--ease-standard);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);

        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    getNotificationColor(type) {
        const colors = {
            success: 'var(--color-success)',
            error: 'var(--color-error)',
            warning: 'var(--color-warning)',
            info: 'var(--color-info)'
        };
        return colors[type] || colors.info;
    }

    // Prayer times functionality (placeholder)
    setupPrayerTimes() {
        const prayerWidget = document.createElement('div');
        prayerWidget.className = 'prayer-times-widget';
        prayerWidget.innerHTML = `
            <h4>Prayer Times</h4>
            <div class="prayer-time">
                <span>Fajr</span>
                <span>5:30 AM</span>
            </div>
            <div class="prayer-time">
                <span>Dhuhr</span>
                <span>12:15 PM</span>
            </div>
            <div class="prayer-time">
                <span>Asr</span>
                <span>3:45 PM</span>
            </div>
            <div class="prayer-time">
                <span>Maghrib</span>
                <span>6:20 PM</span>
            </div>
            <div class="prayer-time">
                <span>Isha</span>
                <span>7:45 PM</span>
            </div>
        `;
        
        // Add prayer times to sidebar or footer
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.appendChild(prayerWidget);
        }
    }

    // Utility functions
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Dark mode toggle (if needed)
    toggleDarkMode() {
        const body = document.body;
        const isDark = body.getAttribute('data-color-scheme') === 'dark';
        
        if (isDark) {
            body.setAttribute('data-color-scheme', 'light');
            localStorage.setItem('color-scheme', 'light');
        } else {
            body.setAttribute('data-color-scheme', 'dark');
            localStorage.setItem('color-scheme', 'dark');
        }
    }

    // Initialize theme from localStorage
    initializeTheme() {
        const savedTheme = localStorage.getItem('color-scheme');
        if (savedTheme) {
            document.body.setAttribute('data-color-scheme', savedTheme);
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const website = new MadrasaWebsite();
    
    // Make website instance globally available for debugging
    window.madrasaWebsite = website;
    
    // Add some console styling for development
    console.log('%c🕌 AL-JAMEATUL QADRIYA Website Loaded Successfully', 
                'color: #006633; font-size: 16px; font-weight: bold;');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (window.madrasaWebsite) {
        const hash = window.location.hash.substring(1) || 'home';
        window.madrasaWebsite.showPage(hash);
    }
});

// Update URL when page changes
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            history.pushState(null, null, href);
        }
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key to close modals or notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.click();
        }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        // Add visible focus indicators for keyboard navigation
        document.body.classList.add('keyboard-nav');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add loading indicator for slow connections
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
});