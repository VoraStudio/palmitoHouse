// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Sync Lenis with ScrollTrigger
lenis.on("scroll", () => ScrollTrigger.update());

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Register GSAP Plugins safely
if (typeof SplitText !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
} else {
  gsap.registerPlugin(ScrollTrigger);
}

window.activeSplits = [];
window.titleSplits = [];

function initTextMaskAnimations() {
  const textElements = document.querySelectorAll(
    ".casa__text, .casa__signature-text, .rooms__lead, .services__lead, .activities__lead, .reviews__lead, .booking__lead, .cta-section__text",
  );

  if (window.activeSplits && window.activeSplits.length > 0) {
    window.activeSplits.forEach((s) => {
      if (typeof s.revert === "function") {
        s.revert();
      }
    });
    window.activeSplits = [];
  }

  textElements.forEach((el) => {
    if (typeof SplitText !== "undefined") {
      const split = new SplitText(el, { type: "lines", linesClass: "line-parent" });

      window.activeSplits.push(split);

      gsap.set(split.lines, {
        perspective: 800,
        transformStyle: "preserve-3d",
        overflow: "hidden",
        transformOrigin: "top center",
      });

      gsap.set(split.lines, {
        opacity: 0,
        rotationX: -90,
      });

      gsap.to(split.lines, {
        duration: 1.8,
        opacity: 1,
        rotationX: 0,
        ease: "power3.out",
        stagger: {
          each: 0.2,
          from: "start",
        },
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none play reverse",
        },
      });
    } else {
      const originalHTML = el.getAttribute("data-original-html") || el.innerHTML;
      el.setAttribute("data-original-html", originalHTML);

      let linesHTML = [];
      if (originalHTML.includes("<br")) {
        const parts = originalHTML.split(/<br\s*\/?>/i);
        linesHTML = parts.map(
          (part) =>
            `<div class="line-parent" style="overflow:hidden;"><div class="line-child" style="display:block; will-change:transform; perspective:800px;">${part}</div></div>`,
        );
        el.innerHTML = linesHTML.join("");
      } else {
        const text = el.textContent.trim().replace(/\s+/g, " ");
        const words = text.split(" ");

        el.innerHTML = words.map((w) => `<span class="fallback-word" style="display:inline-block;">${w}</span>`).join(" ");

        const wordSpans = el.querySelectorAll(".fallback-word");
        const linesMap = new Map();

        wordSpans.forEach((span) => {
          const top = span.offsetTop;
          if (!linesMap.has(top)) {
            linesMap.set(top, []);
          }
          linesMap.get(top).push(span.textContent);
        });

        let newHTML = "";
        linesMap.forEach((wordsInLine) => {
          const lineText = wordsInLine.join(" ");
          newHTML += `<div class="line-parent" style="overflow:hidden; perspective:800px;"><div class="line-child" style="display:block; will-change:transform; transform-origin:top center; transform-style:preserve-3d;">${lineText}</div></div>`;
        });

        el.innerHTML = newHTML;
      }

      const lines = el.querySelectorAll(".line-child");

      window.activeSplits.push({
        revert: () => {
          el.innerHTML = originalHTML;
        },
      });

      gsap.set(lines, { opacity: 0, rotationX: -90 });
      gsap.to(lines, {
        duration: 1.4,
        opacity: 1,
        rotationX: 0,
        ease: "power3.out",
        stagger: { each: 0.15, from: "center" },
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none play reverse",
        },
      });
    }
  });
}

function initSectionTitleAnimations() {
  const titles = document.querySelectorAll(".section__title");

  if (window.titleSplits && window.titleSplits.length > 0) {
    window.titleSplits.forEach((s) => {
      if (typeof s.revert === "function") {
        s.revert();
      }
    });
    window.titleSplits = [];
  }

  if (typeof SplitText === "undefined") return;

  titles.forEach((el) => {
    const split = new SplitText(el, {
      type: "chars, lines",
    });

    window.titleSplits.push(split);

    gsap.set(split.lines, {
      perspective: 800,
      transformStyle: "preserve-3d",
      overflow: "hidden",
    });

    gsap.set(split.chars, {
      opacity: 0,
      rotationX: -90,
      transformOrigin: "top center",
    });

    gsap.to(split.chars, {
      duration: 0.6,
      opacity: 1,
      rotationX: 0,
      ease: "power3.out",
      stagger: {
        each: 0.03,
        from: "start",
      },
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none play reverse",
      },
    });
  });
}

const i18n = {
  ca: {
    "nav.house": "La casa",
    "nav.rooms": "Habitacions",
    "nav.services": "Serveis",
    "nav.activities": "Activitats",
    "nav.attractions": "Atraccions",
    "nav.gallery": "Entorn",
    "nav.reviews": "Comentaris",
    "nav.contact": "Contacte",
    "nav.book": "Reservar",
    "hero.label": "Refugi Rural Exclusiu",
    "hero.description":
      "Més que una estada, una immersió total en la calma. Gaudeix de la màxima exclusivitat en un entorn on el temps es deté i el servei personalitzat és la nostra prioritat.",
    "hero.cta_link": "Comença el teu viatge",
    "about.label": "Sobre la casa",
    "about.title": "Un refugi privat<br /><em>en plena natura</em>",
    "about.lead":
      "Palmito House es troba a Les Planes d'Hostoles, un tranquil poble de muntanya prop de Girona. A prop dels Pirineus i a prop de Barcelona i les platges de la Costa Brava, és el lloc perfecte per relaxar-se i gaudir de la bellesa dels seus voltants.<br /><br />Pot allotjar 8 persones en 4 habitacions dobles i disposa d'un gran jardí i una espectacular piscina. Un espai pensat per desconnectar i gaudir dels paisatges i atractius turístics dels voltants.",
    "about.signature": "Benvinguts a casa seva.",
    "about.cta": "Reserva la teva estada",
    "about.feature1.title": "4 habitacions dobles",
    "about.feature1.text": "Per a estades còmodes en grups o famílies",
    "about.feature2.title": "Piscina exterior i jardí ampli",
    "about.feature2.text": "Envoltada de natura i silenci",
    "about.feature3.title": "Ubicació privilegiada",
    "about.feature3.text": "Entre Girona, la Garrotxa i la Costa Brava",
    "stats.rooms": "Habitacions dobles",
    "stats.experience": "Anys d'experiència",
    "stats.guests": "Hostes feliços",
    "stats.rating": "Valoració mitjana",
    "rooms.label": "Habitacions",
    "rooms.title": "Les&nbsp;quatre&nbsp;habitacions&nbsp;dobles<br /><em>per al teu relax</em>",
    "rooms.lead": "Les&nbsp;quatre&nbsp;habitacions&nbsp;dobles us proporcionaran el relax desitjat durant la vostra estada.",
    "rooms.room1.title": "Habitació Doble Superior",
    "rooms.room1.text": "Llit king size, bany privat, vistes al jardí i decoració rústica amb toc modern.",
    "rooms.room2.title": "Habitació amb Balcó",
    "rooms.room2.text": "Balcó privat amb vistes a la muntanya, llit doble i espai de treball.",
    "rooms.room3.title": "Suite Familiar",
    "rooms.room3.text": "Dos ambients connectats, ideal per a famílies amb nens. Capacitat per a 4 persones.",
    "rooms.room4.title": "Habitació Garden View",
    "rooms.room4.text": "Accés directe al jardí, llit doble i una atmosfera de calma absoluta.",
    "services.label": "Experiència Palmito",
    "services.title": "Tot el que<br /><em>necessites per brillar</em>",
    "services.lead":
      "El nostre objectiu és que no hagis de pensar en res més que en gaudir. Oferim una gamma de serveis exclusius dissenyats per fer la teva estada el més relaxada possible.",
    "services.service1.title": "Casa",
    "services.service1.text": "Completa amb sales grans, cuina equipada i garatge",
    "services.service2.title": "Jardí",
    "services.service2.text": "Ampli verd, barbacoa de pedra i zona de jocs",
    "services.service3.title": "Piscina",
    "services.service3.text": "Privada exterior amb zona d'ombra i gandules",
    "services.service4.title": "Vistes",
    "services.service4.text": "Espectaculars a la muntanya i entorn natural",
    "services.service5.title": "Ubicació",
    "services.service5.text": "Poble tranquil de muntanya, a prop de Girona",
    "services.service6.title": "Servei de menjar",
    "services.service6.text": "Cuina equipada i càtering sota petició",
    "services.service7.title": "Rentadora",
    "services.service7.text": "Rentadora i assecadora disponibles",
    "services.service8.title": "Mascotes",
    "services.service8.text": "Benvingudes, consulteu condicions prèviament",
    "services.service9.title": "Parquing",
    "services.service9.text": "Places d'aparcament privades dins la finca",
    "services.service10.title": "Dormitoris",
    "services.service10.text": "Quatre dobles amb llit gran i roba de qualitat",
    "services.service11.title": "Estudi",
    "services.service11.text": "Espai tranquil per treballar o llegir",
    "services.service12.title": "WiFi",
    "services.service12.text": "Connexió d'alta velocitat a tota la finca",
    "activities.label": "Activitats per fer",
    "activities.title": "Descobreix el que<br /><em>la Garrotxa té per a tu</em>",
    "activities.lead":
      "Des de l'adrenalina del parapent fins a la calma dels banys al riu, seleccionem les millors experiències perquè connectis amb la terra i amb tu mateix.",
    "activities.activity1.title": "Banys al riu",
    "activities.activity1.desc": "Gorgues naturals d'aigua cristal·lina",
    "activities.activity2.title": "Sortides en bicicleta",
    "activities.activity3.title": "Passejos a cavall",
    "activities.activity3.desc": "Explora els paisatges a cavall",
    "activities.activity4.title": "Parapent",
    "activities.activity4.desc": "Vola sobre la Garrotxa",
    "activities.activity5.title": "Passejos en globus",
    "activities.activity5.desc": "Vistes panoràmiques des del cel",
    "activities.activity6.title": "Esquí",
    "activities.activity7.title": "Senderisme",
    "activities.activity7.desc": "Rutes per la zona volcànica",
    "activities.activity8.title": "Golf",
    "activities.activity9.title": "Gastronomia",
    "activities.activity9.desc": "Cuina local i productes de la terra",
    "activities.activity10.title": "Girona",
    "activities.activity10.desc": "La ciutat dels quatre rius",
    "veure.card1.title": "Girona",
    "veure.card1.desc": "La ciutat dels quatre rius, plena d'història i cultura",
    "veure.card2.title": "Barcelona",
    "veure.card2.desc": "Capital cosmopolita amb art, platja i vida nocturna",
    "veure.card3.title": "Figueres",
    "veure.card3.desc": "Bressol de Dalí i tresor cultural de l'Alt Empordà",
    "veure.card4.title": "Pirineus",
    "veure.card4.desc": "Muntanyes majestuoses i paisatges d'alta muntanya",
    "veure.card5.title": "Garrotxa",
    "veure.card5.desc": "Paratge volcànic i boscos de somni",
    "veure.card6.title": "Costa Brava",
    "veure.card6.desc": "Cales d'aigües turquesa i pobles mariners",
    "veure.label": "Explora l'Entorn",
    "veure.title": "Descobreix el que el<br /><em>Gironès té per a tu</em>",
    "attractions.label": "Atraccions turístiques",
    "attractions.title": "Alrededores<br /><em>per descobrir</em>",
    "attractions.attraction1.title": "Alrededores",
    "attractions.attraction4.title": "Pirineus",
    "attractions.attraction5.title": "Costa Brava",
    "attractions.attraction5.desc": "Cales d'aigües turquesa",
    "reviews.label": "Comentaris",
    "reviews.title": "El que diuen<br /><em>els nostres hostes</em>",
    "reviews.cta": "Veure totes les ressenyes",
    "reviews.review1.name": "Toni",
    "reviews.review1.text": "\"La casa és igual que a les fotos, molt bonica, ordenat tot i net. Hem passat uns dies increïbles tot i que per a les nostres dates plogués tots els dies. Molt content amb la casa. Per passar temps amb família o amics és genial, sense soroll. Ideal per descansar i relaxar-se. Recomano 100%.\"",
    "reviews.review2.name": "Sergio",
    "reviews.review2.text": "\"Increïble casa, amb un preciós jardí, piscina i també a prop de llocs per fer senderisme. Recomanat\"",
    "reviews.review3.name": "Auriane",
    "reviews.review3.text": "\"Vam passar unes vacances meravelloses en un entorn preciós! Les botigues a peu i Girona a 40 minuts són un veritable avantatge per a la casa. Ho recomanem\"",
    "reviews.review4.name": "Edith",
    "reviews.review4.text": "\"Tot espectacular. Un jardí preciós i unes vistes increïbles.\"",
    "reviews.review5.name": "Daan",
    "reviews.review5.text": "\"Una preciosa vila amb una bonica piscina i zona a l'aire lliure on es pot menjar a l'aire lliure amb bona companyia\"",
    "reviews.review6.name": "Ali",
    "reviews.review6.text": "\"Vam passar una estada agradable, els nens van gaudir de la piscina. Bon moment\"",
    "contact.label": "Fes el primer pas",
    "contact.title": "Reserva la teva<br /><em>experiència</em>",
    "contact.lead":
      "Estem aquí per ajudar-te a planificar la teva escapada ideal. Contacta amb nosaltres per a una atenció totalment personalitzada i detalls exclusius.",
    "contact.address.title": "Adreça",
    "contact.address.text": "Passeig Rebuscall, 13<br />Les Planes d'Hostoles<br />17172 Girona, Spain",
    "contact.phone.title": "Telèfon",
    "contact.email.title": "Email",
    "contact.form.name": "Nom complet",
    "contact.form.name_placeholder": "El teu nom",
    "contact.form.email": "Email",
    "contact.form.email_placeholder": "tu@email.com",
    "contact.form.phone": "Telèfon de contacte",
    "contact.form.phone_placeholder": "+34 600 000 000",
    "contact.form.message": "Missatge",
    "contact.form.message_placeholder": "Explica'ns què necessites...",
    "contact.form.submit": "Enviar consulta",
    "contact.form.privacy": "He llegit i accepto la <a href='#'>política de privacitat</a>.",
    "footer.text": "On l'exclusivitat troba la seva essència natural. La teva llar lluny de casa, al cor de la Garrotxa.",
    "footer.copy": "© 2026 Palmito House. Tots els drets reservats.",
    "footer.design": "Dissenyat per Vora Studio",
  },
  es: {
    "nav.house": "La casa",
    "nav.rooms": "Habitaciones",
    "nav.services": "Servicios",
    "nav.activities": "Actividades",
    "nav.attractions": "Atracciones",
    "nav.gallery": "Entorno",
    "nav.reviews": "Comentarios",
    "nav.contact": "Contacto",
    "nav.book": "Reservar",
    "hero.label": "Casa rural exclusiva",
    "hero.description":
      "Escápate. Respira. Desconecta de verdad. Una casa exclusiva entre montaña, naturaleza y silencio, a pocos minutos de Girona y la Costa Brava.",
    "hero.cta_link": "Reserva tu estancia",
    "about.label": "Sobre la casa",
    "about.title": "Un refugio privado<br /><em>en plena naturaleza</em>",
    "about.lead":
      "Palmito House está situada en Les Planes d'Hostoles, un tranquilo pueblo de montaña cerca de Girona. Cerca de los Pirineos y próximo a Barcelona y las playas de la Costa Brava, es el lugar perfecto para relajarse y disfrutar de la belleza de sus alrededores.<br /><br />Puede alojar 8 personas en 4 habitaciones dobles y tiene un gran jardín y una espectacular piscina. Un espacio pensado para desconectar y disfrutar de los paisajes y atractivos turísticos cercanos.",
    "about.signature": "Bienvenidos a su casa.",
    "about.cta": "Reserva tu estancia",
    "about.feature1.title": "4 habitaciones dobles",
    "about.feature1.text": "Para estancias cómodas en grupos o familias",
    "about.feature2.title": "Piscina exterior y jardín amplio",
    "about.feature2.text": "Rodeada de naturaleza y silencio",
    "about.feature3.title": "Ubicación privilegiada",
    "about.feature3.text": "Entre Girona, la Garrotxa y la Costa Brava",
    "stats.rooms": "Habitaciones dobles",
    "stats.experience": "Años de experiencia",
    "stats.guests": "Huéspedes felices",
    "stats.rating": "Valoración media",
    "rooms.label": "Habitaciones",
    "rooms.title": "Las cuatro habitaciones dobles<br /><em>para tu relax</em>",
    "rooms.lead": "Las&nbsp;cuatro&nbsp;habitaciones&nbsp;dobles le proporcionarán el relax deseado durante su estancia.",
    "rooms.room1.title": "Habitación Doble Superior",
    "rooms.room1.text": "Cama king size, baño privado, vistas al jardín y decoración rústica con toque moderno.",
    "rooms.room2.title": "Habitación con Balcón",
    "rooms.room2.text": "Balcón privado con vistas a la montaña, cama doble y espacio de trabajo.",
    "rooms.room3.title": "Suite Familiar",
    "rooms.room3.text": "Dos ambientes conectados, ideal para familias con niños. Capacidad para 4 personas.",
    "rooms.room4.title": "Habitación Garden View",
    "rooms.room4.text": "Acceso directo al jardín, cama doble y una atmósfera de calma absoluta.",
    "services.label": "Experiencia Palmito",
    "services.title": "Todo lo que<br /><em>necesitas para brillar</em>",
    "services.lead":
      "Nuestro objetivo es que no tengas que pensar en nada más que en disfrutar. Ofrecemos una gama de servicios exclusivos diseñados para hacer tu estancia lo más relajada posible.",
    "services.service1.title": "Casa",
    "services.service1.text": "Completa con salas grandes, cocina equipada y garaje",
    "services.service2.title": "Jardín",
    "services.service2.text": "Amplio verde, barbacoa de piedra y zona de juegos",
    "services.service3.title": "Piscina",
    "services.service3.text": "Privada exterior con zona de sombra y hamacas",
    "services.service4.title": "Vistas",
    "services.service4.text": "Espectaculares a la montaña y entorno natural",
    "services.service5.title": "Ubicación",
    "services.service5.text": "Pueblo tranquilo de montaña, cerca de Girona",
    "services.service6.title": "Servicio de comida",
    "services.service6.text": "Cocina equipada y catering bajo petición",
    "services.service7.title": "Lavandería",
    "services.service7.text": "Lavadora y secadora disponibles",
    "services.service8.title": "Mascotas",
    "services.service8.text": "Bienvenidas, consultad condiciones previamente",
    "services.service9.title": "Aparcamiento",
    "services.service9.text": "Plazas de aparcamiento privadas en la finca",
    "services.service10.title": "Dormitorios",
    "services.service10.text": "Cuatro dobles con cama grande y ropa de calidad",
    "services.service11.title": "Estudio",
    "services.service11.text": "Espacio tranquilo para trabajar o leer",
    "services.service12.title": "WiFi",
    "services.service12.text": "Conexión de alta velocidad en toda la finca",
    "activities.label": "Actividades para hacer",
    "activities.title": "Descubre lo que<br /><em>la Garrotxa tiene para ti</em>",
    "activities.lead":
      "Desde la adrenalina del paracaidismo hasta la calma de los baños en el río, seleccionamos las mejores experiencias para que conectes con la tierra y contigo mismo.",
    "activities.activity1.title": "Baños en el río",
    "activities.activity1.desc": "Gorgues naturales de agua cristalina",
    "activities.activity2.title": "Salidas en bicicleta",
    "activities.activity3.title": "Paseos a caballo",
    "activities.activity3.desc": "Explora los paisajes a caballo",
    "activities.activity4.title": "Parapente",
    "activities.activity4.desc": "Vuela sobre la Garrotxa",
    "activities.activity5.title": "Paseos en globo",
    "activities.activity5.desc": "Vistas panorámicas desde el cielo",
    "activities.activity6.title": "Ski",
    "activities.activity7.title": "Senderismo",
    "activities.activity7.desc": "Rutas por la zona volcánica",
    "activities.activity8.title": "Golf",
    "activities.activity9.title": "Gastronomía",
    "activities.activity9.desc": "Cocina local y productos de la tierra",
    "activities.activity10.title": "Girona",
    "activities.activity10.desc": "La ciudad de los cuatro ríos",
    "veure.card1.title": "Girona",
    "veure.card1.desc": "La ciudad de los cuatro ríos, llena de historia y cultura",
    "veure.card2.title": "Barcelona",
    "veure.card2.desc": "Capital cosmopolita con arte, playa y vida nocturna",
    "veure.card3.title": "Figueres",
    "veure.card3.desc": "Cuna de Dalí y tesoro cultural del Alt Empordà",
    "veure.card4.title": "Pirineos",
    "veure.card4.desc": "Montañas majestuosas y paisajes de alta montaña",
    "veure.card5.title": "Garrotxa",
    "veure.card5.desc": "Paisaje volcánico y bosques de ensueño",
    "veure.card6.title": "Costa Brava",
    "veure.card6.desc": "Calas de aguas turquesa y pueblos marineros",
    "veure.label": "Explora el Entorno",
    "veure.title": "Descubre lo que el<br /><em>Gironès tiene para ti</em>",
    "attractions.label": "Atracciones turísticas",
    "attractions.title": "Alrededores<br /><em>por descubrir</em>",
    "attractions.attraction1.title": "Alrededores",
    "attractions.attraction4.title": "Pirineos",
    "attractions.attraction5.title": "Costa Brava",
    "attractions.attraction5.desc": "Calas de aguas turquesa",
    "reviews.label": "Comentarios",
    "reviews.title": "Lo que dicen<br /><em>nuestros huéspedes</em>",
    "reviews.cta": "Ver todas las reseñas",
    "reviews.review1.name": "Toni",
    "reviews.review1.text": "\"La casa es igual que en las fotos, muy bonito, ordenado todo y limpio. Hemos pasado unos días increíbles a pesar de que para nuestras fechas lloviera todos los días. Muy contento con la casa. Para pasar tiempo con familia o amigos es genial, sin ruido. Ideal para descansar y relajar. Recomiendo 100%.\"",
    "reviews.review2.name": "Sergio",
    "reviews.review2.text": "\"Increíble casa, con un precioso jardín, piscina y también cerca de lugares para hacer senderismo. Recomendado\"",
    "reviews.review3.name": "Auriane",
    "reviews.review3.text": "\"¡Pasamos unas vacaciones maravillosas en un entorno precioso! Las tiendas a pie y Gerona a 40 minutos son una verdadera ventaja para la casa. Lo recomendamos\"",
    "reviews.review4.name": "Edith",
    "reviews.review4.text": "\"Todo espectacular. Un jardín precioso y unas vistas increíbles.\"",
    "reviews.review5.name": "Daan",
    "reviews.review5.text": "\"Una hermosa villa con una hermosa piscina y zona al aire libre donde se puede comer al aire libre con una buena compañía\"",
    "reviews.review6.name": "Ali",
    "reviews.review6.text": "\"Pasamos una estancia agradable, los niños disfrutaron de la piscina. Gran momento\"",
    "contact.label": "Da el primer paso",
    "contact.title": "Reserva tu<br /><em>experiencia</em>",
    "contact.lead":
      "Estamos aquí para ayudarte a planificar tu escapada ideal. Contacta con nosotros para una atención totalmente personalizada y detalles exclusivos.",
    "contact.address.title": "Dirección",
    "contact.address.text": "Passeig Rebuscall, 13<br />Les Planes d'Hostoles<br />17172 Girona, Spain",
    "contact.phone.title": "Teléfono",
    "contact.email.title": "Email",
    "contact.form.name": "Nombre completo",
    "contact.form.name_placeholder": "Tu nombre",
    "contact.form.email": "Email",
    "contact.form.email_placeholder": "tu@email.com",
    "contact.form.phone": "Teléfono de contacto",
    "contact.form.phone_placeholder": "+34 600 000 000",
    "contact.form.message": "Mensaje",
    "contact.form.message_placeholder": "Cuéntanos qué necesitas...",
    "contact.form.submit": "Enviar consulta",
    "contact.form.privacy": "He leído y acepto la <a href='#'>política de privacidad</a>.",
    "footer.text": "Donde la exclusividad encuentra su esencia natural. Tu hogar lejos de casa, en el corazón de la Garrotxa.",
    "footer.copy": "© 2026 Palmito House. Todos los derechos reservados.",
    "footer.design": "Diseñado por Vora Studio",
  },
  en: {
    "nav.house": "The house",
    "nav.rooms": "Rooms",
    "nav.services": "Services",
    "nav.activities": "Activities",
    "nav.attractions": "Attractions",
    "nav.gallery": "Surroundings",
    "nav.reviews": "Reviews",
    "nav.contact": "Contact",
    "nav.book": "Book now",
    "hero.label": "Exclusive Rural Retreat",
    "hero.description":
      "More than a stay, a total immersion in calm. Enjoy the ultimate exclusivity in an environment where time stops and personalized service is our priority.",
    "hero.cta_link": "Start your journey",
    "about.label": "About the house",
    "about.title": "A private retreat<br /><em>in the heart of nature</em>",
    "about.lead":
      "Palmito House is located in Les Planes d'Hostoles, a quiet mountain village near Girona. Close to the Pyrenees and near Barcelona and the beaches of the Costa Brava, it's the perfect place to relax and enjoy the beauty of its surroundings.<br /><br />It sleeps 8 people in 4 double rooms and has a large garden and a spectacular pool. A space designed to disconnect and enjoy the landscapes and nearby tourist attractions.",
    "about.signature": "Welcome to your home.",
    "about.cta": "Book your stay",
    "about.feature1.title": "4 double rooms",
    "about.feature1.text": "For comfortable stays in groups or families",
    "about.feature2.title": "Outdoor pool & large garden",
    "about.feature2.text": "Surrounded by nature and silence",
    "about.feature3.title": "Prime location",
    "about.feature3.text": "Between Girona, Garrotxa and Costa Brava",
    "stats.rooms": "Double rooms",
    "stats.experience": "Years of experience",
    "stats.guests": "Happy guests",
    "stats.rating": "Average rating",
    "rooms.label": "Rooms",
    "rooms.title": "Four double rooms<br /><em>for your relaxation</em>",
    "rooms.lead": "The&nbsp;four&nbsp;double&nbsp;rooms will provide you with the desired relaxation during your stay.",
    "rooms.room1.title": "Superior Double Room",
    "rooms.room1.text": "King size bed, private bathroom, garden views and rustic decor with a modern touch.",
    "rooms.room2.title": "Room with Balcony",
    "rooms.room2.text": "Private balcony with mountain views, double bed and workspace.",
    "rooms.room3.title": "Family Suite",
    "rooms.room3.text": "Two connected spaces, ideal for families with children. Capacity for 4 people.",
    "rooms.room4.title": "Garden View Room",
    "rooms.room4.text": "Direct garden access, double bed and an atmosphere of absolute calm.",
    "services.label": "The Palmito Experience",
    "services.title": "Everything you<br /><em>need to shine</em>",
    "services.lead":
      "Our goal is for you not to have to think about anything but enjoying yourself. We offer a range of exclusive services designed to make your stay as relaxed as possible.",
    "services.service1.title": "House",
    "services.service1.text": "Full house with large rooms, equipped kitchen and garage",
    "services.service2.title": "Garden",
    "services.service2.text": "Large green area, stone BBQ and games zone",
    "services.service3.title": "Pool",
    "services.service3.text": "Private outdoor with shaded area and sun loungers",
    "services.service4.title": "Views",
    "services.service4.text": "Stunning mountain views and natural surroundings",
    "services.service5.title": "Location",
    "services.service5.text": "Peaceful mountain village, close to Girona",
    "services.service6.title": "Meal service",
    "services.service6.text": "Equipped kitchen and catering on request",
    "services.service7.title": "Laundry",
    "services.service7.text": "Washing machine and dryer available",
    "services.service8.title": "Pets",
    "services.service8.text": "Welcome, please check conditions beforehand",
    "services.service9.title": "Parking",
    "services.service9.text": "Private parking spaces within the property",
    "services.service10.title": "Bedrooms",
    "services.service10.text": "Four doubles with large beds and quality bedding",
    "services.service11.title": "Study",
    "services.service11.text": "Quiet space to work or read",
    "services.service12.title": "WiFi",
    "services.service12.text": "High-speed connection throughout the property",
    "activities.label": "Things to do",
    "activities.title": "Discover what<br /><em>Garrotxa has for you</em>",
    "activities.lead":
      "From the adrenaline of paragliding to the calm of river bathing, we select the best experiences for you to connect with the land and yourself.",
    "activities.activity1.title": "River bathing",
    "activities.activity1.desc": "Natural crystal-clear pools",
    "activities.activity2.title": "Bike tours",
    "activities.activity3.title": "Horse riding",
    "activities.activity3.desc": "Explore the landscapes on horseback",
    "activities.activity4.title": "Paragliding",
    "activities.activity4.desc": "Fly over Garrotxa",
    "activities.activity5.title": "Hot air balloon",
    "activities.activity5.desc": "Panoramic views from the sky",
    "activities.activity6.title": "Skiing",
    "activities.activity7.title": "Hiking",
    "activities.activity7.desc": "Volcanic zone trails",
    "activities.activity8.title": "Golf",
    "activities.activity9.title": "Gastronomy",
    "activities.activity9.desc": "Local cuisine and farm produce",
    "activities.activity10.title": "Girona",
    "activities.activity10.desc": "The city of four rivers",
    "veure.card1.title": "Girona",
    "veure.card1.desc": "The city of four rivers, full of history and culture",
    "veure.card2.title": "Barcelona",
    "veure.card2.desc": "Cosmopolitan capital with art, beach and nightlife",
    "veure.card3.title": "Figueres",
    "veure.card3.desc": "Birthplace of Dalí and cultural treasure of Alt Empordà",
    "veure.card4.title": "Pyrenees",
    "veure.card4.desc": "Majestic mountains and high-altitude landscapes",
    "veure.card5.title": "Garrotxa",
    "veure.card5.desc": "Volcanic landscape and dreamlike forests",
    "veure.card6.title": "Costa Brava",
    "veure.card6.desc": "Turquoise coves and seaside villages",
    "veure.label": "Explore the Area",
    "veure.title": "Discover what<br /><em>Gironès has for you</em>",
    "attractions.label": "Tourist attractions",
    "attractions.title": "Surroundings<br /><em>to discover</em>",
    "attractions.attraction1.title": "Surroundings",
    "attractions.attraction4.title": "Pyrenees",
    "attractions.attraction5.title": "Costa Brava",
    "attractions.attraction5.desc": "Turquoise coves and beaches",
    "reviews.label": "Reviews",
    "reviews.title": "What our<br /><em>guests say</em>",
    "reviews.cta": "See all reviews",
    "reviews.review1.name": "Toni",
    "reviews.review1.text": "\"The house is just like in the photos, very nice, tidy and clean. We had an incredible stay even though it rained every day during our dates. Very happy with the house. Great for spending time with family or friends, no noise. Ideal for resting and relaxing. 100% recommended.\"",
    "reviews.review2.name": "Sergio",
    "reviews.review2.text": "\"Incredible house, with a beautiful garden, pool and also close to hiking spots. Recommended\"",
    "reviews.review3.name": "Auriane",
    "reviews.review3.text": "\"We had wonderful holidays in a beautiful setting! Shops within walking distance and Girona 40 minutes away are a real advantage for the house. We recommend it\"",
    "reviews.review4.name": "Edith",
    "reviews.review4.text": "\"Everything spectacular. A beautiful garden and incredible views.\"",
    "reviews.review5.name": "Daan",
    "reviews.review5.text": "\"A beautiful villa with a lovely pool and outdoor area where you can dine al fresco with good company\"",
    "reviews.review6.name": "Ali",
    "reviews.review6.text": "\"We had a pleasant stay, the children enjoyed the pool. Great time\"",
    "contact.label": "Take the first step",
    "contact.title": "Book your<br /><em>experience</em>",
    "contact.lead": "We are here to help you plan your ideal getaway. Contact us for fully personalized attention and exclusive details.",
    "contact.address.title": "Address",
    "contact.address.text": "Passeig Rebuscall, 13<br />Les Planes d'Hostoles<br />17172 Girona, Spain",
    "contact.phone.title": "Phone",
    "contact.email.title": "Email",
    "contact.form.name": "Full name",
    "contact.form.name_placeholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.email_placeholder": "you@email.com",
    "contact.form.phone": "Contact phone",
    "contact.form.phone_placeholder": "+34 600 000 000",
    "contact.form.message": "Message",
    "contact.form.message_placeholder": "Tell us what you need...",
    "contact.form.submit": "Send inquiry",
    "contact.form.privacy": "I have read and accept the <a href='#'>privacy policy</a>.",
    "footer.text": "Where exclusivity meets its natural essence. Your home away from home, in the heart of Garrotxa.",
    "footer.copy": "© 2026 Palmito House. All rights reserved.",
    "footer.design": "Designed by Vora Studio",
  },
};

