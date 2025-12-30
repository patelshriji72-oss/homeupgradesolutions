// Service loader for dynamic service cards
async function loadServicesFromAPI() {
    try {
        const response = await fetch('/api/services');
        const services = await response.json();
        
        const servicesContainer = document.getElementById('servicesContainer');
        if (!servicesContainer) return;
        
        // Filter only active services
        const activeServices = services.filter(service => service.isActive);
        
        if (activeServices.length === 0) {
            servicesContainer.innerHTML = '<p style="text-align:center;color:#666;grid-column:1/-1;">No services available at the moment.</p>';
            return;
        }
        
        servicesContainer.innerHTML = activeServices.map(service => `
            <div class="service-card" onclick="openSubServices('${service._id}')">
                <div class="service-icon">${service.icon || '🔧'}</div>
                <h3>${service.title}</h3>
                <p>${service.description || 'Professional service available'}</p>
                <div class="service-category">${service.category || 'General'}</div>
                <button class="service-btn">Book Now</button>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading services:', error);
        const servicesContainer = document.getElementById('servicesContainer');
        if (servicesContainer) {
            servicesContainer.innerHTML = '<p style="text-align:center;color:#e74c3c;grid-column:1/-1;">Error loading services. Please try again later.</p>';
        }
    }
}

// Load services when page loads
document.addEventListener('DOMContentLoaded', loadServicesFromAPI);