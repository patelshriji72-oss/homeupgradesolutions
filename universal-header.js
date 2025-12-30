// Universal Header Script - Consistent Navbar for All Pages
document.addEventListener('DOMContentLoaded', function () {
    let currentPage = window.location.pathname.split('/').pop() || 'home.html';
    if (!currentPage.includes('.html')) currentPage = 'home.html';
    if (currentPage === 'index.html') currentPage = 'home.html';

    const headerHTML = `
        <!-- Top Bar -->
        <div class="top-bar">
            <div class="top-left">
                <span class="dot"></span> We are ready 24 Hours
            </div>
            <div class="top-right">
                <span>📞 Fast Service: <a href="https://wa.me/919512747555?text=Thank+you+for+connecting+with+us." target="_blank">+91 95127 47555</a></span>
                <span>✉️ info@homeupgrade.in</span>
            </div>
        </div>

        <!-- Navbar -->
        <nav class="navbar">
            <div class="logo">
                <img src="images/HomeUpgrade.png" height="60px" width="60px" alt="Home Upgrade Logo">
            </div>

            <button class="mobile-menu-toggle" onclick="document.querySelector('.nav-links').classList.toggle('active'); document.body.classList.toggle('menu-open')">☰</button>

            <ul class="nav-links">
                <li><a href="home.html" ${currentPage === 'home.html' ? 'class="active"' : ''}>Home</a></li>
                <li><a href="service.html" ${currentPage === 'service.html' ? 'class="active"' : ''}>Service</a></li>
                <li><a href="blog.html" ${currentPage === 'blog.html' ? 'class="active"' : ''}>Blog</a></li>
                <li><a href="aboutus.html" ${currentPage === 'aboutus.html' ? 'class="active"' : ''}>About Us</a></li>
                <li><a href="contact.html" ${currentPage === 'contact.html' ? 'class="active"' : ''}>Contact</a></li>
                <li class="mobile-auth"><a href="#" onclick="openAuthModal('signin')">Sign In</a></li>
                <li class="mobile-auth"><a href="#" onclick="openAuthModal('signup')">Sign Up</a></li>
            </ul>

            <div class="auth-buttons">
                <a href="#" onclick="openAuthModal('signin')" class="signin-btn">Sign In</a>
                <a href="#" onclick="openAuthModal('signup')" class="signup-btn">Sign Up</a>
            </div>
        </nav>
    `;

    if (!document.querySelector('.top-bar')) {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
});


// Close menu when clicking on a link
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-links a')) {
        document.querySelector('.nav-links').classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});