const flags = {
  ca: "",
  es: "🇪",
  en: "🇬",
};

let currentLang = "ca";

function setLanguage(lang) {
  if (window.activeSplits && window.activeSplits.length > 0) {
    window.activeSplits.forEach((s) => {
      if (typeof s.revert === "function") {
        s.revert();
      }
    });
    window.activeSplits = [];
  }

  if (window.titleSplits && window.titleSplits.length > 0) {
    window.titleSplits.forEach((s) => {
      if (typeof s.revert === "function") {
        s.revert();
      }
    });
    window.titleSplits = [];
  }

  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang] && i18n[lang][key]) {
      el.innerHTML = i18n[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (i18n[lang] && i18n[lang][key]) {
      el.placeholder = i18n[lang][key];
    }
  });

  document.querySelectorAll(".lang-switcher__current").forEach((el) => {
    el.textContent = lang.toUpperCase();
  });

  document.querySelectorAll("[data-current-flag]").forEach((el) => {
    el.textContent = flags[lang];
  });

  document.querySelectorAll(".lang-switcher__option").forEach((btn) => {
    btn.classList.toggle("lang-switcher__option--active", btn.getAttribute("data-lang") === lang);
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("lang-btn--active", btn.getAttribute("data-lang") === lang);
  });

  const currentFlagEl = document.getElementById("current-flag");
  if (currentFlagEl) {
    currentFlagEl.className = `lang-switcher__flag lang-switcher__flag--${lang}`;
  }

  localStorage.setItem("palmito-lang", lang);

  initTextMaskAnimations();
  initSectionTitleAnimations();
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    setLanguage(btn.getAttribute("data-lang"));
  });
});

