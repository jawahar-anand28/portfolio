// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);

    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = navLinksArray.find(link => 
                link.getAttribute('href') === `#${sectionId}`
            );

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksArray.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 72;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbarBackground);

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const fadeElements = document.querySelectorAll('.project-card, .certificate-card, .timeline-item, .skill-category');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        }

        // Start typing effect when page loads
        setTimeout(typeWriter, 500);
        heroTitle.style.borderRight = '3px solid var(--primary-color)';
        heroTitle.style.animation = 'blink 1s infinite';
    }

    // Add blinking cursor animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: var(--primary-color); }
            51%, 100% { border-color: transparent; }
        }
    `;
    document.head.appendChild(style);

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simple validation
            const name = formObject.name.trim();
            const email = formObject.email.trim();
            const subject = formObject.subject.trim();
            const message = formObject.message.trim();

            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Show success message (in a real application, you would send this to a server)
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.background = '#10b981';
                break;
            case 'error':
                notification.style.background = '#ef4444';
                break;
            default:
                notification.style.background = '#3b82f6';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill tags animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.style.animation = 'fadeInUp 0.6s ease forwards';
        tag.style.opacity = '0';
        
        setTimeout(() => {
            tag.style.opacity = '1';
        }, index * 100);
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }

    window.addEventListener('scroll', updateParallax);

    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // Initialize timeline items
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateTimeline);
    animateTimeline(); // Run once on load

    // Certificate cards hover effect
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.certificate-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.certificate-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    
    function revealSections() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
            
            if (isVisible && !section.classList.contains('revealed')) {
                section.classList.add('revealed');
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
    });

    window.addEventListener('scroll', revealSections);
    window.addEventListener('load', revealSections);

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll event listeners
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    window.addEventListener('scroll', throttle(updateNavbarBackground, 100));
    window.addEventListener('scroll', throttle(updateParallax, 16)); // 60fps
    window.addEventListener('scroll', throttle(animateTimeline, 100));
    window.addEventListener('scroll', throttle(revealSections, 100));

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press 'Escape' to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }

        // Press '/' to focus search (if you add search functionality later)
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            // You could focus a search input here
        }
    });

    // Lazy loading for images (when you add real images)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        // Observe all images with 'lazy' class
        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type === 'submit') {
                const originalText = this.textContent;
                this.textContent = 'Sending...';
                this.disabled = true;

                // Reset after 2 seconds (in real app, this would be based on actual response)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });

    // Initialize everything
    updateActiveNavLink();
    updateNavbarBackground();
    revealSections();
    animateTimeline();
});

// Utility functions
function debounce(func, wait) {
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button dynamically
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    z-index: 1000;
`;

scrollToTopBtn.addEventListener('click', scrollToTop);
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});
scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', throttle(function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
}, 100));

console.log('Portfolio website loaded successfully! 🚀');
