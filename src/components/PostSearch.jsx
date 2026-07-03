import React, { useState } from 'react';
// TODO: Exercice 3 - Importer useTheme

/**
 * Composant de recherche de posts
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onSearch - Fonction appelée lors de la saisie
 * @param {Function} props.onTagSelect - Fonction appelée lors de la sélection d'un tag
 * @param {Array} props.availableTags - Liste des tags disponibles
 * @param {string} props.selectedTag - Tag actuellement sélectionné
 */
function PostSearch({
  onSearch,
  onTagSelect,
  availableTags = [],
  selectedTag = ''
}) {
  const [searchInput, setSearchInput] = useState('');

  // TODO: Exercice 3 - Utiliser le hook useTheme

  // TODO: Exercice 3 - Utiliser useCallback pour optimiser le gestionnaire
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchInput('');
    onSearch('');
  };

  // TODO: Exercice 3 - Appliquer les classes CSS en fonction du thème
  const themeClasses = '';

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
            {/* TODO: Exercice 1 - Ajouter le bouton pour effacer la recherche */}
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

        {/* TODO: Exercice 4 - Ajouter le sélecteur de tags */}
      </div>
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default PostSearch;