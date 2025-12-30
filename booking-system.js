// Service data with sub-services
const servicesData = {
  electrician: {
    name: "Electrician Services",
    subServices: [
      { id: 1, name: "Light Fitting", description: "Professional light installation", price: 299, icon: "💡" },
      { id: 2, name: "Fan Repair", description: "Ceiling and table fan repairs", price: 399, icon: "🌀" },
      { id: 3, name: "Switchboard Repair", description: "Electrical panel maintenance", price: 599, icon: "🔌" },
      { id: 4, name: "Wiring", description: "Complete house wiring solutions", price: 1999, icon: "⚡" },
      { id: 5, name: "Socket Installation", description: "Power outlet installation", price: 199, icon: "🔌" },
      { id: 6, name: "Earthing", description: "Electrical earthing systems", price: 899, icon: "🌍" },
      { id: 7, name: "Tripping Issue Fix", description: "Circuit breaker problems", price: 499, icon: "⚠️" },
      { id: 8, name: "Appliance Electrical Point", description: "Dedicated appliance connections", price: 349, icon: "🔧" },
      { id: 9, name: "Tube Light/Bulb Replacement", description: "Light fixture replacements", price: 149, icon: "💡" }
    ]
  },
  ac: {
    name: "AC Installation & Repair",
    subServices: [
      { id: 1, name: "AC Installation", description: "Complete AC unit installation", price: 2999, icon: "❄️" },
      { id: 2, name: "AC Repair", description: "AC troubleshooting and repair", price: 899, icon: "🔧" },
      { id: 3, name: "AC Servicing", description: "Regular maintenance service", price: 599, icon: "🧽" },
      { id: 4, name: "Gas Refilling", description: "Refrigerant gas top-up", price: 1299, icon: "⛽" },
      { id: 5, name: "Compressor Repair", description: "AC compressor fixing", price: 1999, icon: "🔩" },
      { id: 6, name: "Filter Cleaning", description: "AC filter maintenance", price: 299, icon: "🧹" },
      { id: 7, name: "Thermostat Repair", description: "Temperature control fixing", price: 699, icon: "🌡️" },
      { id: 8, name: "Duct Cleaning", description: "Air duct cleaning service", price: 799, icon: "🌪️" }
    ]
  },
  cctv: {
    name: "CCTV & Security Systems",
    subServices: [
      { id: 1, name: "CCTV Installation", description: "Security camera setup", price: 3999, icon: "📹" },
      { id: 2, name: "DVR Setup", description: "Digital video recorder config", price: 1999, icon: "📱" },
      { id: 3, name: "Camera Repair", description: "Security camera fixing", price: 899, icon: "🔧" },
      { id: 4, name: "Alarm System", description: "Security alarm installation", price: 2499, icon: "🚨" },
      { id: 5, name: "Access Control", description: "Door access systems", price: 4999, icon: "🔐" },
      { id: 6, name: "Intercom System", description: "Communication system setup", price: 1799, icon: "📞" },
      { id: 7, name: "Motion Sensors", description: "Movement detection systems", price: 1299, icon: "👁️" },
      { id: 8, name: "Security Maintenance", description: "Regular system checkup", price: 699, icon: "🛡️" }
    ]
  },
  appliance: {
    name: "Home Appliance Repair",
    subServices: [
      { id: 1, name: "Washing Machine Repair", description: "Washer troubleshooting", price: 799, icon: "🧺" },
      { id: 2, name: "Refrigerator Repair", description: "Fridge cooling issues", price: 999, icon: "❄️" },
      { id: 3, name: "Microwave Repair", description: "Microwave oven fixing", price: 699, icon: "📱" },
      { id: 4, name: "Dishwasher Repair", description: "Dishwasher maintenance", price: 899, icon: "🍽️" },
      { id: 5, name: "Water Heater Repair", description: "Geyser and heater fixing", price: 799, icon: "🔥" },
      { id: 6, name: "Mixer Grinder Repair", description: "Kitchen appliance repair", price: 499, icon: "🥤" },
      { id: 7, name: "Iron Repair", description: "Clothing iron fixing", price: 299, icon: "👔" },
      { id: 8, name: "Vacuum Cleaner Repair", description: "Cleaning appliance repair", price: 599, icon: "🧹" }
    ]
  },
  plumber: {
    name: "Plumber Services",
    subServices: [
      { id: 1, name: "Pipe Repair", description: "Water pipe fixing", price: 599, icon: "🔧" },
      { id: 2, name: "Tap Installation", description: "Faucet fitting service", price: 399, icon: "🚿" },
      { id: 3, name: "Toilet Repair", description: "Bathroom fixture repair", price: 799, icon: "🚽" },
      { id: 4, name: "Drain Cleaning", description: "Blocked drain clearing", price: 699, icon: "🌊" },
      { id: 5, name: "Water Tank Cleaning", description: "Tank maintenance service", price: 1299, icon: "🪣" },
      { id: 6, name: "Bathroom Fitting", description: "Complete bathroom setup", price: 2999, icon: "🛁" },
      { id: 7, name: "Kitchen Plumbing", description: "Kitchen water solutions", price: 1599, icon: "🍽️" },
      { id: 8, name: "Water Pressure Fix", description: "Low pressure solutions", price: 899, icon: "💧" }
    ]
  },
  furniture: {
    name: "Furniture Services",
    subServices: [
      { id: 1, name: "Furniture Assembly", description: "Furniture setup service", price: 799, icon: "🪑" },
      { id: 2, name: "Sofa Repair", description: "Upholstery and frame repair", price: 1299, icon: "🛋️" },
      { id: 3, name: "Bed Assembly", description: "Bed frame installation", price: 699, icon: "🛏️" },
      { id: 4, name: "Wardrobe Installation", description: "Closet setup service", price: 1599, icon: "👗" },
      { id: 5, name: "Table Repair", description: "Dining and work table fixing", price: 599, icon: "🪑" },
      { id: 6, name: "Chair Repair", description: "Chair maintenance service", price: 399, icon: "💺" },
      { id: 7, name: "Custom Furniture", description: "Made-to-order furniture", price: 4999, icon: "🔨" },
      { id: 8, name: "Furniture Polish", description: "Wood polishing service", price: 899, icon: "✨" }
    ]
  },
  renovation: {
    name: "Home Renovation & Painting",
    subServices: [
      { id: 1, name: "Wall Painting", description: "Interior wall painting", price: 2999, icon: "🎨" },
      { id: 2, name: "Exterior Painting", description: "Outside wall painting", price: 4999, icon: "🏠" },
      { id: 3, name: "Ceiling Work", description: "Ceiling repair and paint", price: 1999, icon: "⬆️" },
      { id: 4, name: "Floor Renovation", description: "Flooring solutions", price: 5999, icon: "🏗️" },
      { id: 5, name: "Kitchen Renovation", description: "Complete kitchen makeover", price: 15999, icon: "🍽️" },
      { id: 6, name: "Bathroom Renovation", description: "Bathroom remodeling", price: 12999, icon: "🛁" },
      { id: 7, name: "Wallpaper Installation", description: "Decorative wall covering", price: 1599, icon: "📜" },
      { id: 8, name: "Texture Painting", description: "Decorative wall textures", price: 3999, icon: "🎭" }
    ]
  },
  roadside: {
    name: "On Roads Assistance",
    subServices: [
      { id: 1, name: "Car Breakdown", description: "Vehicle breakdown service", price: 1299, icon: "🚗" },
      { id: 2, name: "Tire Change", description: "Flat tire replacement", price: 599, icon: "🛞" },
      { id: 3, name: "Battery Jump Start", description: "Dead battery assistance", price: 499, icon: "🔋" },
      { id: 4, name: "Fuel Delivery", description: "Emergency fuel service", price: 799, icon: "⛽" },
      { id: 5, name: "Lockout Service", description: "Car key lockout help", price: 899, icon: "🔑" },
      { id: 6, name: "Towing Service", description: "Vehicle towing assistance", price: 1999, icon: "🚛" }
    ]
  },
  fabrication: {
    name: "Fabrication Projects",
    subServices: [
      { id: 1, name: "Metal Welding", description: "Steel and iron welding", price: 1299, icon: "🔥" },
      { id: 2, name: "Gate Fabrication", description: "Custom gate making", price: 4999, icon: "🚪" },
      { id: 3, name: "Railing Work", description: "Stair and balcony railings", price: 2999, icon: "🏗️" },
      { id: 4, name: "Window Grills", description: "Security window grills", price: 1999, icon: "🪟" },
      { id: 5, name: "Steel Structure", description: "Structural steel work", price: 7999, icon: "🏢" },
      { id: 6, name: "Metal Repair", description: "Metal item restoration", price: 899, icon: "🔧" },
      { id: 7, name: "Custom Fabrication", description: "Bespoke metal projects", price: 5999, icon: "⚒️" },
      { id: 8, name: "Aluminum Work", description: "Aluminum fabrication", price: 2499, icon: "🔩" }
    ]
  },
  manpower: {
    name: "Man Power Supply",
    subServices: [
      { id: 1, name: "Construction Workers", description: "Skilled construction labor", price: 1999, icon: "👷" },
      { id: 2, name: "Cleaning Staff", description: "Professional cleaning team", price: 899, icon: "🧹" },
      { id: 3, name: "Security Guards", description: "Trained security personnel", price: 2499, icon: "🛡️" },
      { id: 4, name: "Gardening Staff", description: "Landscaping professionals", price: 1299, icon: "🌱" },
      { id: 5, name: "Delivery Personnel", description: "Logistics and delivery team", price: 799, icon: "📦" },
      { id: 6, name: "Event Staff", description: "Event management team", price: 1599, icon: "🎪" },
      { id: 7, name: "Office Staff", description: "Administrative support", price: 1999, icon: "💼" },
      { id: 8, name: "Technical Staff", description: "Skilled technical workers", price: 2999, icon: "🔧" }
    ]
  },
  events: {
    name: "Event Management",
    subServices: [
      { id: 1, name: "Wedding Planning", description: "Complete wedding organization", price: 25999, icon: "💒" },
      { id: 2, name: "Birthday Parties", description: "Birthday celebration setup", price: 4999, icon: "🎂" },
      { id: 3, name: "Corporate Events", description: "Business event management", price: 15999, icon: "🏢" },
      { id: 4, name: "Catering Service", description: "Food and beverage service", price: 7999, icon: "🍽️" },
      { id: 5, name: "Decoration Setup", description: "Event decoration service", price: 3999, icon: "🎈" },
      { id: 6, name: "Sound & Lighting", description: "Audio visual equipment", price: 5999, icon: "🎵" },
      { id: 7, name: "Photography", description: "Professional event photography", price: 8999, icon: "📸" }
    ]
  }
};

