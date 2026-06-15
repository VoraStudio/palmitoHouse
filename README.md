# Palmito House

Web corporativa per a **Palmito House**, casa rural exclusiva a Les Planes d'Hostoles (Girona). Landing page amb presentació de la casa, habitacions, serveis, galeria, activitats de l'entorn i formulari de contacte.

---

## Estructura del projecte

```
palmitoHouse/
├── index.html               # Pàgina principal
├── css/
│   ├── reset.css             # Reset CSS
│   └── styles.css            # Estils globals
├── js/
│   └── main.js               # JavaScript: animations, modals, i18n, form
├── php/
│   └── contacte.php          # Backend del formulari de contacte
├── img/
│   ├── Logo.svg              # Logotip vectorial
│   ├── galeria/              # Imatges de la galeria (.avif)
│   ├── activitats/           # Imatges destinacions properes
│   └── Palminto ICONES/      # Iconografia SVG dels serveis
├── vendor/                   # Dependències PHP (Composer)
├── .env                      # Variables d'entorn
├── composer.json
└── README.md
```

---

## Funcionalitats

### Hero animat
- Títol "Palmito" i "House" entren des dels costats oposats.
- Imatge central es desplega amb clip-path.
- Text inferior "Escapa't. Respira. Desconnecta de veritat." es revela línia a línia.

### Secció "La casa"
- Slider d'imatges amb transició lliscant i lleuger efecte parallax.
- Descripció de la propietat i enllaç a Airbnb.

### Estadístiques
- Comptadors animats amb scroll.

### Habitacions
- 4 targetes desplegables amb galeria d'imatges, descripció i enllaç a Airbnb.

### Galeria
- Graella d'imatges responsive amb lightbox modal. Navegació amb teclat (fletxes, Escape).

### Serveis
- 12 targetes amb iconografia dels serveis de la casa.

### Activitats
- Targetes amb imatge de fons, overlay informatiu i galeria d'imatges associada.

### Entorn
- Targetes de destinacions properes (Girona, Barcelona, Figueres, Pirineus, Garrotxa, Costa Brava) amb galeria fotogràfica.

### Ressenyes
- Carrusel de testimonis reals d'hostes. Disponible en català, castellà i anglès.

### Formulari de contacte
- Validació al frontend amb JavaScript.
- Enviament asíncron amb PHP + PHPMailer (cal configurar, veure secció corresponent).
- reCAPTCHA v3 per protecció anti-bots.

---

## Sistema multiidioma (i18n)

Suport per a **Català (ca)**, **Castellà (es)** i **Anglès (en)**.

- Selector d'idioma al header amb banderes.
- L'idioma es persisteix a `localStorage`.
- Les traduccions es defineixen a l'objecte `i18n{}` a `js/main.js`.
- Les claus de traducció s'assignen via atribut `data-i18n` al HTML.

---

## Tecnologies utilitzades

- **HTML5 semàntic** amb atributs ARIA
- **CSS3** amb variables personalitzades, `clamp()` per tipografia fluida, Flexbox i Grid
- **JavaScript ES6+** natiu (sense frameworks)
- **GSAP** per animacions i ScrollTrigger per reveals amb scroll
- **Lenis** per smooth scrolling
- **PHP 8+** amb PHPMailer i phpdotenv

---

## Formulari de contacte — Configuració pendent

El formulari de contacte utilitza un backend PHP amb PHPMailer per enviar els missatges per SMTP. La configuració real s'ha deixat pendent perquè el client la completi amb les seves credencials.

### Passos per activar el formulari

#### 1. Omplir el fitxer `.env`

Editar `palmitoHouse/.env` amb les dades del vostre entorn:

```env
CSRF_TOKEN_SECRET=clau_aleatoria_de_64_caracters_hex
RECAPTCHA_SITE_KEY=6Lc..._vostra_site_key
RECAPTCHA_SECRET_KEY=6Lc..._vostra_secret_key
SMTP_HOST=smtp.hostinger.com
SMTP_USER=info@palmitohouse.com
SMTP_PASS=la_vostra_contrasenya
SMTP_PORT=465
SMTP_ENCRYPTION=ssl
```

- **CSRF_TOKEN_SECRET**: Clau secreta per protegir el formulari. Generar amb:
  ```bash
  php -r "echo bin2hex(random_bytes(32));"
  ```
- **reCAPTCHA**: Obtenir Site Key i Secret Key a https://www.google.com/recaptcha/admin (escollir reCAPTCHA v3)
- **SMTP**: Credencials del servidor de correu. Consultar amb l'hosting.

#### 2. Configurar la Site Key al JavaScript

A `js/main.js`, línia ~1927, afegir la Site Key de reCAPTCHA dins les cometes:

```js
const siteKey = "6Lc..._vostra_site_key";
```

#### 3. Activar la càrrega de reCAPTCHA

A `index.html`, línia ~1130, descomentar el script de reCAPTCHA i substituir `CLAU_DEL_SITE_KEY` per la Site Key:

```html
<script src="https://www.google.com/recaptcha/api.js?render=CLAU_DEL_SITE_KEY"></script>
```

#### 4. Activar l'enviament real

A `js/main.js`, línies ~1948-1953:

- **Descomentar** el bloc de fetch a `php/contacte.php` (línies 1948-1961)
- **Comentar o eliminar** el bloc de simulació (línies 1967-1970) que comença amb `// === MOCK (mentre el PHP no està actiu) ===`

#### 5. (Opcional) Treure `novalidate` del formulari

A `index.html` línia ~770, es pot treure l'atribut `novalidate` del `<form>` si es vol que el backend PHP també faci validació.

### Dependències PHP

El projecte ja inclou `vendor/` amb les llibreries necessàries. Si cal reinstal·lar:

```bash
cd palmitoHouse
composer install
```

**Requisits del servidor:**
- PHP ≥ 8.0
- Extensió cURL
- Extensió mbstring
- Composer (per instal·lar dependències)

---

## Notes

- El logotip en SVG utilitza fonts genèriques del sistema (Arial, Georgia) per garantir la compatibilitat. Per utilitzar les fonts originals (Brandon Grotesque, Didot), cal importar-les al fitxer `img/Logo.svg`.
- Totes les imatges estan en format AVIF per optimitzar la càrrega. El client pot substituir-les per les originals si desitja més qualitat.
- La pàgina `habitacions.html` s'ha eliminat i els enllaços redirigeixen a la secció `#habitacions` de `index.html`.

---

## Crèdits

Desenvolupat per **Vora Studio** — Girona
