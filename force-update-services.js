require('dotenv').config();
const mongoose = require('mongoose');

// Service Schema
const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    icon: { type: String, default: '🔧' },
    category: String,
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// SubService Schema
const subServiceSchema = new mongoose.Schema({
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    icon: { type: String, default: '🔧' },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Service = mongoose.model('Service', serviceSchema);
const SubService = mongoose.model('SubService', subServiceSchema);

async function forceUpdateServices() {
    try {
        // Connect to MongoDB Atlas
        const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shreyaa_db_user:SHReya@1108@shr.z0ybnen.mongodb.net/homeupgrade?retryWrites=true&w=majority&appName=SHR';
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas');

        // FORCE DELETE all existing services and sub-services
        await Service.deleteMany({});
        await SubService.deleteMany({});
        console.log('🗑️ Cleared all existing services and sub-services');

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

        console.log('✅ Created all 11 main services');

        // Add all 44 sub-services
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

        console.log('✅ Added all 44 sub-services');

        // Verify the data
        const serviceCount = await Service.countDocuments();
        const subServiceCount = await SubService.countDocuments();
        
        console.log('\n🎉 FORCE UPDATE COMPLETED!');
        console.log(`📊 Total Services: ${serviceCount}`);
        console.log(`📊 Total Sub-Services: ${subServiceCount}`);
        console.log('🔄 Your MongoDB Atlas database has been updated!');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating services:', error);
        process.exit(1);
    }
}

forceUpdateServices();