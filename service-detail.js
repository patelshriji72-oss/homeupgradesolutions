// Service details data
const serviceData = {
    electrical: {
        title: "Electrical Services",
        description: "Complete electrical installations, repairs, wiring, panel upgrades, and emergency electrical services for your home and business.",
        features: [
            "Licensed and certified electricians",
            "24/7 emergency electrical services",
            "Complete home rewiring",
            "Electrical panel upgrades",
            "GFCI outlet installation",
            "Ceiling fan installation",
            "Smart home electrical setup"
        ],
        image: "images/download (6).jpg"
    },
    plumbing: {
        title: "Plumbing Services",
        description: "Expert plumbing repairs, installations, pipe fixing, water heater services, and emergency plumbing solutions.",
        features: [
            "Emergency plumbing repairs",
            "Water heater installation & repair",
            "Pipe installation and repair",
            "Drain cleaning services",
            "Bathroom fixture installation",
            "Kitchen plumbing solutions",
            "Leak detection and repair"
        ],
        image: "images/604a0190351cde001d89dab6.jpg"
    },
    renovation: {
        title: "Home Renovation",
        description: "Complete home makeovers, room renovations, interior design, and structural improvements to transform your space.",
        features: [
            "Complete home makeovers",
            "Kitchen renovations",
            "Bathroom remodeling",
            "Room additions",
            "Interior design consultation",
            "Structural improvements",
            "Modern home upgrades"
        ],
        image: "images/2352cf66fdbc0b8953ccf07d51aff2e2cd4877a3-komple-tadilat-plani.jpeg"
    },
    furniture: {
        title: "Furniture & Fabrication",
        description: "Custom furniture design, fabrication, repair, and installation services tailored to your specific needs and style.",
        features: [
            "Custom furniture design",
            "Furniture fabrication",
            "Furniture repair services",
            "Cabinet installation",
            "Built-in storage solutions",
            "Office furniture setup",
            "Furniture assembly"
        ],
        image: "images/images (23).jpg"
    },
    painting: {
        title: "Painting & Decoration",
        description: "Interior and exterior painting, wall decoration, texture work, and color consultation services for beautiful spaces.",
        features: [
            "Interior painting services",
            "Exterior painting",
            "Wall texture and design",
            "Color consultation",
            "Wallpaper installation",
            "Decorative finishes",
            "Paint protection services"
        ],
        image: "images/download (5).jpg"
    },
    carpentry: {
        title: "Carpentry & Woodwork",
        description: "Custom carpentry, wooden furniture, cabinets, doors, windows, and all professional woodwork solutions.",
        features: [
            "Custom carpentry work",
            "Door and window installation",
            "Cabinet making",
            "Wooden furniture crafting",
            "Trim and molding work",
            "Deck and patio construction",
            "Wood repair services"
        ],
        image: "images/images (22).jpg"
    },
    roofing: {
        title: "Roofing Services",
        description: "Professional roof installation, repair, maintenance, waterproofing, and gutter cleaning services.",
        features: [
            "Roof installation",
            "Roof repair services",
            "Waterproofing solutions",
            "Gutter installation & cleaning",
            "Roof maintenance",
            "Emergency roof repairs",
            "Roof inspection services"
        ],
        image: "images/images (21).jpg"
    },
    hvac: {
        title: "HVAC Services",
        description: "Air conditioning installation, heating systems, ventilation, and complete climate control solutions.",
        features: [
            "AC installation & repair",
            "Heating system services",
            "Ventilation solutions",
            "HVAC maintenance",
            "Duct cleaning",
            "Energy-efficient systems",
            "Emergency HVAC repairs"
        ],
        image: "images/images (1).jpg"
    },
    flooring: {
        title: "Flooring Solutions",
        description: "Professional tile installation, hardwood flooring, carpet installation, and comprehensive floor repair services.",
        features: [
            "Tile installation",
            "Hardwood flooring",
            "Carpet installation",
            "Laminate flooring",
            "Floor repair services",
            "Floor refinishing",
            "Waterproof flooring"
        ],
        image: "images/images (2).jpg"
    },
    bathroom: {
        title: "Bathroom Renovation",
        description: "Complete bathroom remodeling, fixture installation, tiling, and modern bathroom design services.",
        features: [
            "Complete bathroom remodel",
            "Fixture installation",
            "Bathroom tiling",
            "Shower installation",
            "Vanity installation",
            "Bathroom lighting",
            "Accessibility modifications"
        ],
        image: "images/images (3).jpg"
    },
    solar: {
        title: "Solar Panel Installation",
        description: "Professional solar panel installation, maintenance, repair, and renewable energy solutions for your home.",
        features: [
            "Solar panel installation",
            "Solar system design",
            "Panel maintenance",
            "Solar repair services",
            "Energy efficiency consultation",
            "Battery backup systems",
            "Grid-tie installations"
        ],
        image: "images/images (25).jpg"
    }
};

// Get service type from URL parameter
function getServiceType() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('service') || 'electrical';
}

// Load service data
function loadServiceData() {
    const serviceType = getServiceType();
    const service = serviceData[serviceType];
    
    if (service) {
        document.getElementById('service-title').textContent = service.title;
        document.getElementById('service-description').textContent = service.description;
        document.getElementById('service-img').src = service.image;
        
        // Load features
        const featuresList = document.getElementById('service-features');
        featuresList.innerHTML = '';
        service.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Set service in select dropdown
        const serviceSelect = document.getElementById('service-select');
        serviceSelect.innerHTML = `<option value="${serviceType}">${service.title}</option>`;
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    loadServiceData();
    
    document.getElementById('bookingForm').addEventListener('submit', handleServiceBooking);
});

async function handleServiceBooking(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const bookingData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        preferredDate: formData.get('preferredDate'),
        preferredTime: formData.get('preferredTime'),
        requirements: formData.get('requirements')
    };
    
    try {
        console.log('Submitting service booking:', bookingData);
        
        const response = await fetch('/api/services/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('Booking response:', result);
        
        if (result.success) {
            showBookingConfirmation(bookingData);
            form.reset();
        } else {
            alert('Error: ' + (result.message || 'Please try again'));
        }
    } catch (error) {
        console.error('Booking submission error:', error);
        alert('Network error: ' + error.message);
    }
}

function showBookingConfirmation(bookingData) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;">
            <div style="background:white;padding:30px;border-radius:10px;max-width:500px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
                <div style="font-size:3rem;margin-bottom:20px;">✅</div>
                <h2 style="color:#333;margin-bottom:15px;">Service Booked Successfully!</h2>
                <p style="color:#666;margin-bottom:20px;">Thank you ${bookingData.name}! Your service booking has been confirmed.</p>
                <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:20px;text-align:left;">
                    <p><strong>Service:</strong> ${bookingData.service}</p>
                    <p><strong>Preferred Date:</strong> ${bookingData.preferredDate}</p>
                    <p><strong>Preferred Time:</strong> ${bookingData.preferredTime}</p>
                    <p><strong>Contact:</strong> ${bookingData.phone}</p>
                    <p><strong>Next Steps:</strong></p>
                    <ul style="margin:10px 0;padding-left:20px;">
                        <li>We'll call you within 2 hours to confirm</li>
                        <li>Service will be scheduled as requested</li>
                        <li>Professional technician will arrive on time</li>
                    </ul>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="background:#4CAF50;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;font-weight:600;">Got it!</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}