const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/homeupgrade');

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

async function checkData() {
  try {
    const quotes = await Quote.find();
    const newsletters = await Newsletter.find();
    const contacts = await Contact.find();
    
    console.log('=== DATABASE DATA ===');
    console.log(`Quotes: ${quotes.length} records`);
    console.log(`Newsletters: ${newsletters.length} records`);
    console.log(`Contacts: ${contacts.length} records`);
    
    if (quotes.length > 0) {
      console.log('\n--- Latest Quote ---');
      console.log(quotes[quotes.length - 1]);
    }
    
    if (newsletters.length > 0) {
      console.log('\n--- Latest Newsletter ---');
      console.log(newsletters[newsletters.length - 1]);
    }
    
    if (contacts.length > 0) {
      console.log('\n--- Latest Contact ---');
      console.log(contacts[contacts.length - 1]);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  checkData();
});