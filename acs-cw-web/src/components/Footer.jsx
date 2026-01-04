// Footer Component - Shows copyright at bottom of page
import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p className="copyright">
                    © 2026 Property Pro. All rights reserved.
                </p>
                <p className="footer-note">
                    Property search application.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
