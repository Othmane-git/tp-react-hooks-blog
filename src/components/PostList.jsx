import React, { useCallback, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true
}) {
  const [sentinelRef, isVisible] = useIntersectionObserver({
    enabled: infiniteScroll && hasMore && !loading,
    rootMargin: '200px'
  });

  useEffect(() => {
    if (isVisible && infiniteScroll && hasMore && !loading && onLoadMore) {
      onLoadMore();
    }
  }, [isVisible, infiniteScroll, hasMore, loading, onLoadMore]);

  const handlePostClick = useCallback((post) => {
    if (onPostClick) onPostClick(post);
  }, [onPostClick]);

  const handleTagClick = useCallback((e, tag) => {
    e.stopPropagation();
    if (onTagClick) onTagClick(tag);
  }, [onTagClick]);

  if (!loading && posts.length === 0) {
    return <p className="text-center text-muted my-4">Aucun article trouvé.</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div
          key={post.id}
          className="card mb-3"
          onClick={() => handlePostClick(post)}
          style={{ cursor: 'pointer' }}
        >
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
            <div>
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="badge bg-secondary me-1"
                  onClick={(e) => handleTagClick(e, tag)}
                  style={{ cursor: 'pointer' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {loading && <LoadingSpinner />}

      {infiniteScroll && hasMore && <div ref={sentinelRef} style={{ height: '1px' }} />}

      {!infiniteScroll && hasMore && !loading && (
        <div className="text-center my-3">
          <button className="btn btn-primary" onClick={onLoadMore}>
            Charger plus
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(PostList);