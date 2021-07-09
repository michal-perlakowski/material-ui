import * as React from 'react';

const useNoop = <T extends Element, >(): [DOMRectReadOnly | null, React.MutableRefObject<T | null>] => {
  const ref = React.useRef<T | null>(null);
  return [null, ref];
};

const useResizeObserver = <T extends Element, >(): [DOMRectReadOnly | null, React.MutableRefObject<T | null>] => {
  const ref = React.useRef<T | null>(null);
  const prevRef = React.useRef<T | null>(null);
  const [rect, setRect] = React.useState<DOMRectReadOnly | null>(null);

  const resizeObserver = React.useRef(new ResizeObserver((entries) => {
    if (entries[0]) {
      setRect(entries[0].contentRect);
    }
  }));

  React.useEffect(() => {
    if (ref.current !== prevRef.current) {
      if (prevRef.current) {
        resizeObserver.current.unobserve(prevRef.current);
      }
      if (ref.current) {
        resizeObserver.current.observe(ref.current);
      }
      prevRef.current = ref.current;
    }
  });

  React.useEffect(() => {
    const observer = resizeObserver.current;
    return () => {
      observer.disconnect();
    };
  }, []);

  return [rect, ref];
};

const exportedFunction = (typeof window === 'undefined' || typeof window.ResizeObserver === 'undefined')
  ? useNoop
  : useResizeObserver;

export default exportedFunction;
