// Function to load header and set active navigation
function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setActiveNav();
        })
        .catch(error => console.error('Error loading header:', error));
}

// Function to set active navigation based on current page
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page
    switch(currentPage) {
        case 'home.html':
        case 'index.html':
        case '':
            document.getElementById('nav-home').classList.add('active');
            break;
        case 'service.html':
            document.getElementById('nav-service').classList.add('active');
            break;
        case 'blog.html':
            document.getElementById('nav-blog').classList.add('active');
            break;
        case 'aboutus.html':
            document.getElementById('nav-about').classList.add('active');
            break;
        case 'contact.html':
            document.getElementById('nav-contact').classList.add('active');
            break;
    }
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeader);