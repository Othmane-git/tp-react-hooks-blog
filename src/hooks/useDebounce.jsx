import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour débouncer une valeur
 * @param {any} value - La valeur à débouncer
 * @param {number} delay - Le délai en millisecondes
 * @returns {any} La valeur après le délai
 */
function useDebounce(value, delay = 500) {
  // TODO: Exercice 2 - Implémenter le hook useDebounce
  // 1. Créer un état pour stocker la valeur debouncée
  // 2. Utiliser useEffect pour mettre à jour la valeur après le délai
  // 3. Retourner la valeur debouncée

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);


  return debouncedValue; // À modifier
}

export default useDebounce;