import { useState, useEffect, useCallback, useMemo } from 'react';
import useDebounce from './useDebounce';

function usePosts({ searchTerm = '', tag = '', limit = 10 } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const buildApiUrl = useCallback((skip = 0) => {
    let url;
    if (debouncedSearchTerm) {
      url = `https://dummyjson.com/posts/search?q=${encodeURIComponent(debouncedSearchTerm)}&`;
    } else if (tag) {
      url = `https://dummyjson.com/posts/tag/${encodeURIComponent(tag)}?`;
    } else {
      url = 'https://dummyjson.com/posts?';
    }
    return `${url}limit=${limit}&skip=${skip}`;
  }, [debouncedSearchTerm, tag, limit]);

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

  const availableTags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const fetchPostById = useCallback(async (id) => {
    try {
      const res = await fetch(`https://dummyjson.com/posts/${id}`);
      if (!res.ok) throw new Error('Erreur lors du chargement du post');
      const data = await res.json();
      setSelectedPost(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const clearSelectedPost = useCallback(() => setSelectedPost(null), []);

  return {
    posts, loading, error, hasMore, loadMore, total,
    availableTags, selectedPost, fetchPostById, clearSelectedPost
  };
}

export default usePosts;