const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/homeupgrade', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schemas
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

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

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: String,
  submittedAt: { type: Date, default: Date.now }
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);
const Quote = mongoose.model('Quote', quoteSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Insert test data
async function insertTestData() {
  try {
    // Test newsletter
    await Newsletter.create({
      email: 'test@example.com'
    });

    // Test quote
    await Quote.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      service: 'Plumbing',
      message: 'Need bathroom renovation',
      budget: '50000-100000'
    });

    // Test contact
    await Contact.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543211',
      subject: 'Service Inquiry',
      message: 'I need electrical work done'
    });

    console.log('Test data inserted successfully!');
    console.log('Check MongoDB Compass at: mongodb://localhost:27017');
    console.log('Database: homeupgrade');
    
  } catch (error) {
    console.error('Error inserting test data:', error);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  insertTestData();
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});