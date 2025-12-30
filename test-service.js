const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/homeupgrade');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: String,
  category: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Service = mongoose.model('Service', serviceSchema);

async function testService() {
  try {
    // Add a test service
    const service = new Service({
      title: 'Test Electrical Service',
      description: 'Professional electrical repairs and installations',
      price: '₹500-2000',
      category: 'Electrical'
    });
    
    await service.save();
    console.log('✅ Service added successfully!');
    
    // Check all services
    const services = await Service.find();
    console.log(`📊 Total services: ${services.length}`);
    
    if (services.length > 0) {
      console.log('📋 Latest service:');
      console.log(services[services.length - 1]);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connection.on('connected', () => {
  console.log('🔗 Connected to MongoDB');
  testService();
});