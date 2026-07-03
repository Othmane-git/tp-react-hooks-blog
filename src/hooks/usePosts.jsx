import { useState, useEffect, useCallback } from 'react';
import useDebounce from './useDebounce';

function usePosts({ searchTerm = '', limit = 10 } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const buildApiUrl = useCallback((skip = 0) => {
    const base = debouncedSearchTerm
      ? `https://dummyjson.com/posts/search?q=${encodeURIComponent(debouncedSearchTerm)}&`
      : 'https://dummyjson.com/posts?';
    return `${base}limit=${limit}&skip=${skip}`;
  }, [debouncedSearchTerm, limit]);

  const fetchPosts = useCallback(async (skip = 0, replace = false) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(buildApiUrl(skip));
      if (!res.ok) throw new Error('Erreur lors du chargement des posts');
      const data = await res.json();
      setTotal(data.total);
      setPosts((prev) => (replace ? data.posts : [...prev, ...data.posts]));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [buildApiUrl]);

  useEffect(() => {
    fetchPosts(0, true);
  }, [fetchPosts]);

  const loadMore = useCallback(() => {
    if (!loading) fetchPosts(posts.length, false);
  }, [loading, posts.length, fetchPosts]);

  const hasMore = posts.length < total;

  return { posts, loading, error, hasMore, loadMore, total };
}

export default usePosts;