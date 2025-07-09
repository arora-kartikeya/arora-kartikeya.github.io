// Mobile Navigation
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Navbar scroll effect
const navbar = document.querySelector('#navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.research-card, .tutorial-card, .publication-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Contact form handling with Formspree
const contactForm = document.querySelector('#contact-form');
const submitBtn = document.querySelector('#submit-btn');
const formStatus = document.querySelector('#form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Clear previous status
        formStatus.innerHTML = '';
        formStatus.className = 'form-status';
        
        try {
            const formData = new FormData(this);
            
            // Send to Formspree
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                formStatus.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h4>Message Sent Successfully!</h4>
                        <p>Thank you for your message. I'll get back to you soon.</p>
                    </div>
                `;
                formStatus.className = 'form-status success';
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error
            formStatus.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Oops! Something went wrong.</h4>
                    <p>Please try again or contact me directly at <a href="mailto:arorak@usc.edu">arorak@usc.edu</a></p>
                </div>
            `;
            formStatus.className = 'form-status error';
        } finally {
            // Reset button state
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
});

// Quantum circuit animation - improved for mobile
function animateQuantumCircuit() {
    const gates = document.querySelectorAll('.quantum-gate');
    if (gates.length === 0) return;
    
    // Don't animate on very small screens to improve performance
    if (window.innerWidth <= 480) return;
    
    gates.forEach((gate, index) => {
        setTimeout(() => {
            gate.style.animation = 'none';
            void gate.offsetWidth; // Trigger reflow
            gate.style.animation = 'pulse 2s infinite';
            gate.style.animationDelay = `${index * 0.7}s`;
        }, index * 200);
    });
}

// Start quantum animation on page load with delay
window.addEventListener('load', () => {
    setTimeout(() => {
        animateQuantumCircuit();
        // Only restart animation on desktop
        if (window.innerWidth > 768) {
            setInterval(animateQuantumCircuit, 8000);
        }
    }, 1500);
});

// Parallax effect for hero section - desktop only
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.quantum-visualization');
    const isMobile = window.innerWidth <= 768;
    
    parallaxElements.forEach(element => {
        if (!isMobile) {
            // Only apply parallax on desktop
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        } else {
            // Reset transform on mobile
            element.style.transform = 'none';
        }
    });
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking && window.innerWidth > 768) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestParallaxUpdate);

// Reset parallax on window resize
window.addEventListener('resize', () => {
    const parallaxElements = document.querySelectorAll('.quantum-visualization');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        parallaxElements.forEach(element => {
            element.style.transform = 'none';
        });
    }
    
    // Restart or stop quantum animation based on screen size
    if (isMobile) {
        clearInterval(window.quantumInterval);
    } else if (!window.quantumInterval) {
        window.quantumInterval = setInterval(animateQuantumCircuit, 8000);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
