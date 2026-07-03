import React from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="btn btn-outline-secondary"
      onClick={toggleTheme}
      aria-label="Changer de thème"
    >
      {theme === 'light' ? (
        <><i className="bi bi-moon-stars"></i> Sombre</>
      ) : (
        <><i className="bi bi-sun"></i> Clair</>
      )}
    </button>
  );
}

export default ThemeToggle;