const savedLang = localStorage.getItem("palmito-lang");
if (savedLang && i18n[savedLang]) {
  setLanguage(savedLang);
} else {
  initTextMaskAnimations();
  initSectionTitleAnimations();
}

const navToggle = document.querySelector(".nav__toggle");
const navMobile = document.querySelector(".nav__mobile");
const mobileLinks = document.querySelectorAll(".nav__mobile-link");

function getFocusableElements(container) {
  return container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
}

function trapFocus(container) {
  const focusable = getFocusableElements(container);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  first.focus();

  function handler(e) {
    if (e.key !== "Tab") return;
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

  container.addEventListener("keydown", handler);
  return () => container.removeEventListener("keydown", handler);
}

let mobileMenuTL = null;
let releaseTrap = null;

const mobileCloseBtn = document.querySelector(".nav__mobile-close");

function openMobileMenu() {
  if (mobileMenuTL) mobileMenuTL.kill();

  gsap.set(navMobile, { x: "100%", visibility: "visible" });
  navToggle.classList.add("nav__toggle--active");
  navToggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  releaseTrap = trapFocus(navMobile);

  mobileMenuTL = gsap
    .timeline()
    .to(navMobile, { x: "0%", duration: 0.6, ease: "power4.out" })
    .fromTo(".nav__mobile-link", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }, "-=0.3")
    .fromTo(".nav__mobile-close", { autoAlpha: 0, rotate: -45 }, { autoAlpha: 1, rotate: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");
}

function closeMobileMenu() {
  if (mobileMenuTL) mobileMenuTL.kill();

  navToggle.classList.remove("nav__toggle--active");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  if (releaseTrap) {
    releaseTrap();
    releaseTrap = null;
  }

  mobileMenuTL = gsap
    .timeline({
      onComplete: () => {
        gsap.set(navMobile, { visibility: "hidden" });
        navToggle.focus();
      },
    })
    .to(".nav__mobile-link", {
      autoAlpha: 0,
      y: -10,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.in",
    })
    .to(navMobile, { x: "100%", duration: 0.5, ease: "power4.in" }, "-=0.15");
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.classList.contains("nav__toggle--active");
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

if (mobileCloseBtn) {
  mobileCloseBtn.addEventListener("click", closeMobileMenu);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navToggle.classList.contains("nav__toggle--active")) {
    closeMobileMenu();
  }
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("href");
    lenis.scrollTo(target);
    closeMobileMenu();
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = this.getAttribute("href");
    if (target && target !== "#") {
      lenis.scrollTo(target);
    }
  });
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

sections.forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => updateActiveLink(section.id),
    onEnterBack: () => updateActiveLink(section.id),
  });
});

function updateActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("nav__link--active", link.getAttribute("href") === `#${id}`);
  });
}

gsap.defaults({ ease: "power3.out" });

// Header entrance animation
gsap.set(".header", { autoAlpha: 0 });

const headerTL = gsap.timeline({ delay: 0.05 });
headerTL
  .to(".header", { autoAlpha: 1, duration: 0.3, ease: "power2.out" })
  .from(".header__logo", { y: -24, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, "-=0.1")
  .from(".nav__link", { y: -20, autoAlpha: 0, stagger: 0.06, duration: 0.5, ease: "power3.out" }, "-=0.35")
  .from(".lang-btn, .nav__cta, .nav__toggle", { y: -20, autoAlpha: 0, stagger: 0.06, duration: 0.5, ease: "power3.out" }, "-=0.3");

// Escritori!!!!
gsap.matchMedia().add("(min-width: 768px)", () => {
  const heroTL = gsap.timeline({ delay: 0.15 });

  heroTL
    //Introducció titol
    .from(".hero__word--palmito", { x: "-50vw", duration: 1.5, ease: "power4.out" }, 0)
    .from(".hero__word--house", { x: "48vw", duration: 1.5, ease: "power4.out" }, 0)
    // Introducció imatge
    .fromTo(
      ".hero__inline-image",
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: "power3.out" },
      ">",
    )
    .to(
      ".hero__inline-image",
      {
        width: "100vw",
        height: "80vh",
        borderRadius: 0,
        duration: 2,
        x: "-5vw",
        y: 0,
        margin: 0,
        ease: "power3.inOut",
      },
      ">",
    )
    .to(
      ".hero__word--palmito",
      {
        x: "25.5vw",
        y: "22vh",
        scale: 0.5,
        color: "#ffffff",
        textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        duration: 2,
        ease: "power3.inOut",
      },
      "<",
    )
    .to(
      ".hero__word--house",
      {
        x: "-91vw",
        y: "22vh",
        scale: 0.5,
        color: "#ffffff",
        textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        duration: 2,
        ease: "power3.inOut",
      },
      "<",
    )
    .to(
      ".hero__bottom-text--left .hero__text-reveal-inner",
      {
        y: "0%",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      },
      "-=0.6",
    )
    .to(
      ".hero__bottom-text--right .hero__text-reveal-inner",
      {
        y: "0%",
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      },
      "-=0.9",
    )
    .fromTo(
      ".hero__cta",
      {
        autoAlpha: 0,
        x: -15,
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      },
      {
        autoAlpha: 1,
        x: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.8,
        ease: "linear",
      },
      "-=0.6",
    );
});

// Movil
gsap.matchMedia().add("(max-width: 767px)", () => {
  gsap.set(".hero__inline-image", {
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    zIndex: 0,
  });

  const heroTL = gsap.timeline({ delay: 0.15 });

  heroTL
    // Les paraules apareixen desde baix (en columna)
    .from(".hero__word--palmito", { x: "-50vw", duration: 1.5, ease: "power4.out" }, 0)
    .from(".hero__word--house", { x: "50vw", duration: 1.5, ease: "power4.out" }, 0)
    // Cortina imatge
    .fromTo(
      ".hero__inline-image",
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: "power3.out" },
      ">",
    )
    // Imatge s'expandeix
    .to(
      ".hero__inline-image",
      {
        width: "120vw",
        height: "70vh",
        borderRadius: 0,
        duration: 2,
        ease: "power3.inOut",
      },
      ">",
    )
    // Paraules canvien a blanc
    .to(
      ".hero__word--palmito",
      {
        color: "#ffffff",
        textShadow: "0 10px 40px rgba(0, 0, 0, 0.65), 0 3px 12px rgba(0, 0, 0, 0.4)",
        duration: 1.5,
        ease: "power2.inOut",
        yPercent: 20,
      },
      "<",
    )
    .to(
      ".hero__word--house",
      {
        color: "#ffffff",
        textShadow: "0 10px 40px rgba(0, 0, 0, 0.65), 0 3px 12px rgba(0, 0, 0, 0.4)",
        duration: 1.5,
        ease: "power2.inOut",
        yPercent: -20,
      },
      "<",
    )
    // Text inferior es revela (només left, right està ocult a mòbil)
    .to(
      ".hero__bottom-text--left .hero__text-reveal-inner",
      {
        y: "0%",
        duration: 1.2,
        stagger: 0.5,
        ease: "power4.out",
      },
      "-=0.6",
    )
    // CTA
    .fromTo(
      ".hero__cta",
      {
        autoAlpha: 0,
        x: -15,
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      },
      {
        autoAlpha: 1,
        x: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.8,
        ease: "linear",
      },
      "-=0.6",
    );
});

// Parallax interior de la imatge de fons al fer scroll (sin escala)
gsap.fromTo(
  ".hero__inline-image img",
  { yPercent: 0 },
  {
    yPercent: 50,
    ease: "linear",
    scrollTrigger: {
      trigger: ".section.hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  },
);

// Section labels fade-up animation
gsap.utils.toArray(".section__label").forEach((el) => {
  gsap.from(el, {
    autoAlpha: 0,
    y: 24,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none play reverse",
    },
  });
});

// Signature text reveal (chars) inside Casa section
gsap.utils.toArray(".casa__signature-text").forEach((el) => {
  const sigSplit = new SplitText(el, { type: "chars" });
  gsap.set(sigSplit.chars, { opacity: 0, y: 24, rotationX: -90, transformOrigin: "top center" });
  gsap.to(sigSplit.chars, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: 1.2,
    ease: "power3.out",
    stagger: { each: 0.04, from: "start" },
    scrollTrigger: {
      trigger: el,
      start: "top 95%",
      toggleActions: "play none play reverse",
    },
  });
});

// CTA button simple entrance from below inside Casa section
gsap.from(".casa__cta-wrapper", {
  autoAlpha: 0,
  y: 30,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".casa__cta-wrapper",
    start: "top 92%",
    toggleActions: "play none play reverse",
  },
});
gsap.set(".room-card", { transformStyle: "preserve-3d" });

gsap.utils.toArray(".room-card").forEach((card, i) => {
  gsap.from(card, {
    autoAlpha: 0,
    y: 50,
    duration: 0.8,
    delay: i * 0.15,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
});

// Set initial state for service cards to prevent flashes
gsap.set(".service-card", {
  autoAlpha: 0,
  y: 40,
  rotationX: -10,
  scale: 0.95,
  transformPerspective: 800,
  transformStyle: "preserve-3d",
});

gsap.set(".service-card", { autoAlpha: 0, transformPerspective: 800, transformStyle: "preserve-3d" });

ScrollTrigger.batch(".service-card", {
  interval: 0.15,
  batchMax: 12,
  onEnter: (elements) => {
    gsap.to(elements, {
      autoAlpha: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0.1,
      overwrite: true,
    });
  },
  onLeaveBack: (elements) => {
    gsap.set(elements, {
      autoAlpha: 0,
      y: 40,
      rotationX: -10,
      scale: 0.95,
      overwrite: true,
    });
  },
  start: "top 88%",
});

gsap.set(".activity-card", { autoAlpha: 0, scale: 0.85, rotationX: -10, y: 20, transformOrigin: "50% 100%" });

ScrollTrigger.batch(".activity-card", {
  interval: 0.1,
  batchMax: 12,
  onEnter: (elements) => {
    gsap.to(elements, {
      autoAlpha: 1,
      scale: 1,
      rotationX: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      overwrite: true,
      stagger: { each: 0.1, from: "start" },
    });
  },
  onLeaveBack: (elements) => {
    gsap.set(elements, { autoAlpha: 0, scale: 0.85, rotationX: -10, y: 20, overwrite: true });
  },
  start: "top 85%",
});

gsap.utils.toArray(".review-card").forEach((card, i) => {
  gsap.from(card, {
    autoAlpha: 0,
    y: 50,
    duration: 0.8,
    delay: i * 0.15,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
});

gsap.from(".booking__info", {
  x: -40,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".booking__layout",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});

gsap.from(".contact-form", {
  autoAlpha: 0,
  x: 40,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".booking__layout",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});

gsap.from(".footer__content", {
  autoAlpha: 0,
  y: 30,
  duration: 0.7,
  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%",
    toggleActions: "play none none reverse",
  },
});

// Casa section reveal
const casaTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".casa__layout",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});
casaTL.from(".casa__image", { autoAlpha: 0, x: -60, duration: 0.9 }).from(".casa__content", { y: 40, duration: 0.8 }, "-=0.5");

// Stats counter animation
gsap.utils.toArray(".stat").forEach((stat) => {
  const numEl = stat.querySelector(".stat__number");
  const raw = numEl.textContent;
  const targetVal = parseFloat(raw.replace("+", ""));
  const hasPlus = raw.includes("+");
  const isDecimal = targetVal % 1 !== 0;

  const proxy = { val: 0 };
  gsap.to(proxy, {
    val: targetVal,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: stat,
      start: "top 85%",
      toggleActions: "play none none reverse",
      once: true,
    },
    onUpdate: () => {
      const display = isDecimal ? proxy.val.toFixed(1) : Math.floor(proxy.val);
      numEl.textContent = hasPlus ? display + "+" : display;
    },
  });
});

