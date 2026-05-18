// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Sync Lenis with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const i18n = {
  ca: {
    'nav.house': 'La casa',
    'nav.rooms': 'Habitacions',
    'nav.services': 'Serveis',
    'nav.activities': 'Activitats',
    'nav.attractions': 'Atraccions',
    'nav.reviews': 'Comentaris',
    'nav.contact': 'Contacte',
    'nav.book': 'Reservar',
    'hero.label': 'Refugi Rural Exclusiu',
    'hero.description': 'Més que una estada, una immersió total en la calma. Gaudeix de la màxima exclusivitat en un entorn on el temps es deté i el servei personalitzat és la nostra prioritat.',
    'hero.cta_link': 'Comença el teu viatge',
    'about.label': 'Sobre la casa',
    'about.title': 'Un refugi privat<br /><em>en plena natura</em>',
    'about.lead': 'Palmito House es troba a Les Planes d\'Hostoles, un tranquil poble de muntanya prop de Girona. A prop dels Pirineus i a prop de Barcelona i les platges de la Costa Brava, és el lloc perfecte per relaxar-se i gaudir de la bellesa dels seus voltants.',
    'about.lead2': 'Pot allotjar 8 persones en 4 habitacions dobles i disposa d\'un gran jardí i una espectacular piscina. Un espai pensat per desconnectar i gaudir dels paisatges i atractius turístics dels voltants.',
    'about.feature1.title': '4 habitacions dobles',
    'about.feature1.text': 'Per a estades còmodes en grups o famílies',
    'about.feature2.title': 'Piscina exterior i jardí ampli',
    'about.feature2.text': 'Envoltada de natura i silenci',
    'about.feature3.title': 'Ubicació privilegiada',
    'about.feature3.text': 'Entre Girona, la Garrotxa i la Costa Brava',
    'about.feature4.title': 'Casa privada exclusiva',
    'about.feature4.text': 'Per relaxar-se i desconnectar',
    'stats.rooms': 'Habitacions dobles',
    'stats.experience': 'Anys d\'experiència',
    'stats.guests': 'Hostes feliços',
    'stats.rating': 'Valoració mitjana',
    'rooms.label': 'Habitacions',
    'rooms.title': 'Les quatre habitacions dobles<br /><em>per al teu relax</em>',
    'rooms.lead': 'Les quatre habitacions dobles us proporcionaran el relax desitjat durant la vostra estada.',
    'rooms.room1.title': 'Habitació Doble Superior',
    'rooms.room1.text': 'Llit king size, bany privat, vistes al jardí i decoració rústica amb toc modern.',
    'rooms.room2.title': 'Habitació amb Balcó',
    'rooms.room2.text': 'Balcó privat amb vistes a la muntanya, llit doble i espai de treball.',
    'rooms.room3.title': 'Suite Familiar',
    'rooms.room3.text': 'Dos ambients connectats, ideal per a famílies amb nens. Capacitat per a 4 persones.',
    'rooms.room4.title': 'Habitació Garden View',
    'rooms.room4.text': 'Accés directe al jardí, llit doble i una atmosfera de calma absoluta.',
    'services.label': 'Experiència Palmito',
    'services.title': 'Tot el que<br /><em>necessites per brillar</em>',
    'services.lead': 'El nostre objectiu és que no hagis de pensar en res més que en gaudir. Oferim una gamma de serveis exclusius dissenyats per fer la teva estada el més relaxada possible.',
    'services.service1.title': 'WiFi',
    'services.service1.text': 'Connexió d\'alta velocitat a tota la finca',
    'services.service2.title': 'Trasllats',
    'services.service2.text': 'Sota petició',
    'services.service4.title': 'Limpieza',
    'services.service4.text': 'Sota petició',
    'services.service5.title': 'Piscina',
    'services.service5.text': 'Piscina privada exterior',
    'services.service6.title': 'Jardí',
    'services.service6.text': 'Ampli jardí amb vistes a la muntanya',
    'services.service7.title': 'Servicio de comidas',
    'services.service7.text': 'Sota petició',
    'activities.label': 'Explora l\'Entorn',
    'activities.title': 'Descobreix el que<br /><em>la Garrotxa té per a tu</em>',
    'activities.lead': 'Des de l\'adrenalina del parapent fins a la calma dels banys al riu, seleccionem les millors experiències perquè connectis amb la terra i amb tu mateix.',
    'activities.activity1.title': 'Banys al riu',
    'activities.activity2.title': 'Sortides en bicicleta',
    'activities.activity3.title': 'Passejos a cavall',
    'activities.activity4.title': 'Parapent',
    'activities.activity5.title': 'Passejos en globus',
    'activities.activity6.title': 'Esquí',
    'activities.activity7.title': 'Senderisme',
    'activities.activity8.title': 'Golf',
    'activities.activity9.title': 'Gastronomia',
    'attractions.label': 'Atraccions turístiques',
    'attractions.title': 'Alrededores<br /><em>per descobrir</em>',
    'attractions.attraction1.title': 'Alrededores',
    'attractions.attraction4.title': 'Pirineus',
    'attractions.attraction5.title': 'Costa Brava',
    'reviews.label': 'Comentaris',
    'reviews.title': 'El que diuen<br /><em>els nostres hostes</em>',
    'reviews.review1.text': 'La casa és espaiosa, còmoda, neta i gran, la piscina és fantàstica i la zona de barbacoa és un lloc brillant per cuinar menjar local. Hi ha unes cascades precioses just darrere de la casa, a uns 20 minuts a peu. Vam llogar un cotxe i vam conduir per algunes de les zones fantàstiques d\'Espanya, fins a Barcelona per un dia, una vetllada a Girona i una conducció fora d\'aquest món cap al nord, a les muntanyes dels Pirineus. Recomanem aquesta casa a qualsevol hoste potencial.',
    'reviews.review2.text': 'Una casa magnífica, espaiosa i neta. Situada al cor de les muntanyes, de cascades, d\'antics volcans i a la sortida d\'un encantador petit poble, té tot el necessari per agradar. Estada inoblidable.',
    'reviews.review3.text': 'Vam gaudir de les boniques vistes des del jardí del darrere de la casa, mirant cap als turons verds i boscosos. Les piscines i cascades de la zona eren genials per banyar-se, i la piscina de la casa era superb. La zona és interessant i bonica. La casa és un lloc preciós per passar el temps relaxant-se.',
    'contact.label': 'Fes el primer pas',
    'contact.title': 'Reserva la teva<br /><em>experiència</em>',
    'contact.lead': 'Estem aquí per ajudar-te a planificar la teva escapada ideal. Contacta amb nosaltres per a una atenció totalment personalitzada i detalls exclusius.',
    'contact.address.title': 'Adreça',
    'contact.address.text': 'Passeig Rebuscall, 13<br />Les Planes d\'Hostoles<br />17172 Girona, Spain',
    'contact.phone.title': 'Telèfon',
    'contact.email.title': 'Email',
    'contact.form.name': 'Nom complet',
    'contact.form.name_placeholder': 'El teu nom',
    'contact.form.email': 'Email',
    'contact.form.email_placeholder': 'tu@email.com',
    'contact.form.dates': 'Dates desitjades',
    'contact.form.dates_placeholder': 'Ex: 15-20 agost 2026',
    'contact.form.message': 'Missatge',
    'contact.form.message_placeholder': 'Explica\'ns què necessites...',
    'contact.form.submit': 'Enviar consulta',
    'footer.text': 'On l\'exclusivitat troba la seva essència natural. La teva llar lluny de casa, al cor de la Garrotxa.',
    'footer.copy': '© 2026 Palmito House. Tots els drets reservats.',
    'footer.design': 'Dissenyat per Vora Studio'
  },
  es: {
    'nav.house': 'La casa',
    'nav.rooms': 'Habitaciones',
    'nav.services': 'Servicios',
    'nav.activities': 'Actividades',
    'nav.attractions': 'Atracciones',
    'nav.reviews': 'Comentarios',
    'nav.contact': 'Contacto',
    'nav.book': 'Reservar',
    'hero.label': 'Casa rural exclusiva',
    'hero.description': 'Escápate. Respira. Desconecta de verdad. Una casa exclusiva entre montaña, naturaleza y silencio, a pocos minutos de Girona y la Costa Brava.',
    'hero.cta_link': 'Reserva tu estancia',
    'about.label': 'Sobre la casa',
    'about.title': 'Un refugio privado<br /><em>en plena naturaleza</em>',
    'about.lead': 'Palmito House está situada en Les Planes d\'Hostoles, un tranquilo pueblo de montaña cerca de Girona. Cerca de los Pirineos y próximo a Barcelona y las playas de la Costa Brava, es el lugar perfecto para relajarse y disfrutar de la belleza de sus alrededores.',
    'about.lead2': 'Puede alojar 8 personas en 4 habitaciones dobles y tiene un gran jardín y una espectacular piscina. Un espacio pensado para desconectar y disfrutar de los paisajes y atractivos turísticos cercanos.',
    'about.feature1.title': '4 habitaciones dobles',
    'about.feature1.text': 'Para estancias cómodas en grupos o familias',
    'about.feature2.title': 'Piscina exterior y jardín amplio',
    'about.feature2.text': 'Rodeada de naturaleza y silencio',
    'about.feature3.title': 'Ubicación privilegiada',
    'about.feature3.text': 'Entre Girona, la Garrotxa y la Costa Brava',
    'about.feature4.title': 'Casa privada exclusiva',
    'about.feature4.text': 'Para relajarse y desconectar',
    'stats.rooms': 'Habitaciones dobles',
    'stats.experience': 'Años de experiencia',
    'stats.guests': 'Huéspedes felices',
    'stats.rating': 'Valoración media',
    'rooms.label': 'Habitaciones',
    'rooms.title': 'Las cuatro habitaciones dobles<br /><em>para tu relax</em>',
    'rooms.lead': 'Las cuatro habitaciones dobles le proporcionarán el relax deseado durante su estancia.',
    'rooms.room1.title': 'Habitación Doble Superior',
    'rooms.room1.text': 'Cama king size, baño privado, vistas al jardín y decoración rústica con toque moderno.',
    'rooms.room2.title': 'Habitación con Balcón',
    'rooms.room2.text': 'Balcón privado con vistas a la montaña, cama doble y espacio de trabajo.',
    'rooms.room3.title': 'Suite Familiar',
    'rooms.room3.text': 'Dos ambientes conectados, ideal para familias con niños. Capacidad para 4 personas.',
    'rooms.room4.title': 'Habitación Garden View',
    'rooms.room4.text': 'Acceso directo al jardín, cama doble y una atmósfera de calma absoluta.',
    'services.label': 'Experiencia Palmito',
    'services.title': 'Todo lo que<br /><em>necesitas para brillar</em>',
    'services.lead': 'Nuestro objetivo es que no tengas que pensar en nada más que en disfrutar. Ofrecemos una gama de servicios exclusivos diseñados para hacer tu estancia lo más relajada posible.',
    'services.service1.title': 'WiFi',
    'services.service1.text': 'Conexión de alta velocidad en toda la finca',
    'services.service2.title': 'Traslados',
    'services.service2.text': 'Bajo petición',
    'services.service4.title': 'Limpieza',
    'services.service4.text': 'Bajo petición',
    'services.service5.title': 'Piscina',
    'services.service5.text': 'Piscina privada exterior',
    'services.service6.title': 'Jardín',
    'services.service6.text': 'Amplio jardín con vistas a la montaña',
    'services.service7.title': 'Servicio de comidas',
    'services.service7.text': 'Bajo petición',
    'activities.label': 'Explora el Entorno',
    'activities.title': 'Descubre lo que<br /><em>la Garrotxa tiene para ti</em>',
    'activities.lead': 'Desde la adrenalina del paracaidismo hasta la calma de los baños en el río, seleccionamos las mejores experiencias para que conectes con la tierra y contigo mismo.',
    'activities.activity1.title': 'Baños en el río',
    'activities.activity2.title': 'Salidas en bicicleta',
    'activities.activity3.title': 'Paseos a caballo',
    'activities.activity4.title': 'Parapente',
    'activities.activity5.title': 'Paseos en globo',
    'activities.activity6.title': 'Ski',
    'activities.activity7.title': 'Senderismo',
    'activities.activity8.title': 'Golf',
    'activities.activity9.title': 'Gastronomía',
    'attractions.label': 'Atracciones turísticas',
    'attractions.title': 'Alrededores<br /><em>por descubrir</em>',
    'attractions.attraction1.title': 'Alrededores',
    'attractions.attraction4.title': 'Pirineos',
    'attractions.attraction5.title': 'Costa Brava',
    'reviews.label': 'Comentarios',
    'reviews.title': 'Lo que dicen<br /><em>nuestros huéspedes</em>',
    'reviews.review1.text': 'La casa es amplia, cómoda, limpia y grande, la piscina es fantástica y la zona de barbacoa es un lugar brillante para cocinar comida local. Hay unas cascadas preciosas justo detrás de la casa, a unos 20 minutos a pie. Tuvimos un coche de alquiler y condujimos por algunas de las zonas fantásticas de España, hasta Barcelona por un día, una velada en Girona y una conducción fuera de este mundo hacia el norte, a las montañas de los Pirineos. Recomendamos esta casa a cualquier huésped potencial.',
    'reviews.review2.text': 'Una casa magnífica, espaciosa y limpia. Situada en el corazón de las montañas, de cascadas, de antiguos volcanes y a la salida de un encantador pequeño pueblo, tiene todo lo necesario para gustar. Estancia inolvidable.',
    'reviews.review3.text': 'Disfrutamos de las hermosas vistas desde el jardín trasero de la casa, mirando hacia las colinas verdes y boscosas. Las piscinas y cascadas de la zona eran geniales para bañarse, y la piscina de la casa era superb. La zona es interesante y bonita. La casa es un lugar precioso para pasar el tiempo relajándose.',
    'contact.label': 'Da el primer paso',
    'contact.title': 'Reserva tu<br /><em>experiencia</em>',
    'contact.lead': 'Estamos aquí para ayudarte a planificar tu escapada ideal. Contacta con nosotros para una atención totalmente personalizada y detalles exclusivos.',
    'contact.address.title': 'Dirección',
    'contact.address.text': 'Passeig Rebuscall, 13<br />Les Planes d\'Hostoles<br />17172 Girona, Spain',
    'contact.phone.title': 'Teléfono',
    'contact.email.title': 'Email',
    'contact.form.name': 'Nombre completo',
    'contact.form.name_placeholder': 'Tu nombre',
    'contact.form.email': 'Email',
    'contact.form.email_placeholder': 'tu@email.com',
    'contact.form.dates': 'Fechas deseadas',
    'contact.form.dates_placeholder': 'Ej: 15-20 agosto 2026',
    'contact.form.message': 'Mensaje',
    'contact.form.message_placeholder': 'Cuéntanos qué necesitas...',
    'contact.form.submit': 'Enviar consulta',
    'footer.text': 'Donde la exclusividad encuentra su esencia natural. Tu hogar lejos de casa, en el corazón de la Garrotxa.',
    'footer.copy': '© 2026 Palmito House. Todos los derechos reservados.',
    'footer.design': 'Diseñado por Vora Studio'
  },
  en: {
    'nav.house': 'The house',
    'nav.rooms': 'Rooms',
    'nav.services': 'Services',
    'nav.activities': 'Activities',
    'nav.attractions': 'Attractions',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    'nav.book': 'Book now',
    'hero.label': 'Exclusive Rural Retreat',
    'hero.description': 'More than a stay, a total immersion in calm. Enjoy the ultimate exclusivity in an environment where time stops and personalized service is our priority.',
    'hero.cta_link': 'Start your journey',
    'about.label': 'About the house',
    'about.title': 'A private retreat<br /><em>in the heart of nature</em>',
    'about.lead': 'Palmito House is located in Les Planes d\'Hostoles, a quiet mountain village near Girona. Close to the Pyrenees and near Barcelona and the beaches of the Costa Brava, it\'s the perfect place to relax and enjoy the beauty of its surroundings.',
    'about.lead2': 'It sleeps 8 people in 4 double rooms and has a large garden and a spectacular pool. A space designed to disconnect and enjoy the landscapes and nearby tourist attractions.',
    'about.feature1.title': '4 double rooms',
    'about.feature1.text': 'For comfortable stays in groups or families',
    'about.feature2.title': 'Outdoor pool & large garden',
    'about.feature2.text': 'Surrounded by nature and silence',
    'about.feature3.title': 'Prime location',
    'about.feature3.text': 'Between Girona, Garrotxa and Costa Brava',
    'about.feature4.title': 'Exclusive private house',
    'about.feature4.text': 'To relax and disconnect',
    'stats.rooms': 'Double rooms',
    'stats.experience': 'Years of experience',
    'stats.guests': 'Happy guests',
    'stats.rating': 'Average rating',
    'rooms.label': 'Rooms',
    'rooms.title': 'Four double rooms<br /><em>for your relaxation</em>',
    'rooms.lead': 'The four double rooms will provide you with the desired relaxation during your stay.',
    'rooms.room1.title': 'Superior Double Room',
    'rooms.room1.text': 'King size bed, private bathroom, garden views and rustic decor with a modern touch.',
    'rooms.room2.title': 'Room with Balcony',
    'rooms.room2.text': 'Private balcony with mountain views, double bed and workspace.',
    'rooms.room3.title': 'Family Suite',
    'rooms.room3.text': 'Two connected spaces, ideal for families with children. Capacity for 4 people.',
    'rooms.room4.title': 'Garden View Room',
    'rooms.room4.text': 'Direct garden access, double bed and an atmosphere of absolute calm.',
    'services.label': 'The Palmito Experience',
    'services.title': 'Everything you<br /><em>need to shine</em>',
    'services.lead': 'Our goal is for you not to have to think about anything but enjoying yourself. We offer a range of exclusive services designed to make your stay as relaxed as possible.',
    'services.service1.title': 'WiFi',
    'services.service1.text': 'High-speed connection throughout the property',
    'services.service2.title': 'Transfers',
    'services.service2.text': 'On request',
    'services.service4.title': 'Cleaning',
    'services.service4.text': 'On request',
    'services.service5.title': 'Pool',
    'services.service5.text': 'Private outdoor pool',
    'services.service6.title': 'Garden',
    'services.service6.text': 'Large garden with mountain views',
    'services.service7.title': 'Meal service',
    'services.service7.text': 'On request',
    'activities.label': 'Explore the Area',
    'activities.title': 'Discover what<br /><em>Garrotxa has for you</em>',
    'activities.lead': 'From the adrenaline of paragliding to the calm of river bathing, we select the best experiences for you to connect with the land and yourself.',
    'activities.activity1.title': 'River bathing',
    'activities.activity2.title': 'Bike tours',
    'activities.activity3.title': 'Horse riding',
    'activities.activity4.title': 'Paragliding',
    'activities.activity5.title': 'Hot air balloon',
    'activities.activity6.title': 'Skiing',
    'activities.activity7.title': 'Hiking',
    'activities.activity8.title': 'Golf',
    'activities.activity9.title': 'Gastronomy',
    'attractions.label': 'Tourist attractions',
    'attractions.title': 'Surroundings<br /><em>to discover</em>',
    'attractions.attraction1.title': 'Surroundings',
    'attractions.attraction4.title': 'Pyrenees',
    'attractions.attraction5.title': 'Costa Brava',
    'reviews.label': 'Reviews',
    'reviews.title': 'What our<br /><em>guests say</em>',
    'reviews.review1.text': 'The house is roomy, comfortable, clean and big, the pool is fantastic, and the BBQ area is a brilliant place to cook local food. There are some gorgeous waterfalls just behind the house, about a 20 minute walk away. We had a hire car and drove around some of the fantastic areas of Spain, into Barcelona for a day, an evening in Girona and an out of this world drive north to the Pyrenees\'s mountains. We would recommend this house to any potential guest.',
    'reviews.review2.text': 'A magnificent, spacious and clean house. Located in the heart of the mountains, of waterfalls, of ancient volcanoes and at the exit of a charming little village, it has everything to please. Unforgettable stay.',
    'reviews.review3.text': 'We enjoyed the beautiful views from the garden at the back of the house, looking towards green forested hills. The pools and waterfalls in the area were great for swimming, and the swimming pool at the house was superb. The area is interesting and beautiful. The house is a gorgeous place to spend time relaxing.',
    'contact.label': 'Take the first step',
    'contact.title': 'Book your<br /><em>experience</em>',
    'contact.lead': 'We are here to help you plan your ideal getaway. Contact us for fully personalized attention and exclusive details.',
    'contact.address.title': 'Address',
    'contact.address.text': 'Passeig Rebuscall, 13<br />Les Planes d\'Hostoles<br />17172 Girona, Spain',
    'contact.phone.title': 'Phone',
    'contact.email.title': 'Email',
    'contact.form.name': 'Full name',
    'contact.form.name_placeholder': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.email_placeholder': 'you@email.com',
    'contact.form.dates': 'Desired dates',
    'contact.form.dates_placeholder': 'E.g.: Aug 15-20, 2026',
    'contact.form.message': 'Message',
    'contact.form.message_placeholder': 'Tell us what you need...',
    'contact.form.submit': 'Send inquiry',
    'footer.text': 'Where exclusivity meets its natural essence. Your home away from home, in the heart of Garrotxa.',
    'footer.copy': '© 2026 Palmito House. All rights reserved.',
    'footer.design': 'Designed by Vora Studio'
  }
};

