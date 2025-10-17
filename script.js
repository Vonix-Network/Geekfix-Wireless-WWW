// Modern JavaScript for GeekFix Pro Website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Scroll animations
    initScrollAnimations();
    
    // Form handling
    initContactForm();
    
    // Interactive elements
    initInteractiveElements();
    
    // Performance optimizations
    initPerformanceOptimizations();
    
    // Initialize interactive map
    initInteractiveMap();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background blur on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('services-grid') || 
                    entry.target.classList.contains('features-grid') ||
                    entry.target.classList.contains('testimonials-grid')) {
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('fade-in-up');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.hero-content, .hero-visual, .section-header, .service-card, .feature-card, .testimonial-card, .contact-method'
    );
    
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
    
    // Special handling for grids
    const grids = document.querySelectorAll('.services-grid, .features-grid, .testimonials-grid');
    grids.forEach(grid => {
        observer.observe(grid);
        Array.from(grid.children).forEach(item => {
            item.classList.add('loading');
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.querySelector('.quote-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Thank you! We\'ll contact you within 24 hours.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
}

// Form validation
function validateForm(data) {
    let isValid = true;
    
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Please enter your full name');
        isValid = false;
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (!data.device) {
        showFieldError('device', 'Please select your device');
        isValid = false;
    }
    
    if (!data.issue) {
        showFieldError('issue', 'Please select the issue');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    switch (field.name) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters';
            }
            break;
        case 'phone':
            if (!isValidPhone(value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
            break;
        case 'device':
            if (!value) {
                isValid = false;
                message = 'Please select your device';
            }
            break;
        case 'issue':
            if (!value) {
                isValid = false;
                message = 'Please select the issue';
            }
            break;
    }
    
    if (isValid) {
        clearFieldError(field);
    } else {
        showFieldError(field.name, message);
    }
    
    return isValid;
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{9,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '#ef4444';
        field.style.background = 'rgba(239, 68, 68, 0.1)';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '';
        field.style.background = '';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
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
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Interactive elements
function initInteractiveElements() {
    // Phone number click tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
        phoneLink.addEventListener('click', function() {
            // Analytics tracking (replace with your analytics code)
            console.log('Phone number clicked:', this.href);
            
            // Optional: Show a small notification
            showNotification('Opening phone dialer...', 'info');
        });
    });
    
    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Feature card interactions
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Copy phone number functionality (Ctrl+Click)
    document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
        phoneLink.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const phoneNumber = this.textContent.trim();
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(phoneNumber).then(() => {
                        showNotification('Phone number copied to clipboard!', 'success');
                    });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = phoneNumber;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showNotification('Phone number copied to clipboard!', 'success');
                }
            }
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalImages = ['logo.jpg'];
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Scroll-based functionality here
        }, 10);
    });
}

// Utility functions
const GeekFixUtils = {
    // Format phone number
    formatPhoneNumber: function(phoneNumber) {
        const cleaned = phoneNumber.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phoneNumber;
    },
    
    // Check if business is open
    isBusinessOpen: function() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const hour = now.getHours();
        
        // Business hours: Mon-Fri 9-19, Sat 10-18, Sun closed
        if (day === 0) return false; // Sunday
        if (day === 6) return hour >= 10 && hour < 18; // Saturday
        return hour >= 9 && hour < 19; // Monday-Friday
    },
    
    // Get business hours
    getBusinessHours: function() {
        return {
            monday: '9:00 AM - 7:00 PM',
            tuesday: '9:00 AM - 7:00 PM',
            wednesday: '9:00 AM - 7:00 PM',
            thursday: '9:00 AM - 7:00 PM',
            friday: '9:00 AM - 7:00 PM',
            saturday: '10:00 AM - 6:00 PM',
            sunday: 'Closed'
        };
    },
    
    // Scroll to top
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    
    // Generate random testimonial rotation (if you want to add more testimonials)
    rotateTestimonials: function() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length > 3) {
            setInterval(() => {
                // Implementation for rotating testimonials
            }, 10000);
        }
    }
};

// Make utilities globally available
window.GeekFixUtils = GeekFixUtils;

// Add loading animation for logo
const logo = document.querySelector('.nav-logo');
if (logo) {
    logo.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transition = 'opacity 0.3s ease';
    });
}

// Initialize business status indicator (optional)
function initBusinessStatus() {
    const isOpen = GeekFixUtils.isBusinessOpen();
    const statusElements = document.querySelectorAll('.business-status');
    
    statusElements.forEach(element => {
        element.textContent = isOpen ? 'Open Now' : 'Closed';
        element.style.color = isOpen ? '#10b981' : '#ef4444';
    });
}

// Call business status on load
initBusinessStatus();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Add touch gesture support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe up
            console.log('Swipe up detected');
        } else {
            // Swipe down
            console.log('Swipe down detected');
        }
    }
}