// ==================== MODAL LIGHTBOX GALERIA ====================

const galleryModal = document.getElementById("gallery-modal");
if (galleryModal) {
  const gmImg = galleryModal.querySelector(".modal__image-wrapper img");
  const gmWrapper = galleryModal.querySelector(".modal__image-wrapper");
  const gmBackdrop = galleryModal.querySelector(".modal__backdrop");
  const gmClose = galleryModal.querySelector(".modal__close");
  const gmPrev = galleryModal.querySelector(".modal__nav--prev");
  const gmNext = galleryModal.querySelector(".modal__nav--next");
  const gmCounter = galleryModal.querySelector(".modal__counter");
  const gmControls = [gmClose, gmPrev, gmNext, gmCounter];
  const galleryItems = document.querySelectorAll(".gallery__item");

  let gmIndex = 0;

  // TOTS els fitxers de img/galeria/ (excepte subcarpetes)
  const ALL_GALLERY_IMAGES = [
    { src: "img/galeria/0036ccc2-a0ad-436b-8efb-9521634ef21d.avif", alt: "Palmito House" },
    { src: "img/galeria/06b22924-43b7-4a8d-8d9f-80738b76a86f.avif", alt: "Palmito House" },
    { src: "img/galeria/0ba5eaf6-94c3-42c8-b4be-4e5a5ee1430e.avif", alt: "Palmito House" },
    { src: "img/galeria/0e4430ab-cff0-4787-a6a1-1f5e384df69f.avif", alt: "Palmito House" },
    { src: "img/galeria/202bd6e9-066f-4f8a-994d-7e945718fc3b.avif", alt: "Palmito House" },
    { src: "img/galeria/230ac790-c6bf-4fd0-9839-e8d049a7ed58.avif", alt: "Palmito House" },
    { src: "img/galeria/267aa409-cd69-451f-bf13-adc63659467e.jpeg", alt: "Palmito House" },
    { src: "img/galeria/2853db95-9534-4062-a254-28f2b24020b5.avif", alt: "Palmito House" },
    { src: "img/galeria/2add523d-50a5-422a-ae3e-dbf6f1f97f13.avif", alt: "Palmito House" },
    { src: "img/galeria/2cc9cc6b-f0ce-4178-bf32-4ef16f3b5d14.avif", alt: "Palmito House" },
    { src: "img/galeria/3d0cbdb2-1c32-442a-a4a9-e8706aefd147.avif", alt: "Palmito House" },
    { src: "img/galeria/49b70f2e-d377-41a0-b28f-efd53b934a92.avif", alt: "Palmito House" },
    { src: "img/galeria/4a68ba42-f400-42c7-a93a-74d3071f664b.avif", alt: "Palmito House" },
    { src: "img/galeria/4d833e5b-ea02-4be0-bba5-93b497019880.avif", alt: "Palmito House" },
    { src: "img/galeria/500073f0-8698-43f0-b467-c1cab2540188.avif", alt: "Palmito House" },
    { src: "img/galeria/5a5e62f1-13c3-4be4-b29b-d7bad09a240d.avif", alt: "Palmito House" },
    { src: "img/galeria/631b826a-c772-43e5-9698-52954d6e258b.avif", alt: "Palmito House" },
    { src: "img/galeria/81c8fe22-3f7f-4730-aa19-676f4954c5aa.avif", alt: "Palmito House" },
    { src: "img/galeria/82ae7202-df86-42b2-a562-0ad6beae2fc0.avif", alt: "Palmito House" },
    { src: "img/galeria/8725d122-58d0-44bb-a55f-9f661a56b511.avif", alt: "Palmito House" },
    { src: "img/galeria/95db20cf-2a26-479f-b286-5bc36968072f.avif", alt: "Palmito House" },
    { src: "img/galeria/988d48be-f6b9-4704-9c43-2bc1e61e7a59.avif", alt: "Palmito House" },
    { src: "img/galeria/9c220dea-e661-4ba3-93de-d1d52f275e28.avif", alt: "Palmito House" },
    { src: "img/galeria/billar.avif", alt: "Sala de billar" },
    { src: "img/galeria/ccb89646-2098-4e72-a6b6-ef42315e6e47.avif", alt: "Palmito House" },
    { src: "img/galeria/cd6sofa.avif", alt: "Zona d'estar amb sofà" },
    { src: "img/galeria/coberta.avif", alt: "Terrassa amb vistes" },
    { src: "img/galeria/cuin.avif", alt: "Cuina equipada" },
    { src: "img/galeria/d5771a1d-a121-4693-b840-a0bff53eec75.avif", alt: "Palmito House" },
    { src: "img/galeria/e90f0a9e-bc07-4605-9857-eb9dc8ae28cb.avif", alt: "Palmito House" },
    { src: "img/galeria/exterior.avif", alt: "Exterior de la casa" },
    { src: "img/galeria/f44df969-feec-4cb1-9fa3-841a58788e29.avif", alt: "Palmito House" },
    { src: "img/galeria/f6d05a9e-cd16-4e7d-903a-72a0dcae1edb.avif", alt: "Palmito House" },
    { src: "img/galeria/f6dee1a6-1d2a-4f37-ac10-7401256a5c99.avif", alt: "Palmito House" },
    { src: "img/galeria/f9f3ecb0-7aab-4aea-8d95-6c25b0cceee8.avif", alt: "Palmito House" },
    { src: "img/galeria/pisci3.avif", alt: "Piscina i jardí" },
    { src: "img/galeria/pisci4.avif", alt: "Piscina" },
    { src: "img/galeria/piscina.avif", alt: "Piscina exterior" },
    { src: "img/galeria/piscina2.avif", alt: "Piscina amb vistes" },
    { src: "img/galeria/piscina3.avif", alt: "Piscina exterior" },
    { src: "img/galeria/salo.avif", alt: "Saló d'estar principal" },
    { src: "img/galeria/salo2.avif", alt: "Saló secundari" },
    { src: "img/galeria/salo3.avif", alt: "Saló principal" },
  ];

  const gmSources = ALL_GALLERY_IMAGES;

  // Mapa per trobar l'índex de cada imatge de la graella dins l'array complet
  galleryItems.forEach((item) => {
    const img = item.querySelector("img");
    const src = img.getAttribute("src");
    const matchIndex = gmSources.findIndex((entry) => entry.src === src);
    const openIndex = matchIndex >= 0 ? matchIndex : 0;

    item.addEventListener("click", () => openGalleryModal(openIndex));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openGalleryModal(openIndex);
      }
    });
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
  });

  function updateGalleryCounter() {
    gmCounter.textContent = `${gmIndex + 1} / ${gmSources.length}`;
  }

  function openGalleryModal(index) {
    gmIndex = index;
    gmImg.src = gmSources[index].src;
    gmImg.alt = gmSources[index].alt;
    updateGalleryCounter();

    gsap.set(galleryModal, { display: "flex", visibility: "visible", pointerEvents: "all" });
    gsap.set([gmBackdrop, gmWrapper, ...gmControls], { autoAlpha: 0 });
    gsap.set(gmWrapper, { scale: 0.4, y: 40 });
    gsap.set(gmControls, { y: 16 });

    const tl = gsap.timeline();
    tl.to(gmBackdrop, { autoAlpha: 1, duration: 0.4, ease: "power2.out" })
      .to(gmWrapper, { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "power4.out" }, "-=0.15")
      .to(gmControls, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }, "-=0.25");

    document.body.style.overflow = "hidden";
  }

  function closeGalleryModal() {
    const tl = gsap.timeline({
      onComplete: () => {
        galleryModal.style.display = "none";
        galleryModal.style.visibility = "hidden";
        galleryModal.style.pointerEvents = "none";
        document.body.style.overflow = "";
      },
    });

    tl.to(gmWrapper, { autoAlpha: 0, scale: 0.8, y: -20, duration: 0.3, ease: "power2.in" }, 0)
      .to(gmBackdrop, { autoAlpha: 0, duration: 0.25, ease: "power2.in" }, 0)
      .to(gmControls, { autoAlpha: 0, duration: 0.15 }, 0);
  }

  function navigateGallery(direction) {
    gsap.to(gmWrapper, {
      autoAlpha: 0,
      scale: 0.85,
      y: -15,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        gmIndex = (gmIndex + direction + gmSources.length) % gmSources.length;
        gmImg.src = gmSources[gmIndex].src;
        gmImg.alt = gmSources[gmIndex].alt;
        updateGalleryCounter();

        gsap.set(gmWrapper, { autoAlpha: 0, scale: 0.85, y: 20 });
        gsap.to(gmWrapper, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" });
      },
    });
  }

  gmClose.addEventListener("click", closeGalleryModal);
  gmBackdrop.addEventListener("click", (e) => {
    if (e.target === gmBackdrop) closeGalleryModal();
  });
  gmPrev.addEventListener("click", () => navigateGallery(-1));
  gmNext.addEventListener("click", () => navigateGallery(1));

  document.addEventListener("keydown", (e) => {
    if (galleryModal.style.display !== "flex") return;
    if (e.key === "Escape") closeGalleryModal();
    if (e.key === "ArrowLeft") navigateGallery(-1);
    if (e.key === "ArrowRight") navigateGallery(1);
  });
}

