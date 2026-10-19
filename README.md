# Babyja876 — Baby Essentials E-Commerce Platform

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8?logo=tailwindcss&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white&style=flat-square)
![React Router](https://img.shields.io/badge/React_Router-7-ca4245?logo=reactrouter&logoColor=white&style=flat-square)

www.babyja876.netlify.app

A full-stack, mobile-first e-commerce web application for a baby essentials brand serving Jamaica. This is a portfolio demo showcasing a production-quality shopping experience — from product browsing to checkout — with a complete admin dashboard.

---

## Live Demo

> **Customer storefront:** browse products, add to cart, and complete a multi-step checkout as a guest.
>
> **Admin access:** sign in with any email containing `admin` (e.g. `admin@test.com`) and any password, then navigate to the Admin Dashboard.

---

## Features

### Storefront
- Product catalogue with category filtering (Diapers, Wipes, Bath & Body, Apparel, Bedding, Bundles)
- Slide-in cart drawer with quantity controls and live subtotal
- Multi-step guest checkout — Customer Details → Delivery Method → Review & Confirm
- Jamaican delivery options: Local Pickup (free), Kingston courier, island-wide via Knutsford Express
- Order confirmation screen with generated order ID

### Admin Dashboard
- Analytics cards: total site visits, order count, gross revenue, net profit margin
- Inventory manager with inline editing of product name, stock, price, and cost
- Order management table with live status updates (Pending → Dispatched → Delivered)

### Technical Highlights
- Fully responsive — designed mobile-first, optimised for phones, tablets, and desktops
- Global state with React Context API (cart, orders, inventory, authentication)
- TypeScript throughout for end-to-end type safety
- Tailwind CSS v4 with a custom design system (teal / gold / coral palette, Montserrat font)
- Smooth animations powered by Motion

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Build Tool | Vite 6 |
| Animations | Motion |
| Icons | Lucide React |

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/your-username/babyja876.git
cd babyja876

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | TypeScript type-check |

---

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Sticky nav with mobile menu, cart icon, auth
│   ├── Hero.tsx            # Homepage hero banner
│   ├── ProductCard.tsx     # Product card with image, specs, and cart action
│   ├── CartDrawer.tsx      # Slide-in cart sidebar
│   ├── AuthModal.tsx       # Login / signup modal
│   └── AdminSidebar.tsx    # Admin nav (sidebar on desktop, top bar on mobile)
├── pages/
│   ├── Home.tsx            # Product catalogue with category filtering
│   ├── Checkout.tsx        # 3-step guest checkout flow
│   ├── AdminDashboard.tsx  # Analytics overview
│   ├── AdminInventory.tsx  # Inventory management table
│   └── AdminOrders.tsx     # Order management table
├── context/
│   └── AppContext.tsx      # Global state: cart, orders, inventory, auth
├── data.ts                 # Seed data: 10 products, delivery options, mock orders
├── types.ts                # TypeScript interfaces
└── App.tsx                 # Route definitions and layouts
```

---

## License

This project is open-source under the [MIT License](LICENSE).
