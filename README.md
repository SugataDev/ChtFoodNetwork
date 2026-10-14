# CHT Food Network — Discover the Taste of CHT 🌿

A modern, high-performance React web application built with **Vite** and **Tailwind CSS v4** dedicated to celebrating, archiving, and safeguarding the living culinary heritage of the **Chittagong Hill Tracts (CHT)**.

---

## 📖 About the Project

The Chittagong Hill Tracts in southeastern Bangladesh is home to diverse indigenous communities, including the Chakma, Marma, Tripura, Tanchangya, Bawm, Mro, and Pangkhua. Their gastronomy is rooted in deep-forest foraging, mountain stream fishing, open-fire hearth smoking, and ancestral bamboo-cylinder braising (*Haringba* / *Chupte*).

**CHT Food Network** serves as an interactive cultural archive and digital cookbook where home cooks, indigenous custodians, and culinary researchers can discover, bookmark, like, and contribute heirloom family recipes.

---

## ⚡ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/) with `@vitejs/plugin-react`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first engine with `@theme` design tokens and `@tailwindcss/vite`)
- **Typography**: Google Fonts (*Playfair Display* serif & *Plus Jakarta Sans* clean sans-serif)
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`) with synchronized `localStorage` persistence
- **Architecture**: Modular, component-driven directory layout

---

## 📂 Project Structure

```
CFN/
├── dist/                             # Production build artifacts
├── public/                           # Static assets
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx            # Sticky navbar with mobile drawer & auth status
│   │   │   └── Footer.jsx            # Multi-column footer with links & modal triggers
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx       # Hero banner, stats counter & featured visual card
│   │   │   ├── FeaturedRecipesSection.jsx # Main recipe catalog & search/filter toolbar
│   │   │   ├── TraditionsSection.jsx # Regional cooking traditions taxonomy cards
│   │   │   ├── CelebratedSection.jsx # 4-column community favorites showcase
│   │   │   ├── FaqSection.jsx        # Animated accordion with +/- expand indicators
│   │   │   └── CtaSection.jsx        # Community CTA & newsletter validation form
│   │   ├── recipes/
│   │   │   ├── RecipeCard.jsx        # Reusable recipe card with like, save & view actions
│   │   │   └── RecipeToolbar.jsx     # Live search, category pills & sort dropdown
│   │   ├── modals/
│   │   │   ├── AuthModal.jsx         # Merged Login & Join tabs with full validation
│   │   │   ├── ShareRecipeModal.jsx  # Recipe publisher with category image fallbacks
│   │   │   ├── RecipeDetailModal.jsx # Detailed view with ingredients, steps & lore tabs
│   │   │   ├── SavedRecipesModal.jsx # Saved recipes drawer with clear & remove actions
│   │   │   └── InfoModal.jsx         # Chef profiles, legal policies & contact form
│   │   └── ui/
│   │       └── Toast.jsx             # Floating slide-up toast notification
│   ├── data/
│   │   ├── recipesData.js            # Initial recipe catalog, IDs & fallback imagery
│   │   ├── traditionsData.js         # Cooking traditions taxonomy data
│   │   ├── faqData.js                # Indigenous heritage lore & FAQ items
│   │   └── infoContentData.js        # Chef biographies, privacy policy & terms
│   ├── App.jsx                       # Root application coordinator & state engine
│   ├── index.css                     # Tailwind v4 import & custom @theme tokens
│   └── main.jsx                      # React DOM root entry point
├── index.html                        # HTML5 template with font links & root element
├── package.json                      # Project metadata & dependency definitions
├── vite.config.js                    # Vite configuration with React & Tailwind v4 plugins
└── README.md                         # Project documentation
```

---

## 🎨 Tailwind CSS v4 Theme (`@theme`)

Design tokens are mapped directly in `src/index.css` using Tailwind v4's CSS-first theme architecture:

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--color-primary-green` | `#0b5b46` | Deep forest brand identity green |
| `--color-primary-green-dark` | `#064d3b` | Dark green hover & backdrop state |
| `--color-primary-green-light` | `#e6f4ee` | Soft botanical mint tint |
| `--color-accent-mint` | `#dcfce7` | Herb icon accent backgrounds |
| `--color-text-dark` | `#111827` | Headings & dark typography |
| `--color-text-body` | `#64748b` | Paragraph body copy |
| `--color-text-muted` | `#94a3b8` | Subtitles, labels & borders |
| `--color-bg-soft` | `#fafaf8` | Subtle warm off-white background |
| `--font-serif` | `"Playfair Display", Georgia, serif` | Luxury editorial serif |
| `--font-sans` | `"Plus Jakarta Sans", sans-serif` | Clean, readable modern sans |
| `--shadow-card` | `0 10px 30px rgba(17, 24, 39, 0.05)` | Elevation for cards |
| `--shadow-hover` | `0 18px 36px rgba(11, 91, 70, 0.1)` | Hover elevation glow |
| `--shadow-hero` | `0 25px 50px -12px rgba(6, 77, 59, 0.22)`| Prominent hero card depth |