// ==================== MODAL HABITACIONS ====================

const roomsModal = document.getElementById("rooms-modal");
if (roomsModal) {
  const rmImg = roomsModal.querySelector(".modal__image-wrapper img");
  const rmTitle = roomsModal.querySelector(".rooms-modal__title");
  const rmDesc = roomsModal.querySelector(".rooms-modal__desc");
  const rmWrapper = roomsModal.querySelector(".modal__image-wrapper");
  const rmBackdrop = roomsModal.querySelector(".modal__backdrop");
  const rmClose = roomsModal.querySelector(".modal__close");
  const rmPrev = roomsModal.querySelector(".modal__nav--prev");
  const rmNext = roomsModal.querySelector(".modal__nav--next");
  const rmCounter = roomsModal.querySelector(".modal__counter");
  const rmControls = [rmClose, rmPrev, rmNext, rmCounter];
  const roomCards = document.querySelectorAll(".room-card");

  let rmIndex = 0;
  let rmSources = [];
  let rmCurrentTitle = "";
  let rmCurrentDesc = "";

  roomCards.forEach((card) => {
    const img = card.querySelector(".room-card__image img");
    const title = card.querySelector(".room-card__title");
    const text = card.querySelector(".room-card__text");

    card.addEventListener("click", () => {
      const images = card.dataset.images;
      rmSources = images ? JSON.parse(images) : [img.src];
      rmIndex = 0;
      rmCurrentTitle = title.textContent;
      rmCurrentDesc = text.textContent;
      updateRoomsUI();

      gsap.set(roomsModal, { display: "flex", visibility: "visible", pointerEvents: "all" });
      gsap.set([rmBackdrop, rmWrapper, ...rmControls], { autoAlpha: 0 });
      gsap.set(rmWrapper, { scale: 0.4, y: 40 });
      gsap.set(rmControls, { y: 16 });

      const tl = gsap.timeline();
      tl.to(rmBackdrop, { autoAlpha: 1, duration: 0.4, ease: "power2.out" })
        .to(rmWrapper, { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "power4.out" }, "-=0.15")
        .to(rmControls, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }, "-=0.25");

      document.body.style.overflow = "hidden";
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
  });

  function updateRoomsUI() {
    rmImg.src = rmSources[rmIndex];
    rmTitle.textContent = rmCurrentTitle;
    rmDesc.textContent = rmCurrentDesc;
    if (rmSources.length > 1) {
      rmCounter.textContent = `${rmIndex + 1} / ${rmSources.length}`;
      gsap.set([rmPrev, rmNext, rmCounter], { display: "flex" });
    } else {
      gsap.set([rmPrev, rmNext, rmCounter], { display: "none" });
    }
  }

  function closeRoomsModal() {
    const tl = gsap.timeline({
      onComplete: () => {
        roomsModal.style.display = "none";
        roomsModal.style.visibility = "hidden";
        roomsModal.style.pointerEvents = "none";
        document.body.style.overflow = "";
      },
    });
    tl.to(rmWrapper, { autoAlpha: 0, scale: 0.8, y: -20, duration: 0.3, ease: "power2.in" }, 0)
      .to(rmBackdrop, { autoAlpha: 0, duration: 0.25, ease: "power2.in" }, 0)
      .to(rmControls, { autoAlpha: 0, duration: 0.15 }, 0);
  }

  function navigateRooms(direction) {
    gsap.to(rmWrapper, {
      autoAlpha: 0,
      scale: 0.85,
      y: -15,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        rmIndex = (rmIndex + direction + rmSources.length) % rmSources.length;
        updateRoomsUI();
        gsap.set(rmWrapper, { autoAlpha: 0, scale: 0.85, y: 20 });
        gsap.to(rmWrapper, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" });
      },
    });
  }

  rmClose.addEventListener("click", closeRoomsModal);
  rmBackdrop.addEventListener("click", (e) => {
    if (e.target === rmBackdrop) closeRoomsModal();
  });
  rmPrev.addEventListener("click", () => navigateRooms(-1));
  rmNext.addEventListener("click", () => navigateRooms(1));

  document.addEventListener("keydown", (e) => {
    if (roomsModal.style.display !== "flex") return;
    if (e.key === "Escape") closeRoomsModal();
    if (e.key === "ArrowLeft") navigateRooms(-1);
    if (e.key === "ArrowRight") navigateRooms(1);
  });
}

// ==================== MODAL VEURE ====================

const veureModal = document.getElementById("veure-modal");
if (veureModal) {
  const vmImg = veureModal.querySelector(".modal__image-wrapper img");
  const vmTitle = veureModal.querySelector(".veure-modal__title");
  const vmDesc = veureModal.querySelector(".veure-modal__desc");
  const vmWrapper = veureModal.querySelector(".modal__image-wrapper");
  const vmBackdrop = veureModal.querySelector(".modal__backdrop");
  const vmClose = veureModal.querySelector(".modal__close");
  const vmPrev = veureModal.querySelector(".modal__nav--prev");
  const vmNext = veureModal.querySelector(".modal__nav--next");
  const vmCounter = veureModal.querySelector(".modal__counter");
  const vmControls = [vmClose, vmPrev, vmNext, vmCounter];
  const veureCards = document.querySelectorAll(".veure__card");

  let vmIndex = 0;
  let vmSources = [];
  let vmCurrentTitle = "";
  let vmCurrentDesc = "";

  veureCards.forEach((card) => {
    const title = card.querySelector(".veure__title");
    const desc = card.querySelector(".veure__desc");

    card.addEventListener("click", () => {
      const images = card.dataset.images;
      vmSources = images ? JSON.parse(images) : [card.querySelector("img").src];
      vmIndex = 0;
      vmCurrentTitle = title.textContent;
      vmCurrentDesc = desc.textContent;
      updateVeureUI();

      gsap.set(veureModal, { display: "flex", visibility: "visible", pointerEvents: "all" });
      gsap.set([vmBackdrop, vmWrapper, ...vmControls], { autoAlpha: 0 });
      gsap.set(vmWrapper, { scale: 0.4, y: 40 });
      gsap.set(vmControls, { y: 16 });

      const tl = gsap.timeline();
      tl.to(vmBackdrop, { autoAlpha: 1, duration: 0.4, ease: "power2.out" })
        .to(vmWrapper, { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "power4.out" }, "-=0.15")
        .to(vmControls, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }, "-=0.25");

      document.body.style.overflow = "hidden";
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
  });

  function updateVeureUI() {
    vmImg.src = vmSources[vmIndex];
    vmTitle.textContent = vmCurrentTitle;
    vmDesc.textContent = vmCurrentDesc;
    if (vmSources.length > 1) {
      vmCounter.textContent = `${vmIndex + 1} / ${vmSources.length}`;
      gsap.set([vmPrev, vmNext, vmCounter], { display: "flex" });
    } else {
      gsap.set([vmPrev, vmNext, vmCounter], { display: "none" });
    }
  }

  function closeVeureModal() {
    const tl = gsap.timeline({
      onComplete: () => {
        veureModal.style.display = "none";
        veureModal.style.visibility = "hidden";
        veureModal.style.pointerEvents = "none";
        document.body.style.overflow = "";
      },
    });
    tl.to(vmWrapper, { autoAlpha: 0, scale: 0.8, y: -20, duration: 0.3, ease: "power2.in" }, 0)
      .to(vmBackdrop, { autoAlpha: 0, duration: 0.25, ease: "power2.in" }, 0)
      .to(vmControls, { autoAlpha: 0, duration: 0.15 }, 0);
  }

  function navigateVeure(direction) {
    gsap.to(vmWrapper, {
      autoAlpha: 0,
      scale: 0.85,
      y: -15,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        vmIndex = (vmIndex + direction + vmSources.length) % vmSources.length;
        updateVeureUI();
        gsap.set(vmWrapper, { autoAlpha: 0, scale: 0.85, y: 20 });
        gsap.to(vmWrapper, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" });
      },
    });
  }

  vmClose.addEventListener("click", closeVeureModal);
  vmBackdrop.addEventListener("click", (e) => {
    if (e.target === vmBackdrop) closeVeureModal();
  });
  vmPrev.addEventListener("click", () => navigateVeure(-1));
  vmNext.addEventListener("click", () => navigateVeure(1));

  document.addEventListener("keydown", (e) => {
    if (veureModal.style.display !== "flex") return;
    if (e.key === "Escape") closeVeureModal();
    if (e.key === "ArrowLeft") navigateVeure(-1);
    if (e.key === "ArrowRight") navigateVeure(1);
  });
}

// Gallery stagger
gsap.from(".gallery__item", {
  autoAlpha: 0,
  y: 30,
  stagger: 0.2,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".gallery-grid",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
});

// Slider de la secció "Sobre la casa" amb desplaçament lateral interior (Parallax)
const initCasaSlider = () => {
  const slides = document.querySelectorAll(".casa__slide");
  if (slides.length <= 1) return;

  let currentSlideIndex = 0;
  let isAnimating = false;

  // Ens assegurem que el primer slide estigui correctament inicialitzat
  gsap.set(slides[0], { autoAlpha: 1, xPercent: 0, zIndex: 2 });

  setInterval(() => {
    if (isAnimating) return;
    isAnimating = true;

    const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
    const currentSlide = slides[currentSlideIndex];
    const nextSlide = slides[nextSlideIndex];
    const currentImg = currentSlide.querySelector("img");
    const nextImg = nextSlide.querySelector("img");

    // Posicionem el següent slide a la dreta i la seva imatge a l'esquerra (per a l'efecte parallax)
    gsap.set(nextSlide, { xPercent: 100, autoAlpha: 1, zIndex: 2 });
    gsap.set(nextImg, { xPercent: -10 });
    gsap.set(currentSlide, { zIndex: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Neteja i actualització d'estats post-animació
        currentSlide.classList.remove("active");
        nextSlide.classList.add("active");
        gsap.set(currentSlide, { autoAlpha: 0, xPercent: 0 });
        gsap.set(currentImg, { xPercent: 0 });
        currentSlideIndex = nextSlideIndex;
        isAnimating = false;
      },
    });

    // Desplaçament lateral amb parallax de la imatge interior
    tl.to(
      currentSlide,
      {
        xPercent: -100,
        duration: 1.6,
        ease: "power2.inOut",
      },
      0,
    );

    tl.to(
      currentImg,
      {
        xPercent: 10,
        duration: 1.6,
        ease: "power2.inOut",
      },
      0,
    );

    tl.to(
      nextSlide,
      {
        xPercent: 0,
        duration: 1.6,
        ease: "power2.inOut",
      },
      0,
    );

    tl.to(
      nextImg,
      {
        xPercent: 0,
        duration: 1.6,
        ease: "power2.inOut",
      },
      0,
    );

  }, 5000); // Canvi automàtic cada 5 segons
};

// ==================== REVIEWS CAROUSEL ====================

function initReviewsCarousel() {
  const track = document.querySelector(".reviews__track");
  const dotsContainer = document.querySelector(".reviews__dots");
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll(".review-card");
  if (cards.length < 4) return;

  const mq = window.matchMedia("(max-width: 767px)");
  let current = 0;
  let interval = null;
  let views = 0;
  let step = 0;

  function cardsPerView() {
    return mq.matches ? 1 : 3;
  }

  function calcViews() {
    views = cards.length - (cardsPerView() - 1);
  }

  function calcStep() {
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    step = cards[0].getBoundingClientRect().width + gap;
  }

  function buildDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < views; i++) {
      const dot = document.createElement("button");
      dot.className = "reviews__dot" + (i === 0 ? " reviews__dot--active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Vista " + (i + 1));
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    if (index === current) return;
    current = index;

    dotsContainer.querySelectorAll(".reviews__dot").forEach((d, i) => {
      d.classList.toggle("reviews__dot--active", i === current);
    });

    gsap.to(track, {
      x: -(current * step),
      duration: 0.6,
      ease: "power3.inOut",
    });

    resetInterval();
  }

  function next() {
    goTo((current + 1) % views);
  }

  function resetInterval() {
    if (interval) clearInterval(interval);
    interval = setInterval(next, 5000);
  }

  function onResize() {
    calcViews();
    calcStep();
    if (current >= views) current = 0;
    buildDots();
    gsap.set(track, { x: -(current * step) });
  }

  mq.addEventListener("change", onResize);
  window.addEventListener("resize", calcStep);

  calcViews();
  calcStep();
  buildDots();
  resetInterval();
}

