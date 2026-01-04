// App Component - Main entry point for the application
// Sets up routing, providers, and layout
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FavoritesProvider } from './context/FavoritesContext';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import pages
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';

// Import base styles
import './index.css';

function App() {
    return (
        <FavoritesProvider>
            <DndProvider backend={HTML5Backend}>
                <Router>
                    <div className="app-container">
                        {/* Navigation bar at top */}
                        <Navbar />
                        
                        {/* Main content area */}
                        <main className="app-main">
                            <Routes>
                                <Route path="/" element={<SearchPage />} />
                                <Route path="/property/:id" element={<PropertyPage />} />
                            </Routes>
                        </main>
                        
                        {/* Footer at bottom */}
                        <Footer />
                    </div>
                </Router>
            </DndProvider>
        </FavoritesProvider>
    );
}

export default App;