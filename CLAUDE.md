# Golden Touch - Project Context

## Overview
Bilingual (Arabic/English) React e-commerce website for **Golden Touch** (اللمسة الذهبية), a Bahrain-based business selling personalized traditional Arabic children's clothing and accessories. Arabic is the primary/default language with RTL layout.

## Tech Stack
- **Vite + React 18** with TypeScript
- **Tailwind CSS v3** with custom brand theme
- **react-i18next** for Arabic (default) / English
- **react-router-dom v6** for routing
- **Framer Motion** for animations
- **Lucide React** for icons

## Brand Colors (Tailwind)
- `brand-dark`: #2C2118 (dark brown)
- `brand-gold`: #C9A96E (primary gold accent)
- `brand-gold-light`: #D4BA8A
- `brand-cream`: #FAF7F2 (background)
- `brand-cream-dark`: #F0E8D8
- `brand-charcoal`: #1A1A1A

## Fonts
- **Arabic**: Tajawal (Google Fonts)
- **English headings**: Playfair Display
- **English body**: Inter

## Project Structure
```
src/
├── components/
│   ├── layout/        Navbar, Footer, Layout, WhatsAppFloat
│   ├── ui/            SectionTitle, WhatsAppIcon
│   └── sections/      Hero, AboutPreview, Categories, Gallery, WhyUs, CtaBanner
├── pages/             Home, About, Products, Contact, Cart, Checkout, BenefitPay
├── context/           CartContext (global cart state)
├── hooks/             useDirection (RTL/LTR helper)
├── i18n/              ar.json, en.json, index.ts
├── App.tsx
├── main.tsx
└── index.css          Tailwind + custom styles (scrollbar, dividers, patterns, shimmer)
```

## Routing
| Path | Component | Layout |
|------|-----------|--------|
| `/` | Home | Yes |
| `/about` | About | Yes |
| `/products` | Products | Yes |
| `/contact` | Contact | Yes |
| `/cart` | Cart | Yes |
| `/checkout` | Checkout | Yes |
| `/benefit-pay` | BenefitPay | **No** (standalone page) |

BenefitPay is outside Layout intentionally — it's a standalone payment gateway replica with inline styles only (no Tailwind, no site fonts, no navbar/footer).

## Cart System (CartContext)
```typescript
interface Product {
  id: number; category: string;
  nameAr: string; nameEn: string;
  price: number; priceAr: string; priceEn: string;
  image?: string;
}
interface CartItem { product: Product; quantity: number; }
```
**Exports**: `items`, `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `totalItems`, `totalPrice`

## Products (8 items)
| ID | Category | Name (EN) | Price |
|----|----------|-----------|-------|
| 1 | boys | Embroidered Dishdasha - Star Patch | 20 BHD |
| 2 | boys | Embroidered Dishdasha - Calligraphy | 20 BHD |
| 3 | boys | Embroidered Sederi Vest - Brown | 14 BHD |
| 4 | boys | Embroidered Sederi Vest - Black | 14 BHD |
| 5 | bags | 3D Embroidered Festival Bag | 16 BHD |
| 6 | bags | Personalized Embroidered Bag | 16 BHD |
| 7 | bags | Embroidered Leather Pouch | 6.5 BHD |
| 8 | accessories | Magnetic Leather Tag | 4 BHD |

**Categories**: boys, bags, accessories (no girls — no products for it)

## Product Controls
- +/- quantity controls in product card info area
- +/- quantity controls on hover overlay (image area)
- Both linked to CartContext

## Checkout Payment Methods
- **Apple Pay** button (black, uses `/apple_logo.png` with CSS `invert`)
- **BenefitPay** button (red #D71E28, uses `/benefit_logo.png` in white container)
- Both buttons: `px-8 py-5`, `text-base`, `font-bold`, logo in `h-10 w-10` container

## BenefitPay Page
Standalone replica of the real BenefitPay payment gateway:
- Grey background (#e8e8e8), white card (max-width 1100px, min-height 700px)
- All inline styles, Arial font, no Tailwind
- Links are red (#D71E28), not blue
- Pay button is red (#D71E28), Cancel is red (#d9534f)
- Shows cart totalPrice as Amount
- Form: Amount, Card Type, Card Number, Expiry Date (MM/YYYY), Card Holders Name
- Footer: benefit_logo.png + copyright text

## Public Assets
- `/logo.png` — Golden Touch logo (round)
- `/apple_logo.png` — Black Apple logo (use `invert` class on dark bg)
- `/benefit_logo.png` — Red Benefit logo on transparent bg
- `/products/*.png` — Product images (dishdasha-1, dishdasha-2, sederi-brown, sederi-black, bag-camel-1, bag-camel-2, pouch-black, tag-leather)

## i18n
- Language stored in localStorage as `golden-touch-lang`
- Arabic is default
- `document.documentElement.dir` and `lang` set on language change
- Bags in Arabic use "شنطة" (shanta), not "كيس" (kees)

## WhatsApp
- Number: 97336855778
- Floating button on all Layout pages
- Contact page has WhatsApp link

## Key Decisions
- Gallery items are uniform aspect-square grid, all link to `/products`
- No girls category (removed from filters and categories)
- BenefitPay page is completely isolated from site styling
- benefit_logo.png is red on transparent — needs white container on red backgrounds