// ==================== FORMULARI DE CONTACTE (AMAGAT / PREPARAT) ====================
/* ==========================================================================
   Quan s'activi PHP:
   1. Treure 'novalidate' del <form> a l'HTML
   2. Afegir action="php/contacte.php" al <form>
   3. Descomentar el fetch() a enviarFormulari()
   ========================================================================== */

function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  // Inserir CSRF token
  const csrfInput = document.getElementById("csrf_token");
  if (csrfInput) {
    // Token basat en data (stateless, validat al PHP)
    const csrfSecret = "dev_secret_12345";
    const today = new Date().toISOString().split("T")[0];
    // Simulem HMAC (al PHP es fa amb hash_hmac real)
    csrfInput.value = btoa(today + ":" + csrfSecret);
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validar checkbox de privacitat
    const privacyCheck = document.getElementById("privacy");
    const privacyWrapper = privacyCheck?.closest(".form-checkbox");
    if (!privacyCheck || !privacyCheck.checked) {
      if (privacyWrapper) privacyWrapper.classList.add("form-checkbox--error");
      mostrarToast("Has d'acceptar la política de privacitat.", "error");
      return;
    }
    if (privacyWrapper) privacyWrapper.classList.remove("form-checkbox--error");

    if (privacyCheck) {
      privacyCheck.addEventListener(
        "change",
        () => {
          if (privacyWrapper) privacyWrapper.classList.remove("form-checkbox--error");
        },
        { once: true },
      );
    }

    // Validar email
    const emailInput = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailRegex.test(emailInput.value)) {
      mostrarToast("Introdueix un email vàlid.", "error");
      emailInput?.focus();
      return;
    }

    // Validar telèfon (si està omplert, només dígits, +, espais, guions)
    const phoneInput = document.getElementById("phone");
    if (phoneInput && phoneInput.value.trim()) {
      const phoneClean = phoneInput.value.replace(/[\s\-]/g, "");
      if (!/^\+?\d{6,15}$/.test(phoneClean)) {
        mostrarToast("Introdueix un telèfon vàlid (només números i +).", "error");
        phoneInput.focus();
        return;
      }
    }

    const btn = contactForm.querySelector(".btn--primary");
    const originalText = btn.textContent;
    btn.textContent = "Enviant...";
    btn.disabled = true;

    /* =====================================================================
       reCAPTCHA v3 (Invisible)
       ===================================================================== */
    if (typeof grecaptcha !== "undefined") {
      grecaptcha.ready(() => {
        const siteKey = ""; // ← Insertar aquí la Site Key de reCAPTCHA v3
        grecaptcha.execute(siteKey, { action: "submit" }).then((token) => {
          enviarFormulari(token, originalText, btn);
        });
      });
    } else {
      // Fallback si reCAPTCHA no carrega (mode test)
      enviarFormulari("test-token", originalText, btn);
    }
  });
}

async function enviarFormulari(token, originalText, btn) {
  const recaptchaInput = document.getElementById("recaptcha_response");
  if (recaptchaInput) recaptchaInput.value = token;

  const data = new FormData(document.getElementById("contact-form"));

  /* ====================================================================
     ENVIAMENT AJAX A PHP (COMENTAT — Activar quan el PHP estigui online)
     // try {
     //   const response = await fetch("php/contacte.php", {
     //     method: "POST",
     //     body: data,
     //     headers: { Accept: "application/json" },
     //   });
     //   const result = await response.json();
     //
     //   if (response.ok && result.ok) {
     //     mostrarToast(result.message || "Missatge enviat correctament!", "success");
     //     document.getElementById("contact-form").reset();
     //   } else {
     //     mostrarToast(result.error || "Hi ha hagut un problema.", "error");
     //   }
     // } catch (error) {
     //   mostrarToast("Error de connexió. Intenta-ho més tard.", "error");
     // }
     ==================================================================== */

  // === MOCK (mentre el PHP no està actiu) ===
  await new Promise((r) => setTimeout(r, 1200));
  mostrarToast("Missatge rebut! Et respondrem en breu.", "success");
  document.getElementById("contact-form").reset();
  // === FI MOCK ===

  // Restaurar UI
  btn.textContent = originalText;
  btn.disabled = false;
}

// ==================== TOAST ====================

function mostrarToast(mensaje, tipo) {
  const toast = document.getElementById("toast-container");
  if (!toast) return;

  toast.textContent = mensaje;
  toast.className = "toast-visible toast-" + tipo;

  const tlToast = gsap.timeline();

  tlToast.fromTo(toast, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }).to(toast, {
    opacity: 0,
    y: -10,
    delay: 4,
    duration: 0.4,
    onComplete: () => {
      toast.className = "toast-hidden";
    },
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initCasaSlider();
    initReviewsCarousel();
    initContactForm();
  });
} else {
  initCasaSlider();
  initReviewsCarousel();
  initContactForm();
}
