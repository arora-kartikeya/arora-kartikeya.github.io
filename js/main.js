// Main JavaScript file for Kartikeya Arora's website

document.addEventListener('DOMContentLoaded', function() {
    // Handle tutorial request form submission
    const requestForm = document.getElementById('request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send this data to a server
            // For GitHub Pages, you could use a service like Formspree
            alert('Thank you for your tutorial request! I will consider it for future content.');
            requestForm.reset();
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to current nav item based on URL
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    const navLength = navLinks.length;
    
    for (let i = 0; i < navLength; i++) {
        if (navLinks[i].getAttribute('href') === currentLocation.split('/').pop()) {
            navLinks[i].parentElement.classList.add('current');
        }
    }

    // Add year to copyright in footer
    const year = new Date().getFullYear();
    const copyright = document.querySelector('footer p');
    if (copyright) {
        copyright.innerHTML = copyright.innerHTML.replace('2023', year);
    }
});

// Add a simple animation for page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
