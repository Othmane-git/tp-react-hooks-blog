import React, { useState, useCallback } from 'react';

function PostSearch({ onSearch, onTagSelect, availableTags = [], selectedTag = '' }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setSearchInput('');
    onSearch('');
  }, [onSearch]);

  const handleTagSelect = useCallback((e) => {
    if (onTagSelect) onTagSelect(e.target.value);
  }, [onTagSelect]);

  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher des articles..."
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Rechercher"
            />
            {searchInput && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleClear}
                aria-label="Effacer"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedTag}
            onChange={handleTagSelect}
            aria-label="Filtrer par tag"
          >
            <option value="">Tous les tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostSearch);