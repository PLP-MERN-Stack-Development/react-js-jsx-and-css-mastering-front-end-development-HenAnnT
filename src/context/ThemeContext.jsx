import React, {createContext, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext();

export function useTheme(){ return useContext(ThemeContext); }

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState(() => {
        try {
            const s = localStorage.getItem('app_theme');
            if (s) return s;
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } catch { return 'light'; }
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
        try { localStorage.setItem('app_theme', theme); } catch {}
    }, [theme]);

    const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

    return <ThemeContext.Provider value={{theme, toggle}}>{children}</ThemeContext.Provider>;
}
