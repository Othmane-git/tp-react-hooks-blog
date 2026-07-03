import React, { useState, useCallback } from 'react';

function PostSearch({ onSearch }) {
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
      </div>
    </div>
  );
}

export default React.memo(PostSearch);