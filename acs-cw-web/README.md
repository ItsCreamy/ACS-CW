## Things to build

### Search Functionality

- **Property Type Filter**: Search for Houses, Flats, or Any type
- **Price Range**: Slider-based min/max price filter (£100,000 - £1,000,000)
- **Bedrooms**: Min and max bedroom count selection
- **Date Added**: Search by date range (from/to dates)
- **Postcode Area**: Filter by first part of postcode (BR1, NW1, SE1, SW1)
- **Multi-Criteria Search**: Combine any 1-5 criteria simultaneously

### Property Display

- **Property Cards**: Visual cards with images, price, location, and key details
- **Image Gallery**: Full gallery with 6-8 images per property
- **Lightbox View**: Click to expand images in fullscreen
- **Thumbnail Navigation**: Quick image selection via thumbnails

### Favorites System

- **Drag & Drop**: Drag property cards to add to favorites
- **Button Add**: Click the Save button to add to favorites
- **Duplicate Prevention**: Properties can only be added once
- **Remove Items**: Remove by clicking X button or dragging out
- **Clear All**: One-click clear all favorites
- **Persistence**: Favorites saved in localStorage

### Property Details Page

- **Large Image Gallery**: Main image with navigation arrows
- **React Tabs**: Description, Floor Plan, and Google Map tabs
- **Key Features**: Type, bedrooms, postcode, date added
- **Add to Favorites**: Button and drag support on property page

### Responsive Design

- **Desktop**: Three-column layout (filters | results | favorites)
- **Tablet** (≤1024px): Two-column layout with adapted sidebar
- **Mobile** (≤768px): Single-column stacked layout
- **Touch-Friendly**: Optimized for touch devices

### Security

- **Content Security Policy (CSP)**: Comprehensive headers in index.html
- **XSS Protection**: DOMPurify sanitization for user content
- **React JSX Encoding**: Automatic HTML entity encoding

## Project Structure

acs-cw-web/
├── public/ # Static assets
├── src/
│ ├── **mocks**/ # Jest mocks for testing
│ │ ├── fileMock.js
│ │ ├── react-dnd.js
│ │ └── react-dnd-html5-backend.js
│ ├── **tests**/ # Jest test files
│ │ ├── components.test.jsx
│ │ ├── favorites.test.js
│ │ ├── properties.test.js
│ │ ├── search.test.js
│ │ └── utils.test.js
│ ├── components/ # Reusable React components
│ │ ├── FavoritesList.jsx # Favorites sidebar with drag-drop
│ │ ├── FavoritesList.css
│ │ ├── Footer.jsx # Page footer
│ │ ├── Footer.css
│ │ ├── Navbar.jsx # Navigation bar
│ │ ├── Navbar.css
│ │ ├── PropertyCard.jsx # Property card for search results
│ │ ├── PropertyCard.css
│ │ ├── SearchFilter.jsx # Search form with filters
│ │ └── SearchFilter.css
│ ├── context/ # React Context providers
│ │ └── FavoritesContext.jsx # Global favorites state
│ ├── data/ # JSON data
│ │ └── properties.json # 7 property listings
│ ├── pages/ # Page components
│ │ ├── PropertyPage.jsx # Property details page
│ │ ├── PropertyPage.css
│ │ ├── SearchPage.jsx # Main search page
│ │ └── SearchPage.css
│ ├── App.jsx # Main app with routing
│ ├── index.css # Base/global styles
│ ├── main.jsx # React entry point
│ └── setupTests.js # Jest setup
├── .babelrc # Babel configuration
├── index.html # HTML template with CSP
├── package.json # Dependencies and scripts
├── vite.config.js # Vite configuration
└── README.md # This file

## 🛠️ Technologies

### Core

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing

### UI Components

- **react-select** - Enhanced select dropdowns
- **react-datepicker** - Date picker widgets
- **rc-slider** - Price range slider
- **react-tabs** - Tabbed content

### Drag & Drop

- **react-dnd** - Drag and drop framework
- **react-dnd-html5-backend** - HTML5 backend for drag

### Security

- **DOMPurify** - XSS protection/HTML sanitization

### Testing

- **Jest** - Test runner
- **@testing-library/react** - React testing utilities
- **@testing-library/jest-dom** - DOM matchers

## 🎨 Design Decisions

### Responsive Layout Justification

- **Desktop (>1024px)**: Three-column grid layout maximizes screen real estate
- **Tablet (768-1024px)**: Filters and favorites share left column, results take full right
- **Mobile (<768px)**: Single column with horizontal scrollable favorites bar

### React Widgets Choice

- **react-select**: Provides accessible, customizable dropdowns with search
- **react-datepicker**: Intuitive calendar widget with date range support
- **rc-slider**: Visual price range slider for better UX than text inputs
- **react-tabs**: Accessible tab panels for property details
