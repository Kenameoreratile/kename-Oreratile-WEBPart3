# Stha's Bakery – Website Project (Part 3)

**Student:** ST10491101 KENAME ORERATILE  
**Business:** Stha's Bakery, Magojaneng, Kuruman, Northern Cape  
**Module:** Web Development – Part 3: Enhancing Functionality and SEO

---

## Description

A multi-page website for a local bakery that sells homemade biscuits and scones. The site supports product browsing, service information, and customer enquiries, with interactive JavaScript features and on-page SEO.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Welcome section, interactive tabs, product previews |
| About Us | `about.html` | Bakery information and accordion FAQs |
| Products | `products.html` | Product catalogue, search, category filter, image lightbox gallery |
| Services | `services.html` | Ceremonies, events, individual orders + accordion |
| Contact | `contact.html` | Contact details and validated enquiry form |
| References | `references.html` | Project references and sources |

## Features (Part 3)

### Interactive Elements
- **Tabs** on the Home page (Fresh Daily / Local Bakery / Any Occasion)
- **Accordion** on About and Services pages
- **Image Lightbox Gallery** on Products page (click image to enlarge, prev/next navigation)
- **Dynamic product filter and search** on Products page

### Form Functionality
- Enquiry form with fields: name, email, phone, product, quantity, date, message
- Client-side validation (required fields, email format, phone pattern, date not in past, min/max lengths)
- Simulated AJAX-style submission (no page reload) with success feedback

### SEO
- Unique title tags and meta descriptions on every page
- Meta keywords and author tags
- Descriptive `alt` and `title` attributes on images
- Semantic heading structure (h1–h3)
- Clean multi-page URL structure
- Internal navigation links between all pages
- `sitemap.xml` and `robots.txt`

### Design
- External stylesheet (`style.css`)
- Responsive layout (tablet ≤900px, mobile ≤600px)
- Sticky navigation
- Consistent colour scheme and branding

## How to Run Locally

1. Download or clone this repository.
2. Open `index.html` in a web browser, **or**
3. Use a local server (e.g. VS Code Live Server) for best results.

## Deployment

The site is static HTML/CSS/JS and can be published on free platforms such as:

- GitHub Pages
- Netlify
- Vercel

After publishing, update the canonical URLs and sitemap with the live domain.

## File Structure

```
sthas-bakery/
├── index.html
├── about.html
├── products.html
├── services.html
├── contact.html
├── references.html
├── style.css
├── script.js
├── sitemap.xml
├── robots.txt
├── README.md
├── Logo.jpeg
├── Scones.jpeg
├── Ginger.jpeg
├── Lemon.jpeg
└── vanilla.jpeg
```

## GitHub

1. Create a new repository (e.g. `sthas-bakery`).
2. Upload all files from this folder.
3. Push commits with clear messages describing Part 3 changes.
4. (Optional) Enable GitHub Pages under Settings → Pages.

## Contact (Business)

- **Location:** Magojaneng, Kuruman, Northern Cape  
- **Phone:** 081 678 4431  
- **Email:** sthasbakery@gmail.com  

---

*Created for Web Development Part 3 assessment.*
