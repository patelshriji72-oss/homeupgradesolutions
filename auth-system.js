// Authentication System
let currentUser = null;

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');
    if (token) {
        validateToken(token);
    }
});

// Open authentication modal
function openAuthModal(type) {
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.id = 'authModal';
    
    if (type === 'signin') {
        modal.innerHTML = createSignInModal();
    } else if (type === 'signup') {
        modal.innerHTML = createSignUpModal();
    }
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Create Sign In Modal
function createSignInModal() {
    return `
        <div class="auth-modal-content">
            <div class="auth-header">
                <h2>Sign In</h2>
                <span class="auth-close" onclick="closeAuthModal()">&times;</span>
            </div>
            <div class="auth-body">
                <form id="signinForm">
                    <div class="auth-form-group">
                        <label for="signinEmail">Email or Phone</label>
                        <input type="text" id="signinEmail" required>
                    </div>
                    
                    <div class="auth-form-group">
                        <label for="signinPassword">Password</label>
                        <input type="password" id="signinPassword" required>
                    </div>
                    
                    <button type="submit" class="auth-btn">Sign In</button>
                </form>
                
                <div class="auth-footer">
                    <p>Don't have an account? <a href="#" onclick="switchAuthModal('signup')">Sign Up</a></p>
                </div>
            </div>
        </div>
    `;
}

// Create Sign Up Modal
function createSignUpModal() {
    return `
        <div class="auth-modal-content">
            <div class="auth-header">
                <h2>Sign Up</h2>
                <span class="auth-close" onclick="closeAuthModal()">&times;</span>
            </div>
            <div class="auth-body">
                <form id="signupForm">
                    <div class="auth-form-group">
                        <label for="signupName">Full Name</label>
                        <input type="text" id="signupName" required>
                    </div>
                    
                    <div class="auth-form-group">
                        <label for="signupEmail">Email</label>
                        <input type="email" id="signupEmail" required>
                    </div>
                    
                    <div class="auth-form-group">
                        <label for="signupPhone">Phone Number</label>
                        <input type="tel" id="signupPhone" required>
                    </div>
                    
                    <div class="auth-form-group">
                        <label for="signupPassword">Password</label>
                        <input type="password" id="signupPassword" required>
                    </div>
                    
                    <div class="auth-form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" required>
                    </div>
                    
                    <button type="submit" class="auth-btn">Sign Up</button>
                </form>
                
                <div class="auth-footer">
                    <p>Already have an account? <a href="#" onclick="switchAuthModal('signin')">Sign In</a></p>
                </div>
            </div>
        </div>
    `;
}

// Create OTP Modal
function createOTPModal(email) {
    return `
        <div class="auth-modal-content">
            <div class="auth-header">
                <h2>Verify OTP</h2>
                <span class="auth-close" onclick="closeAuthModal()">&times;</span>
            </div>
            <div class="auth-body">
                <p>Enter the 6-digit code sent to ${email}</p>
                <form id="otpForm">
                    <div class="auth-form-group">
                        <label for="otpCode">OTP Code</label>
                        <input type="text" id="otpCode" maxlength="6" required>
                    </div>
                    
                    <button type="submit" class="auth-btn">Verify</button>
                    <button type="button" class="auth-btn-secondary" onclick="resendOTP('${email}')">Resend OTP</button>
                </form>
            </div>
        </div>
    `;
}

// Switch between auth modals
function switchAuthModal(type) {
    closeAuthModal();
    setTimeout(() => openAuthModal(type), 100);
}

// Close auth modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.remove();
    }
}

// Handle form submissions
document.addEventListener('submit', async function(e) {
    if (e.target.id === 'signinForm') {
        e.preventDefault();
        await handleSignIn(e.target);
    } else if (e.target.id === 'signupForm') {
        e.preventDefault();
        await handleSignUp(e.target);
    } else if (e.target.id === 'otpForm') {
        e.preventDefault();
        await handleOTPVerification(e.target);
    }
});

