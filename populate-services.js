const mongoose = require('mongoose');
require('dotenv').config();

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

// Services data
const servicesData = [
    {
        title: "Electrician Services",
        description: "Professional electrical wiring, installation, and repair services",
        icon: "⚡",
        category: "electrical",
        subServices: [
            { name: "Electrical Wiring & Installation", price: 1500, icon: "🔌" },
            { name: "Light Replace & Repair", price: 300, icon: "💡" },
            { name: "Switch Board Repair", price: 800, icon: "🔘" },
            { name: "AC Switchboard Installation", price: 2000, icon: "🔌" }
        ]
    },
    {
        title: "Plumber Services",
        description: "Complete plumbing solutions for your home and office",
        icon: "🚰",
        category: "plumbing",
        subServices: [
            { name: "Plumbing & Pipe Repair", price: 1200, icon: "🔧" },
            { name: "Leakage Fix", price: 800, icon: "💧" },
            { name: "Tap Installation", price: 500, icon: "🚿" },
            { name: "Bathroom Fitting Repair", price: 1500, icon: "🛁" },
            { name: "Kitchen Sink Cleaning / Unclogging", price: 600, icon: "🧽" }
        ]
    },
    {
        title: "AC Installation & Repair",
        description: "Air conditioning installation, repair, and maintenance services",
        icon: "❄️",
        category: "ac",
        subServices: [
            { name: "AC Installation & Repair", price: 2500, icon: "🔧" },
            { name: "Split AC Installation", price: 3000, icon: "❄️" },
            { name: "Gas Refill & Leak Repair", price: 1800, icon: "🔧" },
            { name: "Window AC Installation", price: 2000, icon: "🪟" },
            { name: "Annual Deep Cleaning", price: 1200, icon: "🧹" }
        ]
    },
    {
        title: "Home Appliance Repair",
        description: "Repair and maintenance of all home appliances",
        icon: "🔧",
        category: "appliance",
        subServices: [
            { name: "Washing Machine Repair", price: 1500, icon: "👕" },
            { name: "Refrigerator Cooling Issue Fix", price: 2000, icon: "🧊" },
            { name: "Microwave Not Heating Repair", price: 1200, icon: "🔥" },
            { name: "Water Purifier Installation", price: 1800, icon: "💧" }
        ]
    },
    {
        title: "Furniture Services",
        description: "Furniture assembly, repair, and maintenance services",
        icon: "🪑",
        category: "furniture",
        subServices: [
            { name: "Furniture Assembly", price: 1000, icon: "🔨" },
            { name: "Bed / Wardrobe Repair", price: 1500, icon: "🛏️" },
            { name: "Sofa Leg Fix", price: 800, icon: "🛋️" },
            { name: "Table Polishing", price: 600, icon: "✨" }
        ]
    },
    {
        title: "Home Renovation & Painting",
        description: "Complete home renovation and professional painting services",
        icon: "🎨",
        category: "renovation",
        subServices: [
            { name: "Full Room Painting", price: 8000, icon: "🎨" },
            { name: "Wall Crack Fixing", price: 1500, icon: "🧱" },
            { name: "Ceiling Waterproofing", price: 3000, icon: "☔" },
            { name: "House Interior Painting", price: 15000, icon: "🏠" }
        ]
    },
    {
        title: "CCTV & Security Systems",
        description: "Security camera installation and digital lock systems",
        icon: "📹",
        category: "security",
        subServices: [
            { name: "2-Camera CCTV Installation", price: 8000, icon: "📷" },
            { name: "4-Camera DVR Setup", price: 15000, icon: "📹" },
            { name: "CCTV Maintenance & Cleaning", price: 1000, icon: "🧹" },
            { name: "Door Lock Digital System Installation", price: 5000, icon: "🔐" }
        ]
    },
    {
        title: "Fabrication Projects",
        description: "Custom metal fabrication and welding services",
        icon: "🔨",
        category: "fabrication",
        subServices: [
            { name: "Gate Fabrication", price: 12000, icon: "🚪" },
            { name: "Window Grill Making", price: 8000, icon: "🪟" },
            { name: "Complex Metal Repair", price: 3000, icon: "🔧" },
            { name: "Industrial Welding Work", price: 5000, icon: "⚡" }
        ]
    },
    {
        title: "Man Power Supply",
        description: "Skilled manpower for various household and commercial needs",
        icon: "👷",
        category: "manpower",
        subServices: [
            { name: "Household Helper", price: 800, icon: "🏠" },
            { name: "Loading/Unloading Manpower", price: 1200, icon: "📦" },
            { name: "Construction Worker", price: 1500, icon: "🏗️" },
            { name: "Office Boy Service", price: 600, icon: "💼" }
        ]
    },
    {
        title: "Event Management",
        description: "Complete event planning and management services",
        icon: "🎉",
        category: "events",
        subServices: [
            { name: "Birthday Decoration", price: 3000, icon: "🎂" },
            { name: "Wedding Event Management", price: 25000, icon: "💒" },
            { name: "Sound & Lighting Setup", price: 8000, icon: "🎵" },
            { name: "Catering Service", price: 15000, icon: "🍽️" }
        ]
    },
    {
        title: "On Roads Assistance",
        description: "Emergency roadside assistance and vehicle support",
        icon: "🚗",
        category: "roadside",
        subServices: [
            { name: "Flat Tyre Change", price: 500, icon: "🛞" },
            { name: "Jump Start Service", price: 400, icon: "🔋" },
            { name: "Emergency Fuel Delivery", price: 300, icon: "⛽" },
            { name: "Car Lockout Help", price: 600, icon: "🔑" }
        ]
    }
];

async function populateServices() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Service.deleteMany({});
        await SubService.deleteMany({});
        console.log('Cleared existing services and sub-services');

        // Add services and sub-services
        for (const serviceData of servicesData) {
            const { subServices, ...serviceInfo } = serviceData;
            
            // Create main service
            const service = new Service(serviceInfo);
            await service.save();
            console.log(`Created service: ${service.title}`);

            // Create sub-services
            for (const subServiceData of subServices) {
                const subService = new SubService({
                    ...subServiceData,
                    serviceId: service._id
                });
                await subService.save();
                console.log(`  - Created sub-service: ${subService.name}`);
            }
        }

        console.log('\n✅ Successfully populated all services!');
        console.log(`📊 Total: ${servicesData.length} main services with ${servicesData.reduce((total, service) => total + service.subServices.length, 0)} sub-services`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error populating services:', error);
        process.exit(1);
    }
}

populateServices();