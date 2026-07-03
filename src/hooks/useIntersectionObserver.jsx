import { useState, useEffect, useRef } from 'react';

function useIntersectionObserver({
  enabled = true,
  threshold = 0.1,
  rootMargin = '0px'
} = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, threshold, rootMargin]);

  return [targetRef, isIntersecting];
}

export default useIntersectionObserver;