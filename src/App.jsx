import React, { useState, useCallback } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostSearch from './components/PostSearch';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import usePosts from './hooks/usePosts';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { posts, loading, error, hasMore, loadMore } = usePosts({ searchTerm });
  const [infiniteScroll, setInfiniteScroll] = useLocalStorage('infiniteScroll', true);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  return (
    <ThemeProvider>
      <div className="container py-4">
        <header className="pb-3 mb-4 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-5 fw-bold">Blog</h1>
            <ThemeToggle />
          </div>
        </header>

        <main>
          <PostSearch onSearch={handleSearchChange} />

          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="scrollMode"
              checked={infiniteScroll}
              onChange={(e) => setInfiniteScroll(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="scrollMode">
              Défilement infini
            </label>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <PostList
            posts={posts}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
            infiniteScroll={infiniteScroll}
          />
        </main>

        <footer className="pt-3 mt-4 text-center border-top">
          <p>TP React Hooks - Blog &middot; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;