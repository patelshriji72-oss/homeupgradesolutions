const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/homeupgrade', {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

const ServiceBooking = mongoose.model('ServiceBooking', serviceBookingSchema);

async function testServiceBooking() {
  try {
    // Test data
    const testBooking = {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '1234567890',
      service: 'electrical',
      preferredDate: '2024-01-15',
      preferredTime: 'morning',
      requirements: 'Need electrical outlet installation'
    };

    console.log('Creating test service booking...');
    const booking = new ServiceBooking(testBooking);
    await booking.save();
    console.log('✅ Service booking saved successfully:', booking._id);

    // Fetch all bookings
    const allBookings = await ServiceBooking.find();
    console.log('📋 Total service bookings:', allBookings.length);
    
    console.log('🎉 Service booking system is working correctly!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testServiceBooking();