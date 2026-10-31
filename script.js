const toast = document.getElementById('toast');

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2400);
}

const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    showToast('Thanks! We will be in touch soon.');
  });
});

const emergencyFallbackContacts = [
  { label: 'Police Station', value: '112' },
  { label: 'Ambulance', value: '108' },
  { label: 'Emergency Boat', value: '1554' },
  { label: 'District Collector', value: '08643-223300' }
];

function parseContacts(rawText) {
  return rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const normalized = line.includes('|') ? line : line.replace(/\s*:\s*/, ' | ');
      const [label, ...rest] = normalized.split('|');
      const value = rest.join('|').trim();
      if (!label || !value) return null;
      return { label: label.trim(), value: value.trim() };
    })
    .filter(Boolean);
}

function renderEmergencyContacts(contacts) {
  const list = document.getElementById('emergency-contact-list');
  if (!list) return;

  list.innerHTML = '';
  contacts.forEach(({ label, value }) => {
    const item = document.createElement('li');
    item.className = 'emergency-contact-item';
    item.innerHTML = `
      <span class="emergency-label">${label}</span>
      <a href="tel:${value.replace(/\s+/g, '')}" class="emergency-value">${value}</a>
    `;
    list.appendChild(item);
  });
}

async function loadEmergencyContacts() {
  const list = document.getElementById('emergency-contact-list');
  if (!list) return;

  try {
    const response = await fetch('emergency-contacts.txt', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to read emergency contacts file.');
    const text = await response.text();
    const contacts = parseContacts(text);
    if (contacts.length) {
      renderEmergencyContacts(contacts);
      return;
    }
  } catch (error) {
    console.warn('Using emergency fallback contacts:', error);
  }

  renderEmergencyContacts(emergencyFallbackContacts);
}

const templeFallbackList = [
  {
    name: 'Bhavanarayana Temple, Bapatla',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Sri Koteswara Swamy Temple, Bapatla',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd67b1d8d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Suryanarayana Swamy Temple, Bapatla',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Anjaneya Swamy Temple, Bapatla',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Malleswara Swamy Temple, Bapatla',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Veerabhadra Swamy Temple, Bapatla',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'
  }
];

const touristPlacesFallbackList = [
  {
    name: 'Suryalanka Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Bapatla Lighthouse',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Pandurangapuram Beach',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Ramapuram Beach',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Coastal Viewpoint',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Heritage Walk',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'
  }
];

const catalogFallbacks = {
  'beach_activities/beach_activities_list.txt': [
    { name: 'Para Gliding', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', phone: '+91 98480 12345', category: 'Para Gliding' },
    { name: 'Speed Boating', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80', phone: '+91 93900 45678', category: 'Speed Boating' },
    { name: 'Jet Skiing', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80', phone: '+91 88855 98765', category: 'Jet Skiing' },
    { name: 'Beach Photography', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80', phone: '+91 95000 11223', category: 'Beach Photography' }
  ],
  'restaurants/restaurants_list.txt': [
    { name: 'Sea Pearl Restaurant', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', phone: '+91 98660 24567', category: 'Restaurants' },
    { name: 'Coastal Spice', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80', phone: '+91 94400 77889', category: 'Restaurants' },
    { name: 'Bapatla Street Bites', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', phone: '+91 99005 44556', category: 'Street Food' },
    { name: 'Fresh Catch Cafe', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80', phone: '+91 98450 99123', category: 'Restaurants' },
    { name: 'Bapatla Chaat Corner', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80', phone: '+91 98450 90321', category: 'Street Food' }
  ],
  'street_food_list.txt': [
    { name: 'Bapatla Street Bites', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', phone: '+91 99005 44556', category: 'Street Food' },
    { name: 'Bapatla Chaat Corner', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80', phone: '+91 98450 90321', category: 'Street Food' },
    { name: 'Beach Road Snacks', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80', phone: '+91 98480 43434', category: 'Street Food' },
    { name: 'Town Masala Fast Food', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80', phone: '+91 94901 56478', category: 'Street Food' },
    { name: 'Sunset Fry Corner', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80', phone: '+91 90520 77654', category: 'Street Food' }
  ],
  'shopping/shopping_list.txt': [
    { name: 'Coastal Threads', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80', phone: '+91 98480 22212', category: 'Clothing' },
    { name: 'Bapatla Fashion Hub', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 223 8891', category: 'Clothing' },
    { name: 'Tech Wave Electronics', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', phone: '+91 97010 66778', category: 'Electronics' },
    { name: 'Pixel Plaza', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 224 9900', category: 'Electronics' }
  ],
  'hospitals/hospitals_list.txt': [
    { name: 'Bapatla Government Hospital', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 242 2555' },
    { name: 'Sri Venkateswara Multi Specialty Hospital', image: 'https://images.unsplash.com/photo-1538108149393-fbbd818959dd?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 234 4567' },
    { name: 'Apex Clinic Bapatla', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 220 3456' },
    { name: 'Bapatla Dental & General Clinic', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 223 7766' }
  ],
  'rentals/rentals_list.txt': [
    { name: 'Bapatla Car Rentals', image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80', phone: '+91 98660 11881', category: 'Car Rentals' },
    { name: 'Coastal Bike Rentals', image: 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=1200&q=80', phone: '+91 99490 22445', category: 'Bike Rentals' },
    { name: 'Sunrise Cycle Rentals', image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80', phone: '+91 92900 34567', category: 'Cycle Rentals' },
    { name: 'Bapatla Taxi Services', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80', phone: '+91 99551 77881', category: 'Taxi Services' }
  ],
  'hotels/hotels_list.txt': [
    { name: 'Seaside Residency', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 225 1133', category: 'Beach resorts' },
    { name: 'Ocean Pearl Stay', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 227 9888', category: 'Beach resorts' },
    { name: 'Bapatla Grand Inn', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 224 8899', category: 'Budget stays' },
    { name: 'Coastal Nest Rooms', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 221 7090', category: 'Budget stays' },
    { name: 'Blue Lagoon Stay', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 221 2020', category: 'Family-friendly lodgings' },
    { name: 'Sunrise Residency', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 228 4500', category: 'Family-friendly lodgings' },
    { name: 'Harbor View Hotel', image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 223 1100', category: '3 & 5 Star Hotels' },
    { name: 'Bapatla Bay Suites', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80', phone: '+91 863 230 1400', category: '3 & 5 Star Hotels' }
  ]
};

function parseList(rawText) {
  return rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split('|').map((part) => part.trim());
      const name = parts[0];
      const image = parts[1] || '';
      const phone = parts[2] || '';
      const category = parts[3] || '';
      if (!name || !image) return null;
      return { name, image, phone, category };
    })
    .filter(Boolean);
}

function renderDataCardList(items, targetId, cardClassName = 'tourist-card') {
  const gallery = document.getElementById(targetId);
  if (!gallery) return;

  gallery.innerHTML = '';
  items.forEach(({ name, image, phone }) => {
    const card = document.createElement('article');
    card.className = cardClassName;
    card.innerHTML = `
      <img class="tourist-image" src="${image}" alt="${name}" loading="lazy" />
      <div class="tourist-content">
        <h3>${name}</h3>
        ${phone ? `<p><a href="tel:${phone.replace(/\s+/g, '')}">${phone}</a></p>` : ''}
      </div>
    `;
    gallery.appendChild(card);
  });
}

function renderCategoryCards(items, targetId, selectedCategory, cardClassName = 'tourist-card', emptyMessage = 'No items found') {
  const gallery = document.getElementById(targetId);
  if (!gallery) return;

  const filtered = items.filter((item) => {
    const category = item.category || '';
    return category === selectedCategory;
  });

  gallery.innerHTML = '';
  if (!filtered.length) {
    gallery.innerHTML = `<div class="detail-card"><h3>${emptyMessage}</h3><p>Try another category.</p></div>`;
    return;
  }

  filtered.forEach(({ name, image, phone }) => {
    const card = document.createElement('article');
    card.className = cardClassName;
    card.innerHTML = `
      <img class="tourist-image" src="${image}" alt="${name}" loading="lazy" />
      <div class="tourist-content">
        <h3>${name}</h3>
        ${phone ? `<p><a href="tel:${phone.replace(/\s+/g, '')}">${phone}</a></p>` : ''}
      </div>
    `;
    gallery.appendChild(card);
  });
}

function renderHotelCards(items, selectedCategory = 'Beach resorts') {
  renderCategoryCards(items, 'hotels-gallery', selectedCategory, 'tourist-card', 'No hotels found');
}

function renderTempleCards(temples) {
  renderDataCardList(temples, 'temple-gallery', 'temple-card');
}

function renderTouristCards(places) {
  renderDataCardList(places, 'tourist-gallery', 'tourist-card');
}

async function loadCatalog(targetId, filePath, fallbackList) {
  const gallery = document.getElementById(targetId);
  if (!gallery) return;

  try {
    const response = await fetch(filePath, { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to read data file.');
    const text = await response.text();
    const items = parseList(text);
    if (items.length) {
      renderDataCardList(items, targetId, 'tourist-card');
      return;
    }
  } catch (error) {
    console.warn(`Using fallback for ${filePath}:`, error);
  }

  renderDataCardList(fallbackList, targetId, 'tourist-card');
}

async function loadTempleCards() {
  const gallery = document.getElementById('temple-gallery');
  if (!gallery) return;

  try {
    const response = await fetch('temples/temple_list.txt', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to read temple list file.');
    const text = await response.text();
    const temples = parseList(text);
    if (temples.length) {
      renderTempleCards(temples);
      return;
    }
  } catch (error) {
    console.warn('Using temple fallback list:', error);
  }

  renderTempleCards(templeFallbackList);
}

async function loadTouristCards() {
  const gallery = document.getElementById('tourist-gallery');
  if (!gallery) return;

  try {
    const response = await fetch('tourist_places/tourist_places_list.txt', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to read tourist place list file.');
    const text = await response.text();
    const places = parseList(text);
    if (places.length) {
      renderTouristCards(places);
      return;
    }
  } catch (error) {
    console.warn('Using tourist fallback list:', error);
  }

  renderTouristCards(touristPlacesFallbackList);
}

async function loadCatalogs() {
  const catalogEntries = document.querySelectorAll('[data-list-file]');
  catalogEntries.forEach((entry) => {
    const filePath = entry.dataset.listFile;
    const targetId = entry.id;
    const fallbackList = catalogFallbacks[filePath] || [];
    if (targetId === 'hotels-gallery' || targetId === 'beach-activities-gallery' || targetId === 'rentals-gallery' || targetId === 'restaurants-gallery' || targetId === 'shopping-gallery') {
      return;
    }
    loadCatalog(targetId, filePath, fallbackList);
  });
}

function setupCategoryTabs(targetId, filePath, defaultCategory, emptyMessage) {
  const buttons = document.querySelectorAll(`[data-category-filter]`);
  let activeCategory = defaultCategory;

  if (!buttons.length) {
    loadCategoryFilteredItems(filePath, targetId, activeCategory, emptyMessage);
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      activeCategory = button.dataset.categoryFilter;
      buttons.forEach((tab) => tab.classList.toggle('active', tab === button));
      await loadCategoryFilteredItems(filePath, targetId, activeCategory, emptyMessage);
    });
  });

  loadCategoryFilteredItems(filePath, targetId, activeCategory, emptyMessage);
}

function setupMobileNav() {
  const navWrap = document.querySelector('.nav-wrap');
  const nav = document.querySelector('.main-nav');
  if (!navWrap || !nav) return;

  let toggle = navWrap.querySelector('.mobile-nav-toggle');
  if (!toggle) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    toggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
      toggle.classList.toggle('active', nav.classList.contains('mobile-open'));
    });
    navWrap.appendChild(toggle);
  }

  const isMobile = window.innerWidth <= 980;
  toggle.style.display = isMobile ? 'inline-flex' : 'none';
  if (!isMobile) {
    nav.classList.remove('mobile-open');
    toggle.classList.remove('active');
  }
}

async function loadCategoryFilteredItems(filePath, targetId, selectedCategory, emptyMessage) {
  const gallery = document.getElementById(targetId);
  if (!gallery) return;

  try {
    const response = await fetch(filePath, { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to read category list file.');
    const text = await response.text();
    const items = parseList(text);
    if (items.length) {
      renderCategoryCards(items, targetId, selectedCategory, 'tourist-card', emptyMessage);
      return;
    }
  } catch (error) {
    console.warn(`Using fallback list for ${filePath}:`, error);
  }

  renderCategoryCards(catalogFallbacks[filePath] || [], targetId, selectedCategory, 'tourist-card', emptyMessage);
}

function setupHotelCategoryTabs() {
  const buttons = document.querySelectorAll('[data-hotel-category]');
  if (!buttons.length) return;

  let activeCategory = 'Beach resorts';

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.hotelCategory;
      buttons.forEach((tab) => tab.classList.toggle('active', tab === button));
      loadHotelCatalog(activeCategory);
    });
  });

  loadHotelCatalog(activeCategory);
}

async function loadHotelCatalog(selectedCategory = 'Beach resorts') {
  const gallery = document.getElementById('hotels-gallery');
  if (!gallery) return;

  try {
    const response = await fetch('hotels/hotels_list.txt', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to read hotel list file.');
    const text = await response.text();
    const items = parseList(text);
    if (items.length) {
      renderHotelCards(items, selectedCategory);
      return;
    }
  } catch (error) {
    console.warn('Using hotel fallback list:', error);
  }

  renderHotelCards(catalogFallbacks['hotels/hotels_list.txt'] || [], selectedCategory);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setupMobileNav();
    window.addEventListener('resize', setupMobileNav);
    loadEmergencyContacts();
    loadTempleCards();
    loadTouristCards();
    loadCatalogs();
    setupHotelCategoryTabs();
    setupCategoryTabs('beach-activities-gallery', 'beach_activities/beach_activities_list.txt', 'Para Gliding', 'No activities found');
    setupCategoryTabs('rentals-gallery', 'rentals/rentals_list.txt', 'Car Rentals', 'No rental companies found');
    setupCategoryTabs('restaurants-gallery', 'restaurants/restaurants_list.txt', 'Restaurants', 'No food places found');
    setupCategoryTabs('shopping-gallery', 'shopping/shopping_list.txt', 'Clothing', 'No shopping options found');
  });
} else {
  setupMobileNav();
  window.addEventListener('resize', setupMobileNav);
  loadEmergencyContacts();
  loadTempleCards();
  loadTouristCards();
  loadCatalogs();
  setupHotelCategoryTabs();
  setupCategoryTabs('beach-activities-gallery', 'beach_activities/beach_activities_list.txt', 'Para Gliding', 'No activities found');
  setupCategoryTabs('rentals-gallery', 'rentals/rentals_list.txt', 'Car Rentals', 'No rental companies found');
  setupCategoryTabs('restaurants-gallery', 'restaurants/restaurants_list.txt', 'Restaurants', 'No food places found');
  setupCategoryTabs('shopping-gallery', 'shopping/shopping_list.txt', 'Clothing', 'No shopping options found');
}
