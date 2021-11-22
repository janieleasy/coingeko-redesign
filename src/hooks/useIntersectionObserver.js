import React from 'react';

export default function useIntersectionObserver({ target, onIntersect }) {
  const element = target.current;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('intersecting............');
            onIntersect.current();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px 5px 0px',
        threshold: 1,
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);
}