let selectedServices = [];
let currentServiceCategory = '';
let bookingData = {};

// Open sub-services modal - now uses backend API
async function openSubServices(serviceId) {
  currentServiceCategory = serviceId;
  
  try {
    // Get service details
    const serviceResponse = await fetch('/api/services');
    const services = await serviceResponse.json();
    const service = services.find(s => s._id === serviceId);
    
    if (!service) {
      alert('Service not found');
      return;
    }
    
    // Get sub-services
    const subResponse = await fetch(`/api/sub-services/${serviceId}`);
    const subServices = await subResponse.json();
    
    if (!subServices || subServices.length === 0) {
      alert('No sub-services available for this service yet. Please contact admin to add sub-services.');
      return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'subServicesModal';
    
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 20px;">
            <div style="flex-shrink: 0;">
              <img src="images/handyman4.gif" alt="Animated handyman" width="100" height="70" style="border-radius: 8px; object-fit: cover;">
              </svg>
            </div>
            <h2 style="margin: 0;">${service.title}</h2>
          </div>
          <span class="close" onclick="closeModal('subServicesModal')">&times;</span>
        </div>
        <div class="modal-body">
          <div class="sub-services-grid">
            ${subServices.map(subService => `
              <div class="sub-service-card" data-id="${subService._id}" onclick="toggleSubService('${subService._id}')">
                <div class="service-icon">${subService.icon || '🔧'}</div>
                <h4>${subService.name}</h4>
                <p>${subService.description || ''}</p>
                <div class="price">₹${subService.price}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="selected-services" id="selectedServices" style="display: none;">
            <h3>Selected Services:</h3>
            <div id="selectedServicesList"></div>
            <div class="total-price" id="totalPrice">Total: ₹0</div>
          </div>
          
          <button class="book-now-btn" id="bookNowBtn" onclick="proceedToBooking()" disabled>
            Book Now
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Store current sub-services for selection
    window.currentSubServices = subServices;
    selectedServices = [];
    updateSelectedServices();
    
  } catch (error) {
    console.error('Error loading sub-services:', error);
    alert('Error loading sub-services. Please try again later.');
  }
}

// Toggle sub-service selection - now uses backend data
function toggleSubService(subServiceId) {
  const subService = window.currentSubServices.find(s => s._id === subServiceId);
  if (!subService) return;
  
  const card = document.querySelector(`[data-id="${subServiceId}"]`);
  const existingIndex = selectedServices.findIndex(s => s._id === subServiceId);
  
  if (existingIndex > -1) {
    selectedServices.splice(existingIndex, 1);
    card.classList.remove('selected');
  } else {
    selectedServices.push(subService);
    card.classList.add('selected');
  }
  
  updateSelectedServices();
}

// Update selected services display
function updateSelectedServices() {
  const selectedDiv = document.getElementById('selectedServices');
  const listDiv = document.getElementById('selectedServicesList');
  const totalDiv = document.getElementById('totalPrice');
  const bookBtn = document.getElementById('bookNowBtn');
  
  if (selectedServices.length === 0) {
    selectedDiv.style.display = 'none';
    bookBtn.disabled = true;
    return;
  }
  
  selectedDiv.style.display = 'block';
  bookBtn.disabled = false;
  
  const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
  
  listDiv.innerHTML = selectedServices.map(service => 
    `<div>${service.name} - ₹${service.price}</div>`
  ).join('');
  
  totalDiv.textContent = `Total: ₹${total}`;
}

// Proceed to booking - now uses backend data
async function proceedToBooking() {
  if (selectedServices.length === 0) return;
  
  try {
    // Get service name from backend
    const serviceResponse = await fetch('/api/services');
    const services = await serviceResponse.json();
    const service = services.find(s => s._id === currentServiceCategory);
    
    bookingData = {
      category: currentServiceCategory,
      categoryName: service ? service.title : 'Unknown Service',
      services: selectedServices,
      totalPrice: selectedServices.reduce((sum, service) => sum + (service.price || 0), 0)
    };
    
    closeModal('subServicesModal');
    openBookingModal();
  } catch (error) {
    console.error('Error proceeding to booking:', error);
    alert('Error proceeding to booking. Please try again.');
  }
}

// Open booking modal
function openBookingModal() {
  const modal = document.createElement('div');
  modal.className = 'modal booking-modal';
  modal.id = 'bookingModal';
  
  // Generate time slots
  const timeSlots = ['9:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00', '17:00-19:00'];
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Book Your Service</h2>
        <span class="close" onclick="closeModal('bookingModal')">&times;</span>
      </div>
      <div class="modal-body">
        <div class="booking-summary">
          <h3>${bookingData.categoryName}</h3>
          <div class="selected-services-summary">
            ${bookingData.services.map(s => `<div>${s.name} - ₹${s.price}</div>`).join('')}
          </div>
          <div class="total-price">Total: ₹${bookingData.totalPrice}</div>
        </div>
        
        <form id="bookingForm">
          <div class="form-group">
            <label for="customerName">Full Name *</label>
            <input type="text" id="customerName" required>
          </div>
          
          <div class="form-group">
            <label for="customerPhone">Phone Number *</label>
            <input type="tel" id="customerPhone" required>
          </div>
          
          <div class="form-group">
            <label for="customerEmail">Email Address *</label>
            <input type="email" id="customerEmail" required>
          </div>
          
          <div class="form-group">
            <label for="serviceDate">Select Date *</label>
            <input type="date" id="serviceDate" min="${new Date().toISOString().split('T')[0]}" required>
          </div>
          
          <div class="form-group">
            <label>Select Time Slot *</label>
            <div class="time-slots">
              ${timeSlots.map(slot => `
                <div class="time-slot" data-slot="${slot}" onclick="selectTimeSlot('${slot}')">
                  ${slot}
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="form-group">
            <label>Payment Method *</label>
            <div class="payment-methods">
              <div class="payment-method" data-method="upi" onclick="selectPaymentMethod('upi')">
                <i class="fas fa-mobile-alt"></i>
                <div>UPI</div>
              </div>
              <div class="payment-method" data-method="card" onclick="selectPaymentMethod('card')">
                <i class="fas fa-credit-card"></i>
                <div>Card</div>
              </div>
              <div class="payment-method" data-method="cod" onclick="selectPaymentMethod('cod')">
                <i class="fas fa-money-bill-wave"></i>
                <div>Cash on Delivery</div>
              </div>
            </div>
          </div>
          
          <button type="submit" class="book-now-btn">Confirm Booking</button>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.display = 'block';
  
  // Add form submit handler
  document.getElementById('bookingForm').addEventListener('submit', handleBookingSubmit);
}

// Select time slot
function selectTimeSlot(slot) {
  document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
  document.querySelector(`[data-slot="${slot}"]`).classList.add('selected');
  bookingData.timeSlot = slot;
}

// Select payment method
function selectPaymentMethod(method) {
  document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
  document.querySelector(`[data-method="${method}"]`).classList.add('selected');
  bookingData.paymentMethod = method;
}

// Handle booking form submission
async function handleBookingSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  
  bookingData.customerName = document.getElementById('customerName').value;
  bookingData.customerPhone = document.getElementById('customerPhone').value;
  bookingData.customerEmail = document.getElementById('customerEmail').value;
  bookingData.serviceDate = document.getElementById('serviceDate').value;
  
  if (!bookingData.timeSlot) {
    alert('Please select a time slot');
    return;
  }
  
  if (!bookingData.paymentMethod) {
    alert('Please select a payment method');
    return;
  }
  
  try {
    // Check slot availability
    const slotCheck = await fetch('/api/bookings/check-slot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: bookingData.serviceDate,
        timeSlot: bookingData.timeSlot
      })
    });
    
    const slotResult = await slotCheck.json();
    
    if (!slotResult.available) {
      alert('Selected time slot is not available. Please choose another slot.');
      return;
    }
    
    // Create booking
    const bookingResponse = await fetch('/api/bookings/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    
    const result = await bookingResponse.json();
    
    if (result.success) {
      closeModal('bookingModal');
      showBookingConfirmation(result.bookingId);
    } else {
      alert('Booking failed: ' + result.message);
    }
    
  } catch (error) {
    console.error('Booking error:', error);
    alert('Booking failed. Please try again.');
  }
}

// Show booking confirmation
function showBookingConfirmation(bookingId) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'confirmationModal';
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Booking Confirmed! 🎉</h2>
        <span class="close" onclick="closeModal('confirmationModal')">&times;</span>
      </div>
      <div class="modal-body">
        <div style="text-align: center; padding: 20px;">
          <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
          <h3>Your booking has been confirmed!</h3>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Service:</strong> ${bookingData.categoryName}</p>
          <p><strong>Date:</strong> ${bookingData.serviceDate}</p>
          <p><strong>Time:</strong> ${bookingData.timeSlot}</p>
          <p><strong>Total Amount:</strong> ₹${bookingData.totalPrice}</p>
          <p><strong>Payment Method:</strong> ${bookingData.paymentMethod.toUpperCase()}</p>
          
          <div style="margin-top: 30px;">
            <p>We will contact you shortly to confirm the appointment.</p>
            <p>Thank you for choosing our services!</p>
          </div>
          
          <button class="book-now-btn" onclick="closeModal('confirmationModal')" style="margin-top: 20px;">
            Close
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.display = 'block';
}

// Close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.remove();
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.remove();
  }
}