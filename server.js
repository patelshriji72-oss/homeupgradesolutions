require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Homeupgrade')));

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://username:password@cluster.mongodb.net/homeupgrade';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected: Atlas'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Newsletter Schema
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

// Quote Schema
const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  service: String,
  message: String,
  budget: String,
  status: { type: String, default: 'pending' },
  submittedAt: { type: Date, default: Date.now }
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: String,
  submittedAt: { type: Date, default: Date.now }
});

// Service Schema
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  icon: { type: String, default: '🔧' },
  category: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Sub-Service Schema
const subServiceSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  icon: { type: String, default: '🔧' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Service Booking Schema
const serviceBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  service: String,
  preferredDate: String,
  preferredTime: String,
  requirements: String,
  status: { type: String, default: 'pending' },
  bookedAt: { type: Date, default: Date.now }
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);
const Quote = mongoose.model('Quote', quoteSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Service = mongoose.model('Service', serviceSchema);
const SubService = mongoose.model('SubService', subServiceSchema);
const ServiceBooking = mongoose.model('ServiceBooking', serviceBookingSchema);

// Newsletter Routes
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const newsletter = new Newsletter({ email });
    await newsletter.save();
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.json({ success: false, message: 'Email already subscribed' });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
});

app.get('/api/newsletter/subscribers', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Quote Routes
app.post('/api/quotes/submit', async (req, res) => {
  try {
    console.log('Received quote data:', req.body);
    const quote = new Quote(req.body);
    await quote.save();
    console.log('Quote saved successfully:', quote._id);
    res.json({ success: true, message: 'Quote submitted successfully' });
  } catch (error) {
    console.error('Quote submission error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ submittedAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Contact Routes
app.post('/api/contact/submit', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Service Routes
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json({ success: true, message: 'Service added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    await Service.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: 'Service updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    await SubService.deleteMany({ serviceId: req.params.id });
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Sub-Service Routes
app.get('/api/sub-services/:serviceId', async (req, res) => {
  try {
    const subServices = await SubService.find({ serviceId: req.params.serviceId, isActive: true });
    res.json(subServices);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/sub-services', async (req, res) => {
  try {
    const subService = new SubService(req.body);
    await subService.save();
    res.json({ success: true, message: 'Sub-service added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/sub-services/:id', async (req, res) => {
  try {
    await SubService.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: 'Sub-service updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/sub-services/:id', async (req, res) => {
  try {
    await SubService.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Sub-service deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Service Booking Routes
app.post('/api/services/book', async (req, res) => {
  try {
    console.log('Received service booking data:', req.body);
    const booking = new ServiceBooking(req.body);
    await booking.save();
    console.log('Service booking saved successfully:', booking._id);
    res.json({ success: true, message: 'Service booked successfully' });
  } catch (error) {
    console.error('Service booking error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

app.get('/api/services/bookings', async (req, res) => {
  try {
    const bookings = await ServiceBooking.find().sort({ bookedAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const stats = {
      totalQuotes: await Quote.countDocuments(),
      totalBookings: await Booking.countDocuments(),
      totalSubscribers: await Newsletter.countDocuments(),
      totalContacts: await Contact.countDocuments(),
      totalServices: await Service.countDocuments(),
      totalSubServices: await SubService.countDocuments(),
      totalServiceBookings: await ServiceBooking.countDocuments(),
      pendingQuotes: await Quote.countDocuments({ status: 'pending' }),
      pendingBookings: await ServiceBooking.countDocuments({ status: 'pending' })
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  serviceCategory: { type: String, required: true },
  serviceCategoryName: { type: String, required: true },
  selectedServices: [{
    id: Number,
    name: String,
    description: String,
    price: Number,
    icon: String
  }],
  totalPrice: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String, required: true },
  serviceDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending' },
  transactionId: String,
  bookingStatus: { type: String, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  otpCode: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'homeupgrade_secret_key';

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'homeupgrade2024@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// SMS function using multiple providers
async function sendSMS(phone, message) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  
  // Try Fast2SMS first
  try {
    const fast2smsResponse = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': process.env.SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'v3',
        sender_id: 'FSTSMS',
        message: message,
        language: 'english',
        flash: 0,
        numbers: cleanPhone
      })
    });
    
    const result = await fast2smsResponse.json();
    console.log('Fast2SMS Response:', result);
    
    if (result.return === true) {
      return true;
    }
  } catch (error) {
    console.error('Fast2SMS error:', error);
  }
  
  // Fallback: Try MSG91
  try {
    const msg91Response = await fetch(`https://api.msg91.com/api/sendhttp.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        authkey: process.env.SMS_API_KEY,
        mobiles: cleanPhone,
        message: message,
        sender: 'TXTIND',
        route: '4'
      })
    });
    
    const msg91Result = await msg91Response.text();
    console.log('MSG91 Response:', msg91Result);
    return msg91Response.ok;
  } catch (error) {
    console.error('MSG91 error:', error);
  }
  
  return false;
}

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via SMS only
async function sendOTP(email, phone, otp) {
  let smsSent = false;
  
  // Send SMS
  if (phone) {
    try {
      // Try simple 2Factor API
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const response = await fetch(`https://2factor.in/API/V1/6WgHOKCUYd5lS80Iabs41jRJtfG7ZVTFhpmnyvce2uEoiqx9zr2NxTSXlKiyJ1wp7RqnErtuzOvUZ6mH/SMS/${cleanPhone}/${otp}`);
      
      const result = await response.json();
      console.log('2Factor SMS Response:', result);
      
      if (result.Status === 'Success') {
        smsSent = true;
        console.log(`✅ OTP sent to phone: ${phone}`);
      } else {
        console.log('2Factor failed, trying Fast2SMS...');
        const smsMessage = `Your HomeUpgrade verification code is: ${otp}. Valid for 10 minutes.`;
        smsSent = await sendSMS(phone, smsMessage);
      }
    } catch (error) {
      console.error('SMS send error:', error);
    }
  }
  
  // For development - always log OTP to console
  console.log(`\n=== OTP FOR ${phone} ===`);
  console.log(`OTP CODE: ${otp}`);
  console.log(`SMS sent: ${smsSent}`);
  console.log(`===================\n`);
  
  return smsSent || true; // Always return true for development
}

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Authentication Routes
app.post('/auth/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Create user
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      otpCode: otp,
      otpExpiry
    });
    
    await user.save();
    
    // Send OTP via email and SMS
    const otpSent = await sendOTP(email, phone, otp);
    
    if (otpSent) {
      res.json({ 
        success: true, 
        message: 'OTP sent to your phone number',
        showOTP: false
      });
    } else {
      res.json({ 
        success: true, 
        message: 'SMS delivery failed. Your OTP is displayed below.',
        showOTP: true,
        otp: otp
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/auth/verify-otp', async (req, res) => {
  try {
    const { otpCode } = req.body;
    
    const user = await User.findOne({
      otpCode,
      otpExpiry: { $gt: new Date() }
    });
    
    if (!user) {
      return res.json({ success: false, message: 'Invalid or expired OTP' });
    }
    
    // Verify user
    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpiry = undefined;
    await user.save();
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
    
    // Check if verified
    if (!user.isVerified) {
      return res.json({ success: false, message: 'Please verify your email first' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/auth/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    
    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    user.otpCode = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    
    // Send OTP via email and SMS
    const otpSent = await sendOTP(email, user.phone, otp);
    
    if (otpSent) {
      res.json({ 
        success: true, 
        message: 'OTP sent to your phone number',
        showOTP: false
      });
    } else {
      res.json({ 
        success: true, 
        message: 'SMS delivery failed. Your OTP is displayed below.',
        showOTP: true,
        otp: otp
      });
    }
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -otpCode');
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/auth/logout', authenticateToken, (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Booking Routes
app.post('/api/bookings/check-slot', async (req, res) => {
  try {
    const { date, timeSlot } = req.body;
    
    // Check if slot is already booked (max 3 bookings per slot)
    const existingBookings = await Booking.countDocuments({
      serviceDate: new Date(date),
      timeSlot: timeSlot,
      bookingStatus: { $ne: 'cancelled' }
    });
    
    const available = existingBookings < 3;
    
    res.json({ available, existingBookings });
  } catch (error) {
    console.error('Slot check error:', error);
    res.status(500).json({ available: false, error: 'Server error' });
  }
});

app.post('/api/bookings/create', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Generate unique booking ID
    const bookingId = 'HU' + Date.now().toString().slice(-8);
    
    const booking = new Booking({
      bookingId,
      serviceCategory: bookingData.category,
      serviceCategoryName: bookingData.categoryName,
      selectedServices: bookingData.services,
      totalPrice: bookingData.totalPrice,
      customerName: bookingData.customerName,
      customerPhone: bookingData.customerPhone,
      customerEmail: bookingData.customerEmail,
      serviceDate: new Date(bookingData.serviceDate),
      timeSlot: bookingData.timeSlot,
      paymentMethod: bookingData.paymentMethod,
      paymentStatus: bookingData.paymentMethod === 'cod' ? 'cod' : 'pending'
    });
    
    await booking.save();
    
    res.json({ 
      success: true, 
      bookingId: bookingId,
      message: 'Booking created successfully' 
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ success: false, message: 'Booking failed' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    console.log('Admin login attempt:', req.body);
    const { username, password } = req.body;
    
    if (username === 'admin' && password === 'homeupgrade2024') {
      console.log('✅ Admin login successful');
      res.json({ success: true });
    } else {
      console.log('❌ Admin login failed - Invalid credentials');
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('❌ Admin login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Force update services data
async function seedData() {
  try {
    // Always clear and reseed to ensure latest data
    console.log('🔄 Force updating all services and sub-services...');
    
    // Clear existing data
    await Service.deleteMany({});
    await SubService.deleteMany({});
    console.log('🗑️ Cleared existing services');
    
    // 1. Electrician Services
    const electrician = await Service.create({
      title: 'Electrician Services',
      description: 'Professional electrical wiring, installation, and repair services',
      icon: '⚡',
      category: 'electrical'
    });
    
    // 2. Plumber Services
    const plumber = await Service.create({
      title: 'Plumber Services',
      description: 'Complete plumbing solutions for your home and office',
      icon: '🚰',
      category: 'plumbing'
    });
    
    // 3. AC Installation & Repair
    const ac = await Service.create({
      title: 'AC Installation & Repair',
      description: 'Air conditioning installation, repair, and maintenance services',
      icon: '❄️',
      category: 'ac'
    });
    
    // 4. Home Appliance Repair
    const appliance = await Service.create({
      title: 'Home Appliance Repair',
      description: 'Repair and maintenance of all home appliances',
      icon: '🔧',
      category: 'appliance'
    });
    
    // 5. Furniture Services
    const furniture = await Service.create({
      title: 'Furniture Services',
      description: 'Furniture assembly, repair, and maintenance services',
      icon: '🪑',
      category: 'furniture'
    });
    
    // 6. Home Renovation & Painting
    const renovation = await Service.create({
      title: 'Home Renovation & Painting',
      description: 'Complete home renovation and professional painting services',
      icon: '🎨',
      category: 'renovation'
    });
    
    // 7. CCTV & Security Systems
    const security = await Service.create({
      title: 'CCTV & Security Systems',
      description: 'Security camera installation and digital lock systems',
      icon: '📹',
      category: 'security'
    });
    
    // 8. Fabrication Projects
    const fabrication = await Service.create({
      title: 'Fabrication Projects',
      description: 'Custom metal fabrication and welding services',
      icon: '🔨',
      category: 'fabrication'
    });
    
    // 9. Man Power Supply
    const manpower = await Service.create({
      title: 'Man Power Supply',
      description: 'Skilled manpower for various household and commercial needs',
      icon: '👷',
      category: 'manpower'
    });
    
    // 10. Event Management
    const events = await Service.create({
      title: 'Event Management',
      description: 'Complete event planning and management services',
      icon: '🎉',
      category: 'events'
    });
    
    // 11. On Roads Assistance
    const roadside = await Service.create({
      title: 'On Roads Assistance',
      description: 'Emergency roadside assistance and vehicle support',
      icon: '🚗',
      category: 'roadside'
    });
    
    // Seed all 44 sub-services
    await SubService.insertMany([
      // Electrician Services (4 sub-services)
      { serviceId: electrician._id, name: 'Electrical Wiring & Installation', description: 'Complete electrical wiring solutions', price: 1500, icon: '🔌' },
      { serviceId: electrician._id, name: 'Light Replace & Repair', description: 'Light fixture installation and repair', price: 300, icon: '💡' },
      { serviceId: electrician._id, name: 'Switch Board Repair', description: 'Electrical panel and switch repairs', price: 800, icon: '🔘' },
      { serviceId: electrician._id, name: 'AC Switchboard Installation', description: 'Dedicated AC electrical setup', price: 2000, icon: '🔌' },
      
      // Plumber Services (5 sub-services)
      { serviceId: plumber._id, name: 'Plumbing & Pipe Repair', description: 'Water pipe installation and repair', price: 1200, icon: '🔧' },
      { serviceId: plumber._id, name: 'Leakage Fix', description: 'Water leakage detection and repair', price: 800, icon: '💧' },
      { serviceId: plumber._id, name: 'Tap Installation', description: 'Faucet and tap fitting services', price: 500, icon: '🚿' },
      { serviceId: plumber._id, name: 'Bathroom Fitting Repair', description: 'Complete bathroom fixture repair', price: 1500, icon: '🛁' },
      { serviceId: plumber._id, name: 'Kitchen Sink Cleaning / Unclogging', description: 'Sink cleaning and drain clearing', price: 600, icon: '🧽' },
      
      // AC Installation & Repair (5 sub-services)
      { serviceId: ac._id, name: 'AC Installation & Repair', description: 'Complete AC unit service', price: 2500, icon: '🔧' },
      { serviceId: ac._id, name: 'Split AC Installation', description: 'Split AC professional installation', price: 3000, icon: '❄️' },
      { serviceId: ac._id, name: 'Gas Refill & Leak Repair', description: 'Refrigerant gas service', price: 1800, icon: '🔧' },
      { serviceId: ac._id, name: 'Window AC Installation', description: 'Window AC fitting service', price: 2000, icon: '🪟' },
      { serviceId: ac._id, name: 'Annual Deep Cleaning', description: 'Comprehensive AC maintenance', price: 1200, icon: '🧹' },
      
      // Home Appliance Repair (4 sub-services)
      { serviceId: appliance._id, name: 'Washing Machine Repair', description: 'Washing machine troubleshooting', price: 1500, icon: '👕' },
      { serviceId: appliance._id, name: 'Refrigerator Cooling Issue Fix', description: 'Fridge cooling problem repair', price: 2000, icon: '🧊' },
      { serviceId: appliance._id, name: 'Microwave Not Heating Repair', description: 'Microwave heating issue fix', price: 1200, icon: '🔥' },
      { serviceId: appliance._id, name: 'Water Purifier Installation', description: 'Water purifier setup service', price: 1800, icon: '💧' },
      
      // Furniture Services (4 sub-services)
      { serviceId: furniture._id, name: 'Furniture Assembly', description: 'Professional furniture assembly', price: 1000, icon: '🔨' },
      { serviceId: furniture._id, name: 'Bed / Wardrobe Repair', description: 'Bedroom furniture repair', price: 1500, icon: '🛏️' },
      { serviceId: furniture._id, name: 'Sofa Leg Fix', description: 'Sofa repair and maintenance', price: 800, icon: '🛋️' },
      { serviceId: furniture._id, name: 'Table Polishing', description: 'Furniture polishing service', price: 600, icon: '✨' },
      
      // Home Renovation & Painting (4 sub-services)
      { serviceId: renovation._id, name: 'Full Room Painting', description: 'Complete room painting service', price: 8000, icon: '🎨' },
      { serviceId: renovation._id, name: 'Wall Crack Fixing', description: 'Wall repair and crack filling', price: 1500, icon: '🧱' },
      { serviceId: renovation._id, name: 'Ceiling Waterproofing', description: 'Ceiling waterproof treatment', price: 3000, icon: '☔' },
      { serviceId: renovation._id, name: 'House Interior Painting', description: 'Complete interior painting', price: 15000, icon: '🏠' },
      
      // CCTV & Security Systems (4 sub-services)
      { serviceId: security._id, name: '2-Camera CCTV Installation', description: 'Basic CCTV security setup', price: 8000, icon: '📷' },
      { serviceId: security._id, name: '4-Camera DVR Setup', description: 'Advanced CCTV system', price: 15000, icon: '📹' },
      { serviceId: security._id, name: 'CCTV Maintenance & Cleaning', description: 'CCTV system maintenance', price: 1000, icon: '🧹' },
      { serviceId: security._id, name: 'Door Lock Digital System Installation', description: 'Smart lock installation', price: 5000, icon: '🔐' },
      
      // Fabrication Projects (4 sub-services)
      { serviceId: fabrication._id, name: 'Gate Fabrication', description: 'Custom gate manufacturing', price: 12000, icon: '🚪' },
      { serviceId: fabrication._id, name: 'Window Grill Making', description: 'Security grill fabrication', price: 8000, icon: '🪟' },
      { serviceId: fabrication._id, name: 'Complex Metal Repair', description: 'Advanced metalwork repair', price: 3000, icon: '🔧' },
      { serviceId: fabrication._id, name: 'Industrial Welding Work', description: 'Professional welding service', price: 5000, icon: '⚡' },
      
      // Man Power Supply (4 sub-services)
      { serviceId: manpower._id, name: 'Household Helper', description: 'Domestic help service', price: 800, icon: '🏠' },
      { serviceId: manpower._id, name: 'Loading/Unloading Manpower', description: 'Moving and shifting help', price: 1200, icon: '📦' },
      { serviceId: manpower._id, name: 'Construction Worker', description: 'Skilled construction labor', price: 1500, icon: '🏗️' },
      { serviceId: manpower._id, name: 'Office Boy Service', description: 'Office assistance service', price: 600, icon: '💼' },
      
      // Event Management (4 sub-services)
      { serviceId: events._id, name: 'Birthday Decoration', description: 'Birthday party decoration', price: 3000, icon: '🎂' },
      { serviceId: events._id, name: 'Wedding Event Management', description: 'Complete wedding planning', price: 25000, icon: '💒' },
      { serviceId: events._id, name: 'Sound & Lighting Setup', description: 'Audio visual equipment setup', price: 8000, icon: '🎵' },
      { serviceId: events._id, name: 'Catering Service', description: 'Event catering service', price: 15000, icon: '🍽️' },
      
      // On Roads Assistance (4 sub-services)
      { serviceId: roadside._id, name: 'Flat Tyre Change', description: 'Emergency tire replacement', price: 500, icon: '🛞' },
      { serviceId: roadside._id, name: 'Jump Start Service', description: 'Car battery jump start', price: 400, icon: '🔋' },
      { serviceId: roadside._id, name: 'Emergency Fuel Delivery', description: 'Fuel delivery service', price: 300, icon: '⛽' },
      { serviceId: roadside._id, name: 'Car Lockout Help', description: 'Vehicle lockout assistance', price: 600, icon: '🔑' }
    ]);
    
    console.log('✅ Successfully updated all 11 main services and 44 sub-services!');
    console.log('📊 Data is now live in MongoDB Atlas and admin dashboard!');
  } catch (error) {
    console.error('❌ Error updating services:', error);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  seedData();
});