---

## 🚀 Key Features & Capabilities

### 1. Navigation & Scrollspy
- **Smooth Anchor Scrolling**: Offsets for header height across sections (`#home`, `#featured-recipes`, `#traditions`, `#celebrated-recipes`, `#heritage-faq`).
- **Scrollspy**: Updates active navigation indicator in real-time as users scroll through the page.
- **Mobile Drawer**: Responsive hamburger button that animates into an 'X', revealing a mobile-optimized menu.
- **Saved Indicator**: Dynamic badge counter showing number of saved recipes, visible once logged in.

### 2. Search, Filter & Sort System
- **Real-Time Search**: Live multi-attribute search filtering recipe titles, descriptions, authors, categories, ingredients, and tribal affiliations.
- **Clear Search**: Quick reset `✕` button appears when typing in search.
- **Category Filter Pills**: Interactive pills (`All`, `Bamboo Cooked`, `Leaf Steamed`, `Wild Herb & Soups`, `Smoked`, `Chutneys & Berma`) that synchronize with Tradition taxonomy cards.
- **Multi-Criteria Sorting**:
  - *Featured* (default order)
  - *Most Popular* (sorted by real-time like counts)
  - *Cooking Time (Fastest to Longest)*
  - *Cooking Time (Longest to Fastest)*
  - *Alphabetical (A-Z)*

### 3. Authentication & User Profile
- **Auth Modal**: Seamless switching between **Log In** and **Join Community** tabs.
- **Form Validations**: Real-time checking for email format, password length (minimum 6 characters), and terms acceptance.
- **Local Persistence**: User sessions persist under `cht_current_user` in `localStorage`.
- **Profile Badge**: Shows member's initial avatar, display name, and a one-click logout button.

### 4. Recipe Community Publishing
- **Recipe Submission Modal**: Enables community cooks to publish recipes with Title, Cooking Tradition, Tribal Region, Cook Time, Cook Name, Photo URL, Key Ingredients, Cooking Method, and Cultural Lore.
- **Category Fallbacks**: Automatically supplies high-resolution category photography if an image URL is not provided.
- **Instant Archive Integration**: New recipes are saved to `cht_custom_recipes` in `localStorage`, prepended to the top of the catalog, and highlighted with an animated focus ring.

### 5. Recipe Details & Interactions
- **Detail Modal**: Presents high-definition photography, tribal region badges, author credentials, and action buttons.
- **Ingredients & Steps Tabs**:
  - Two-column ingredients list decorated with custom `🌿` botanic bullets.
  - Formatted ordered list for preparation steps.
  - Border-accented callout for ancestral cultural lore.
- **Synchronized Likes & Saves**: Liking or saving a recipe updates every instance of that card (Hero visual card, Featured grid, Celebrated grid, and Modal) instantaneously.

### 6. Informational Hub & Contact Form
- **Chef Profiles**: Spotlights master indigenous culinary custodians (e.g., Chef Mong Cho, Chef Minakshi Chakma).
- **Cultural Policies**: Transparent statements on safeguarding indigenous collective heritage and ethical attribution.
- **Interactive Contact Form**: Integrated message sender with validation, simulated network submission, and automatic modal dismissal.

### 7. Toast Notifications
- Toast alert component positioned in the bottom-right corner providing immediate user feedback for all critical actions with automatic 3.2-second dismissal.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
Clone or navigate to the project directory and install dependencies:

```bash
npm install
```

### Development Server
Run Vite in development mode with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### Production Build
Create an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📜 License & Attribution

All indigenous recipes and traditional culinary wisdom documented in this archive remain the cultural heritage of their respective indigenous communities of the Chittagong Hill Tracts. Non-commercial replication must honor and attribute the submitting chefs and their tribal origins.