const flags = {
  ca: '',
  es: '🇪',
  en: '🇬'
};

let currentLang = 'ca';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.innerHTML = i18n[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (i18n[lang] && i18n[lang][key]) {
      el.placeholder = i18n[lang][key];
    }
  });

  document.querySelectorAll('.lang-switcher__current').forEach(el => {
    el.textContent = lang.toUpperCase();
  });

  document.querySelectorAll('[data-current-flag]').forEach(el => {
    el.textContent = flags[lang];
  });

  document.querySelectorAll('.lang-switcher__option').forEach(btn => {
    btn.classList.toggle('lang-switcher__option--active', btn.getAttribute('data-lang') === lang);
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('lang-btn--active', btn.getAttribute('data-lang') === lang);
  });

  const currentFlagEl = document.getElementById('current-flag');
  if (currentFlagEl) {
    currentFlagEl.className = `lang-switcher__flag lang-switcher__flag--${lang}`;
  }

  localStorage.setItem('palmito-lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.getAttribute('data-lang'));
  });
});

const savedLang = localStorage.getItem('palmito-lang');
if (savedLang && i18n[savedLang]) {
  setLanguage(savedLang);
}

gsap.registerPlugin(ScrollTrigger);

const navToggle = document.querySelector('.nav__toggle');
const navMobile = document.querySelector('.nav__mobile');
const mobileLinks = document.querySelectorAll('.nav__mobile-link');