// Handle Sign In
async function handleSignIn(form) {
    const formData = new FormData(form);
    const data = {
        email: document.getElementById('signinEmail').value,
        password: document.getElementById('signinPassword').value
    };
    
    try {
        const response = await fetch('/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            localStorage.setItem('authToken', result.token);
            currentUser = result.user;
            updateNavbarForLoggedInUser();
            closeAuthModal();
            showSuccessMessage('Signed in successfully!');
        } else {
            showErrorMessage(result.message || 'Sign in failed');
        }
    } catch (error) {
        showErrorMessage('Network error. Please try again.');
    }
}

// Handle Sign Up
async function handleSignUp(form) {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match');
        return;
    }
    
    const data = {
        name: document.getElementById('signupName').value,
        email: document.getElementById('signupEmail').value,
        phone: document.getElementById('signupPhone').value,
        password: password
    };
    
    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show OTP modal
            document.getElementById('authModal').innerHTML = createOTPModal(data.phone);
            
            if (result.showOTP) {
                // Show OTP on screen when SMS fails
                showOTPOnScreen(result.otp, data.phone);
            } else {
                showSuccessMessage(result.message);
            }
        } else {
            showErrorMessage(result.message || 'Sign up failed');
        }
    } catch (error) {
        showErrorMessage('Network error. Please try again.');
    }
}

// Handle OTP Verification
async function handleOTPVerification(form) {
    const otpCode = document.getElementById('otpCode').value;
    
    try {
        const response = await fetch('/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otpCode })
        });
        
        const result = await response.json();
        
        if (result.success) {
            localStorage.setItem('authToken', result.token);
            currentUser = result.user;
            updateNavbarForLoggedInUser();
            closeAuthModal();
            showSuccessMessage('Account verified successfully!');
        } else {
            showErrorMessage(result.message || 'Invalid OTP');
        }
    } catch (error) {
        showErrorMessage('Network error. Please try again.');
    }
}

// Resend OTP
async function resendOTP(email) {
    try {
        const response = await fetch('/auth/resend-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showSuccessMessage('OTP resent successfully');
        } else {
            showErrorMessage(result.message || 'Failed to resend OTP');
        }
    } catch (error) {
        showErrorMessage('Network error. Please try again.');
    }
}

// Validate token
async function validateToken(token) {
    try {
        const response = await fetch('/auth/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const result = await response.json();
            currentUser = result.user;
            updateNavbarForLoggedInUser();
        } else {
            localStorage.removeItem('authToken');
        }
    } catch (error) {
        localStorage.removeItem('authToken');
    }
}

// Update navbar for logged in user
function updateNavbarForLoggedInUser() {
    const authButtons = document.querySelector('.auth-buttons');
    const mobileAuth = document.querySelectorAll('.mobile-auth');
    
    if (authButtons && currentUser) {
        authButtons.innerHTML = `
            <div class="user-profile">
                <span class="user-name">Hi, ${currentUser.name}</span>
                <button onclick="logout()" class="logout-btn">Logout</button>
            </div>
        `;
    }
    
    // Hide mobile auth buttons
    mobileAuth.forEach(el => el.style.display = 'none');
}

// Logout
async function logout() {
    try {
        await fetch('/auth/logout', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
    
    localStorage.removeItem('authToken');
    currentUser = null;
    location.reload();
}

// Show success message
function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Show error message
function showErrorMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'toast error';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Show OTP on screen when SMS fails
function showOTPOnScreen(otp, phone) {
    const otpDisplay = document.createElement('div');
    otpDisplay.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 10001; text-align: center; border: 3px solid #ffd700;">
            <h3 style="color: #333; margin-bottom: 15px;">SMS Delivery Failed</h3>
            <p style="color: #666; margin-bottom: 20px;">Your OTP for ${phone}:</p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h1 style="color: #ffd700; font-size: 36px; margin: 0; letter-spacing: 5px;">${otp}</h1>
            </div>
            <p style="color: #999; font-size: 12px; margin-bottom: 20px;">Valid for 10 minutes</p>
            <button onclick="this.parentElement.remove()" style="background: #ffd700; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: 600;">Got it!</button>
        </div>
    `;
    
    document.body.appendChild(otpDisplay);
    
    // Auto remove after 2 minutes
    setTimeout(() => {
        if (otpDisplay.parentNode) {
            otpDisplay.remove();
        }
    }, 120000);
}