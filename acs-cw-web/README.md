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

cw-demo/
├── public/ # Static assets
├── src/
│ ├── **mocks**/ # Jest mocks
│ ├── **tests**/ # Jest test files
│ ├── components/ # React components
│ │ ├── FavoritesList.jsx
│ │ ├── PropertyCard.jsx
│ │ └── SearchFilter.jsx
│ ├── context/ # React Context providers
│ │ └── FavoritesContext.jsx
│ ├── data/ # JSON data
│ │ └── properties.json
│ ├── pages/ # Page components
│ │ ├── PropertyPage.jsx
│ │ └── SearchPage.jsx
│ ├── App.jsx # Main app component
│ ├── index.css # Global styles
│ ├── main.jsx # React entry point
│ └── setupTests.js # Jest setup
├── .babelrc # Babel configuration
├── index.html # HTML template with CSP
├── package.json # Dependencies and scripts
├── vite.config.js # Vite configuration
└── README.md # This file
