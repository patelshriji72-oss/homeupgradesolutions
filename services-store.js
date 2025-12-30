// services-store.js - localStorage service management
const STORAGE_KEY = 'homeupgrade_services_v1';

function uid(prefix='id') {
  return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
}

function loadServicesFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    // Seed with existing services
    const seed = [
      {
        id: 'electrician',
        title: 'Electrician',
        description: 'Professional electrical installations and repairs',
        icon: '⚡',
        category: 'electrician',
        isActive: true,
        subServices: [
          { id: 1, name: 'Light Fitting', description: 'Professional light installation', price: 299, icon: '💡' },
          { id: 2, name: 'Fan Repair', description: 'Ceiling and table fan repairs', price: 399, icon: '🌀' },
          { id: 3, name: 'Switchboard Repair', description: 'Electrical panel maintenance', price: 599, icon: '🔌' },
          { id: 4, name: 'Wiring', description: 'Complete house wiring solutions', price: 1999, icon: '⚡' }
        ]
      },
      {
        id: 'ac',
        title: 'AC Installation & Repair',
        description: 'Complete AC solutions and maintenance',
        icon: '❄️',
        category: 'ac',
        isActive: true,
        subServices: [
          { id: 1, name: 'AC Installation', description: 'Complete AC unit installation', price: 2999, icon: '❄️' },
          { id: 2, name: 'AC Repair', description: 'AC troubleshooting and repair', price: 899, icon: '🔧' },
          { id: 3, name: 'AC Servicing', description: 'Regular maintenance service', price: 599, icon: '🧽' }
        ]
      },
      {
        id: 'plumber',
        title: 'Plumber',
        description: 'Complete plumbing solutions and repairs',
        icon: '🚿',
        category: 'plumber',
        isActive: true,
        subServices: [
          { id: 1, name: 'Pipe Repair', description: 'Water pipe fixing', price: 599, icon: '🔧' },
          { id: 2, name: 'Tap Installation', description: 'Faucet fitting service', price: 399, icon: '🚿' },
          { id: 3, name: 'Toilet Repair', description: 'Bathroom fixture repair', price: 799, icon: '🚽' }
        ]
      }
    ];
    saveServicesToStorage(seed);
    return seed;
  }
  try {
    return JSON.parse(raw);
  } catch(e) {
    console.error('Invalid services data, resetting');
    saveServicesToStorage([]);
    return [];
  }
}

function saveServicesToStorage(services) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}

function getService(serviceId) {
  const all = loadServicesFromStorage();
  return all.find(s => s.id === serviceId) || null;
}

function createService(serviceObj) {
  const all = loadServicesFromStorage();
  const newService = Object.assign({
    id: uid('svc'),
    title: '',
    description: '',
    icon: '🔧',
    category: '',
    isActive: true,
    subServices: []
  }, serviceObj);
  all.push(newService);
  saveServicesToStorage(all);
  return newService;
}

function updateService(serviceId, patch) {
  const all = loadServicesFromStorage();
  const idx = all.findIndex(s => s.id === serviceId);
  if (idx === -1) return null;
  all[idx] = Object.assign({}, all[idx], patch);
  saveServicesToStorage(all);
  return all[idx];
}

function deleteService(serviceId) {
  let all = loadServicesFromStorage();
  all = all.filter(s => s.id !== serviceId);
  saveServicesToStorage(all);
  return true;
}

function createSubService(parentServiceId, subServiceObj) {
  const all = loadServicesFromStorage();
  const svc = all.find(s => s.id === parentServiceId);
  if (!svc) return null;
  const newSub = Object.assign({
    id: uid('sub'),
    name: '',
    description: '',
    price: 0,
    icon: '🔧'
  }, subServiceObj);
  svc.subServices.push(newSub);
  saveServicesToStorage(all);
  return newSub;
}

function updateSubService(parentServiceId, subServiceId, patch) {
  const all = loadServicesFromStorage();
  const svc = all.find(s => s.id === parentServiceId);
  if (!svc) return null;
  const idx = svc.subServices.findIndex(ss => ss.id === subServiceId);
  if (idx === -1) return null;
  svc.subServices[idx] = Object.assign({}, svc.subServices[idx], patch);
  saveServicesToStorage(all);
  return svc.subServices[idx];
}

function deleteSubService(parentServiceId, subServiceId) {
  const all = loadServicesFromStorage();
  const svc = all.find(s => s.id === parentServiceId);
  if (!svc) return false;
  svc.subServices = svc.subServices.filter(ss => ss.id !== subServiceId);
  saveServicesToStorage(all);
  return true;
}

window.ServiceStore = {
  loadAll: loadServicesFromStorage,
  saveAll: saveServicesToStorage,
  createService,
  getService,
  updateService,
  deleteService,
  createSubService,
  updateSubService,
  deleteSubService
};