// Universal Quote System
document.addEventListener('DOMContentLoaded', function() {
    // Add quote form functionality to all quote forms
    const quoteForms = document.querySelectorAll('.quote-form, .contact-form');
    quoteForms.forEach(form => {
        // Remove any existing listeners to prevent duplicates
        form.removeEventListener('submit', handleQuoteSubmission);
        form.addEventListener('submit', handleQuoteSubmission);
    });
});

async function handleQuoteSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Prevent double submission
    if (form.dataset.submitting === 'true') {
        return;
    }
    form.dataset.submitting = 'true';
    
    const formData = new FormData(form);
    const quoteData = {
        name: formData.get('firstName') || formData.get('name') || form.querySelector('input[placeholder*="Name"]')?.value,
        email: formData.get('email') || form.querySelector('input[type="email"]')?.value,
        phone: formData.get('phone') || form.querySelector('input[type="tel"]')?.value,
        service: formData.get('service') || form.querySelector('select')?.value,
        message: formData.get('message') || form.querySelector('textarea')?.value,
        budget: formData.get('budget') || 'Not specified'
    };
    
    // Check if we're on service page
    const isServicePage = window.location.pathname.includes('service.html');
    const endpoint = isServicePage ? '/api/services/book' : '/api/quotes/submit';
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: quoteData.name,
                email: quoteData.email,
                phone: quoteData.phone,
                service: quoteData.service,
                requirements: quoteData.message,
                message: quoteData.message,
                budget: quoteData.budget
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            showUserConfirmation(quoteData);
            form.reset();
        } else {
            alert('Server error: ' + (result.message || 'Please try again'));
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('Network error: ' + error.message);
    } finally {
        // Reset submission flag
        form.dataset.submitting = 'false';
    }
}

function generateQuoteId() {
    return 'QT' + Date.now().toString().slice(-6);
}



function showUserConfirmation(quoteData) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;overflow:hidden;">
            <div style="background:white;padding:30px;border-radius:10px;max-width:500px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.3);">
                <div style="font-size:3rem;margin-bottom:20px;">🎉</div>
                <h2 style="color:#333;margin-bottom:15px;">Quote Request Received!</h2>
                <p style="color:#666;margin-bottom:20px;">Thank you ${quoteData.name}! Your quote request has been submitted successfully.</p>
                <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:20px;text-align:left;">
                    <p><strong>Service:</strong> ${quoteData.service}</p>
                    <p><strong>Contact:</strong> ${quoteData.phone}</p>
                    <p><strong>Next Steps:</strong></p>
                    <ul style="margin:10px 0;padding-left:20px;">
                        <li>We'll call you within 2 hours</li>
                        <li>Free site inspection scheduled</li>
                        <li>Detailed quote provided within 24 hours</li>
                    </ul>
                </div>
                <button onclick="closeModal(this)" style="background:#ffd700;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;font-weight:600;">Got it!</button>
            </div>
        </div>
    `;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    document.body.appendChild(modal);
    
    // Add close function
    window.closeModal = function(button) {
        document.body.style.overflow = 'auto';
        button.parentElement.parentElement.remove();
        delete window.closeModal;
    };
}

function notifyAdmin(quoteData) {
    // Direct WhatsApp notification
    const message = `🏠 NEW QUOTE REQUEST #${quoteData.id}

👤 Name: ${quoteData.name}
📞 Phone: ${quoteData.phone}
📧 Email: ${quoteData.email}
🔧 Service: ${quoteData.service}
💰 Budget: ${quoteData.budget}
📝 Details: ${quoteData.message}
⏰ Time: ${new Date(quoteData.timestamp).toLocaleString()}

Please contact customer within 2 hours!`;
    
    window.open(`https://wa.me/918849081439?text=${encodeURIComponent(message)}`);
}