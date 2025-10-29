import React from 'react';

export default function Footer(){
    return (
        <footer className="footer">
            © {new Date().getFullYear()} — React Task Manager • Built with plain CSS
        </footer>
    );
}
