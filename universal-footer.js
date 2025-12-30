// Universal Footer Script - Consistent Footer for All Pages
document.addEventListener('DOMContentLoaded', function() {
    // Footer HTML - Consistent across all pages
    const footerHTML = `localhost="8000:
        <!-- Newsletter Section -->
        <section class="newsletter-section">
            <div class="container">
                <div class="newsletter-content">
                    <div class="newsletter-text">
                        <h3>Stay Connected with Our Newsletter</h3>
                        <p>Subscribe to our newsletter to get more news, updates, and special offers</p>
                    </div>
                    <div class="newsletter-form">
                        <input type="email" placeholder="Enter email address" required>
                        <button type="submit">Subscribe</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="universal-footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-logo">
                            <img src="images/HomeUpgrade.png" alt="Home Upgrade Logo">
                            <h3>Home Upgrade</h3>
                        </div>
                        <p>Your trusted partner for all home improvement needs. Quality work, transparent pricing, and customer satisfaction guaranteed.</p>
                        <div class="social-links">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="home.html">Home</a></li>
                            <li><a href="aboutus.html">About Us</a></li>
                            <li><a href="service.html">Services</a></li>
                            <li><a href="blog.html">Blog</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="service.html">Electrical Work</a></li>
                            <li><a href="service.html">Plumbing</a></li>
                            <li><a href="service.html">Home Renovation</a></li>
                            <li><a href="service.html">Furniture & Fabrication</a></li>
                            <li><a href="service.html">Solar Panel Installation</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Contact Info</h4>
                        <div class="contact-info">
                            <p><i class="fas fa-phone"></i> +91 95127 47555</p>
                            <p><i class="fas fa-envelope"></i> info@homeupgrade.in</p>
                            <p><i class="fas fa-clock"></i> 24/7 Available</p>
                            <p><i class="fas fa-map-marker-alt"></i> Ahmedabad, Gujarat</p>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2024 Home Upgrade. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
    
    // Check if footer already exists (to avoid duplicates)
    if (!document.querySelector('.universal-footer')) {
        // Insert footer before closing body tag
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
    
    // Add newsletter functionality
    addNewsletterFunctionality();
});

// Newsletter functionality
function addNewsletterFunctionality() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const input = newsletterForm.querySelector('input[type="email"]');
        const button = newsletterForm.querySelector('button');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const email = input.value.trim();
            
            if (email && isValidEmail(email)) {
                // Store email and send to backend
                subscribeToNewsletter(email);
                input.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                button.click();
            }
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Newsletter subscription function
function subscribeToNewsletter(email) {
    // Store in localStorage for now
    let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        
        // Send to your backend/email service
        sendToEmailService(email);
        
        showNotification('🎉 Successfully subscribed! You\'ll receive our latest updates.', 'success');
    } else {
        showNotification('📧 You\'re already subscribed to our newsletter!', 'info');
    }
}

// Send email to backend service
function sendToEmailService(email) {
    // Replace with your actual email service endpoint
    fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    }).catch(() => {
        // Fallback: mailto link for manual processing
        const subject = 'Newsletter Subscription';
        const body = `New newsletter subscription: ${email}`;
        window.open(`mailto:info@homeupgrade.in?subject=${subject}&body=${body}`);
    });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'info' ? '#2196F3' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}