function getFocusableElements(container) {
  return container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
}

function trapFocus(container) {
  const focusable = getFocusableElements(container);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  first.focus();

  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  container.addEventListener('keydown', handler);
  return () => container.removeEventListener('keydown', handler);
}

let releaseTrap = null;

function openMobileMenu() {
  navMobile.classList.add('nav__mobile--open');
  navToggle.classList.add('nav__toggle--active');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  releaseTrap = trapFocus(navMobile);
}

function closeMobileMenu() {
  navMobile.classList.remove('nav__mobile--open');
  navToggle.classList.remove('nav__toggle--active');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  if (releaseTrap) {
    releaseTrap();
    releaseTrap = null;
  }
  navToggle.focus();
}

navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.contains('nav__mobile--open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMobile.classList.contains('nav__mobile--open')) {
    closeMobileMenu();
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    lenis.scrollTo(target);
    closeMobileMenu();
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    if (target && target !== '#') {
      lenis.scrollTo(target);
    }
  });
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

sections.forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => updateActiveLink(section.id),
    onEnterBack: () => updateActiveLink(section.id)
  });
});

function updateActiveLink(id) {
  navLinks.forEach(link => {
    link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${id}`);
  });
}

gsap.defaults({ ease: 'power3.out' });

// Header entrance animation
gsap.set('.header', { autoAlpha: 0 });

const headerTL = gsap.timeline({ delay: 0.05 });
headerTL
  .to('.header', { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
  .from('.header__logo', { y: -24, autoAlpha: 0, duration: 0.6, ease: 'power3.out' }, '-=0.1')
  .from('.nav__link', { y: -20, autoAlpha: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out' }, '-=0.35')
  .from('.lang-btn, .nav__cta, .nav__toggle', { y: -20, autoAlpha: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out' }, '-=0.3');

const heroTL = gsap.timeline({ delay: 0.15 });

heroTL
  .from('.hero__word--palmito', { x: '-50vw', duration: 1.5, ease: 'power4.out' }, 0)
  .from('.hero__word--house', { x: '50vw', duration: 1.5, ease: 'power4.out' }, 0)
  .fromTo('.hero__inline-image', 
    { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1, ease: 'power3.out' },
    0.8
  )
  .to('.hero__inline-image', {
    width: '120vw', // Obligamos a que sea más de 100vw para cubrir la diferencia de texto
    height: '70vh',
    borderRadius: 0, // Quitamos el borde redondeado para que sea de borde a borde
    duration: 2,
    ease: 'power3.inOut'
  }, '+=2')
  .to('.hero__word--palmito', {
    x: '42vw', // Mueve hacia el centro sobre la imagen
    y: '-28vh', // Mueve a la parte superior de la imagen
    scale: 0.5,
    color: '#ffffff', // Pasa a blanco
    duration: 2,
    ease: 'power3.inOut'
  }, '<')
  .to('.hero__word--house', {
    x: '-42vw', // Mueve hacia el centro sobre la imagen
    y: '-28vh', // Mueve a la parte superior de la imagen
    scale: 0.5,
    color: '#ffffff', // Pasa a blanco
    duration: 2,
    ease: 'power3.inOut'
  }, '<');

gsap.utils.toArray('.section__label').forEach(el => {
  gsap.from(el, {
    autoAlpha: 0,
    y: 30,
    duration: 0.7,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});

gsap.utils.toArray('.section__title').forEach(el => {
  gsap.from(el, {
    autoAlpha: 0,
    y: 40,
    duration: 0.8,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});

ScrollTrigger.batch('.feature-card', {
  interval: 0.12,
  batchMax: 4,
  onEnter: (elements) => {
    gsap.from(elements, {
      autoAlpha: 0,
      y: 30,
      duration: 0.7,
      overwrite: true
    });
  },
  onLeaveBack: (elements) => {
    gsap.set(elements, { autoAlpha: 0, y: 30, overwrite: true });
  },
  start: 'top 85%',
  once: true
});

ScrollTrigger.batch('.room-card', {
  interval: 0.15,
  batchMax: 4,
  onEnter: (elements) => {
    gsap.from(elements, {
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      overwrite: true
    });
  },
  onLeaveBack: (elements) => {
    gsap.set(elements, { autoAlpha: 0, y: 30, overwrite: true });
  },
  start: 'top 85%',
  once: true
});

ScrollTrigger.batch('.service-card', {
  interval: 0.1,
  batchMax: 6,
  onEnter: (elements) => {
    gsap.from(elements, {
      autoAlpha: 0,
      y: 30,
      duration: 0.6,
      overwrite: true
    });
  },
  onLeaveBack: (elements) => {
    gsap.set(elements, { autoAlpha: 0, y: 30, overwrite: true });
  },
  start: 'top 85%',
  once: true
});

ScrollTrigger.batch('.activity-card', {
  interval: 0.08,
  batchMax: 4,
  onEnter: (elements) => {
    gsap.from(elements, {
      autoAlpha: 0,
      y: 30,
      duration: 0.6,
      overwrite: true
    });
  },
  onLeaveBack: (elements) => {
    gsap.set(elements, { autoAlpha: 0, y: 30, overwrite: true });
  },
  start: 'top 85%',
  once: true
});

gsap.utils.toArray('.review-card').forEach((card, i) => {
  gsap.from(card, {
    autoAlpha: 0,
    y: 50,
    duration: 0.8,
    delay: i * 0.15,
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
});

gsap.from('.booking__info', {
  autoAlpha: 0,
  x: -40,
  duration: 0.8,
  scrollTrigger: {
    trigger: '.booking__layout',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.contact-form', {
  autoAlpha: 0,
  x: 40,
  duration: 0.8,
  scrollTrigger: {
    trigger: '.booking__layout',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.footer__content', {
  autoAlpha: 0,
  y: 30,
  duration: 0.7,
  scrollTrigger: {
    trigger: '.footer',
    start: 'top 90%',
    toggleActions: 'play none none reverse'
  }
});



// Casa section reveal
const casaTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.casa__layout',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});
casaTL
  .from('.casa__image', { autoAlpha: 0, x: -60, duration: 0.9 })
  .from('.casa__content', { autoAlpha: 0, y: 40, duration: 0.8 }, '-=0.5');

// Stats counter animation
gsap.utils.toArray('.stat').forEach((stat) => {
  const numEl = stat.querySelector('.stat__number');
  const raw = numEl.textContent;
  const targetVal = parseFloat(raw.replace('+', ''));
  const hasPlus = raw.includes('+');
  const isDecimal = targetVal % 1 !== 0;

  const proxy = { val: 0 };
  gsap.to(proxy, {
    val: targetVal,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: stat,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
      once: true
    },
    onUpdate: () => {
      const display = isDecimal ? proxy.val.toFixed(1) : Math.floor(proxy.val);
      numEl.textContent = hasPlus ? display + '+' : display;
    }
  });
});

// Gallery stagger
gsap.from('.gallery__item', {
  autoAlpha: 0,
  y: 24,
  stagger: 0.07,
  duration: 0.6,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.gallery-grid',
    start: 'top 85%',
    toggleActions: 'play none none none',
    once: true
  }
});

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  console.log('Formulari enviat:', data);

  gsap.to(contactForm, {
    autoAlpha: 0.5,
    duration: 0.2,
    onComplete: () => {
      gsap.to(contactForm, {
        autoAlpha: 1,
        duration: 0.2
      });
    }
  });

  contactForm.reset();
});
