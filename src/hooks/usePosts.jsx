import { useState, useEffect } from 'react';
// TODO: Exercice 2 - Importer useDebounce
import useDebounce from './useDebounce';

/**
 * Hook personnalisé pour gérer les posts du blog
 * @param {Object} options - Options de configuration
 * @param {string} options.searchTerm - Terme de recherche
 * @param {string} options.tag - Tag à filtrer
 * @param {number} options.limit - Nombre d'éléments par page
 * @param {boolean} options.infinite - Mode de chargement infini vs pagination
 * @returns {Object} État et fonctions pour gérer les posts
 */
function usePosts({ searchTerm = '', tag = '', limit = 10, infinite = true } = {}) {
  // État local pour les posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  // TODO: Exercice 4 - Ajouter l'état pour le post sélectionné

  // TODO: Exercice 2 - Utiliser useDebounce pour le terme de recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const buildApiUrl = (skip = 0) => {
    const base = debouncedSearchTerm
      ? `https://dummyjson.com/posts/search?q=${encodeURIComponent(debouncedSearchTerm)}&`
      : 'https://dummyjson.com/posts?';
    return `${base}limit=${limit}&skip=${skip}`;
  };

  // TODO: Exercice 3 - Utiliser useCallback pour construire l'URL de l'API

  // TODO: Exercice 1 - Implémenter la fonction pour charger les posts
  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      const currentSkip = reset ? 0 : skip;
      const res = await fetch(buildApiUrl(currentSkip));
      if (!res.ok) throw new Error('Erreur lors du chargement des posts');
      const data = await res.json();
      setTotal(data.total);
      setSkip(currentSkip + limit);
      setPosts((prev) => (reset ? data.posts : [...prev, ...data.posts]));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // TODO: Exercice 1 - Utiliser useEffect pour charger les posts quand les filtres changent
  useEffect(() => {
    fetchPosts();
  }, [searchTerm]);

  // TODO: Exercice 4 - Implémenter la fonction pour charger plus de posts

  // TODO: Exercice 3 - Utiliser useMemo pour calculer les tags uniques

  // TODO: Exercice 4 - Implémenter la fonction pour charger un post par son ID



  const loadMore = () => {
    if (!loading) fetchPosts(false);
  };

  const hasMore = posts.length < total;

  return { posts, loading, error, hasMore, loadMore, total };
}

export default usePosts;