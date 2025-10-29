import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

export default function Navbar() {
    const { theme, toggle } = useTheme();
    return (
        <header className="navbar">
            <div className="nav-left">
                <div className="brand">ReactTask</div>
                <nav className="nav-links" aria-label="Main navigation">
                    <NavLink to="/" end className={({isActive}) => `nav-link ${isActive? 'active':''}`}>Home</NavLink>
                    <NavLink to="/tasks" className={({isActive}) => `nav-link ${isActive? 'active':''}`}>Tasks</NavLink>
                    <NavLink to="/posts" className={({isActive}) => `nav-link ${isActive? 'active':''}`}>Posts</NavLink>
                </nav>
            </div>
            <div className="stack">
                <Button variant="secondary" onClick={toggle}>{theme === 'dark' ? 'Light' : 'Dark'}</Button>
            </div>
        </header>
    );
}
