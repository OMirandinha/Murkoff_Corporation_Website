// ===== SCRIPT FOR MURKOFF CORPORATION PAGE FUNCTIONALITIES =====

// Open and close the sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

// Interactive FAQ
function toggleFAQ(id) {
    const answer = document.getElementById("faq" + id);
    const question = answer.previousElementSibling;
    const icon = question.querySelector('.mc-faq-icon');
    
    // Toggle clicked answer
    if (answer.style.display === "block") {
        answer.style.display = "none";
        icon.style.transform = "rotate(0deg)";
    } else {
        answer.style.display = "block";
        icon.style.transform = "rotate(180deg)";
    }
}

// Close sidebar when clicking a link on mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.mc-sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                w3_close();
            }
        });
    });
    
    // Add active class to the current section link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.mc-section');
        const navLinks = document.querySelectorAll('.mc-sidebar a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('w3-red');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('w3-red');
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterBtn = document.querySelector('footer .w3-button.mc-red');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const emailInput = this.previousElementSibling;
            if (emailInput.value && isValidEmail(emailInput.value)) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Simple email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Equalize card heights
    function equalizeCardHeights(selector) {
        const containers = document.querySelectorAll(selector);
        
        containers.forEach(container => {
            const cards = container.querySelectorAll('.mc-card-fixed, .mc-tech-card');
            let maxHeight = 0;
            
            // Reset heights first
            cards.forEach(card => {
                card.style.height = 'auto';
            });
            
            // Find the maximum height
            cards.forEach(card => {
                const cardHeight = card.offsetHeight;
                if (cardHeight > maxHeight) {
                    maxHeight = cardHeight;
                }
            });
            
            // Apply maximum height to all cards
            cards.forEach(card => {
                card.style.height = maxHeight + 'px';
            });
        });
    }
    
    // Run equalization on load and resize
    window.addEventListener('load', function() {
        equalizeCardHeights('.mc-equal-height');
        equalizeCardHeights('.mc-equal-height-row');
        equalizeCardHeights('.mc-tech-row');
    });
    
    window.addEventListener('resize', function() {
        equalizeCardHeights('.mc-equal-height');
        equalizeCardHeights('.mc-equal-height-row');
        equalizeCardHeights('.mc-tech-row');
    });
    
    // Close sidebar by default on small screens
    if (window.innerWidth <= 992) {
        w3_close();
    }
});