// Interactive Map with multiple shop locations (Leaflet)
function initInteractiveMap() {
    const mapDiv = document.getElementById('map');
    if (!mapDiv || !window.L) {
        console.warn('Map container or Leaflet not available');
        return;
    }

    // Define locations
    const locations = [
        {
            name: 'Lyman Vape and Tobacco',
            address: '308 Spartanburg Hwy, Lyman, SC 29365',
            coords: [34.95422935857173, -82.11722987254369]
        },
        {
            name: "Bros Smoke & Vape",
            address: '3906 SC-9 Unit B, Boiling Springs, SC 29316',
            coords: [35.049330233155935, -81.98551777428534]
        },
        {
            name: 'Belton Tobacco & Vapor',
            address: '334 S Main St, Belton, SC 29627',
            coords: [34.51720308837764, -82.4887634392389]
        },
        {
            name: 'Woodruff Tobacco and Vapor',
            address: '1451 Woodruff Rd Ste J, Greenville, SC 29607',
            coords: [34.823595549242675, -82.28500529428035]
        },
        {
            name: 'Woodruff Tobacco and Vapor 2',
            address: '341 N Main St, Woodruff, SC 29388',
            coords: [34.74370791205451, -82.03971387301162]
        },
        {
            name: 'Wade Hampton Tobacco and Vapor',
            address: '5322 Wade Hampton Blvd Unit C, Taylors, SC 29687',
            coords: [34.93417067369116, -82.27968352883528]
        },
        {
            name: "Puff'n Buzz Smoke & Vape",
            address: '110 E Butler Rd suite c, Mauldin, SC 29662',
            coords: [34.77934247470949, -82.30286449126535]
        }
    ];

    // Initialize map
    const map = L.map('map', { 
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true
    });
    
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create custom marker icon
    const customIcon = L.divIcon({
        html: '<div class="custom-marker"><i class="fas fa-map-marker-alt"></i></div>',
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });

    // Add markers
    const markers = [];
    const markerGroup = L.featureGroup();
    
    locations.forEach((loc, index) => {
        const marker = L.marker(loc.coords, { icon: customIcon })
            .bindPopup(`
                <div class="map-popup">
                    <h4>${loc.name}</h4>
                    <p>${loc.address}</p>
                    <a href="https://www.google.com/maps?q=${loc.coords[0]},${loc.coords[1]}" 
                       target="_blank" rel="noopener" class="popup-link">
                        <i class="fas fa-external-link-alt"></i> Open in Google Maps
                    </a>
                </div>
            `);
        
        markerGroup.addLayer(marker);
        markers.push({ marker, ...loc, index });
    });
    
    markerGroup.addTo(map);

    // Fit map to show all markers
    if (markers.length > 1) {
        map.fitBounds(markerGroup.getBounds().pad(0.15));
    } else if (markers.length === 1) {
        map.setView(markers[0].coords, 16);
    }

    // Populate locations list
    const listEl = document.getElementById('locations-list');
    if (listEl) {
        locations.forEach((loc, idx) => {
            const locationItem = document.createElement('div');
            locationItem.className = 'location-item';
            locationItem.innerHTML = `
                <span class="location-name">${loc.name}</span>
                <span class="location-address">${loc.address}</span>
            `;
            
            locationItem.addEventListener('click', () => {
                // Remove active class from all items
                document.querySelectorAll('.location-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked item
                locationItem.classList.add('active');
                
                // Fly to location on map
                map.flyTo(loc.coords, 17, { duration: 0.6 });
                
                // Open popup
                markers[idx].marker.openPopup();
                
                // Add slight delay for smooth animation
                setTimeout(() => {
                    map.invalidateSize();
                }, 300);
            });
            
            listEl.appendChild(locationItem);
        });
    }

    // Add custom marker styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-div-icon {
            background: transparent !important;
            border: none !important;
        }
        
        .custom-marker {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            border: 2px solid white;
        }
        
        .custom-marker i {
            transform: rotate(45deg);
            font-size: 14px;
        }
        
        .map-popup {
            min-width: 200px;
            font-family: 'Inter', sans-serif;
        }
        
        .map-popup h4 {
            margin: 0 0 0.5rem 0;
            color: #1f2937;
            font-size: 1rem;
            font-weight: 600;
        }
        
        .map-popup p {
            margin: 0 0 0.75rem 0;
            color: #6b7280;
            font-size: 0.875rem;
            line-height: 1.4;
        }
        
        .popup-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #3b82f6;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            transition: background 0.3s ease;
        }
        
        .popup-link:hover {
            background: #1d4ed8;
            color: white;
        }
    `;
    document.head.appendChild(style);
}

// Console welcome message
console.log(`
%c🔧 GeekFix Pro - Premium Phone Repair
%cWebsite loaded successfully! 
Built with modern web technologies for the best user experience.
Contact: (313) 564-9427

`, 'color: #3b82f6; font-size: 16px; font-weight: bold;', 'color: #6b7280; font-size: 14px;');