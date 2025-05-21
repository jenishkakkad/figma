
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Mobile Dropdown Toggle
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    
    mobileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu) {
                dropdownMenu.classList.toggle('active');
            }
        });
    });
    
    // Newsletter Submission
    const newsletterForms = document.querySelectorAll('.newsletter-form form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    });
    
    // Product Card Hover Effect
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add to Cart Functionality
    // This would typically interact with a shopping cart system
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product details
                const productCard = this.closest('.product-card');
                const productName = productCard ? productCard.querySelector('.product-title').textContent : 'Product';
                
                // Show confirmation message
                alert(`${productName} added to cart!`);
                
                // Update cart count (in a real app, this would be more sophisticated)
                const cartCount = document.querySelector('.cart-btn span');
                if (cartCount) {
                    const currentText = cartCount.textContent;
                    const currentCount = parseInt(currentText.match(/\d+/)[0] || 0);
                    cartCount.textContent = `Cart (${currentCount + 1})`;
                }
            });
        });
    }

    // Add functionality to quantity buttons in product details
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    quantityInputs.forEach(input => {
        const decreaseBtn = input.previousElementSibling;
        const increaseBtn = input.nextElementSibling;
        
        if (decreaseBtn && increaseBtn) {
            decreaseBtn.addEventListener('click', function() {
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                }
            });
            
            increaseBtn.addEventListener('click', function() {
                let value = parseInt(input.value);
                input.value = value + 1;
            });
        }
    });

    // Testimonial Carousel (if multiple testimonials)
    // This is a simple implementation, in a real project you might use a library
    const testimonials = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonials.length > 1 && testimonialDots.length > 0) {
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(item => item.style.display = 'none');
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].style.display = 'block';
            testimonialDots[index].classList.add('active');
        }
        
        // Initialize
        showTestimonial(currentIndex);
        
        // Click on dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
        
        // Auto rotation (optional)
        setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // Tabs in product detail page
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                tabContents[index].classList.add('active');
            });
        });
    }
});
