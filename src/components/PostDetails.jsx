import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

function PostDetails({ post, onClose, onTagClick }) {
  const { theme } = useTheme();

  const themeClasses = useMemo(() => ({
    card: theme === 'dark' ? 'border-secondary' : '',
    badge: theme === 'dark' ? 'bg-light text-dark' : 'bg-secondary'
  }), [theme]);

  if (!post) return null;

  const reactions =
    typeof post.reactions === 'object'
      ? (post.reactions.likes ?? 0) + (post.reactions.dislikes ?? 0)
      : post.reactions;

  return (
    <div className={`card mb-4 ${themeClasses.card}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{post.title}</h5>
        <button className="btn btn-sm" onClick={onClose} aria-label="Fermer">
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="card-body">
        <p className="card-text">{post.body}</p>

        <div className="d-flex gap-3 text-muted mb-3">
          <span><i className="bi bi-hand-thumbs-up"></i> {reactions} réactions</span>
          {post.userId && <span><i className="bi bi-person"></i> Utilisateur #{post.userId}</span>}
          {post.views != null && <span><i className="bi bi-eye"></i> {post.views} vues</span>}
        </div>

        <div>
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className={`badge me-1 ${themeClasses.badge}`}
              onClick={() => onTagClick && onTagClick(tag)}
              style={{ cursor: 'pointer' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostDetails);