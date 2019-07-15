import React, { useEffect, useState, createContext, useContext } from "react";

const VisibilityContext = createContext({ isVisible: false, entries: [] });

interface VisibilityObeserverProps extends IntersectionObserverInit {
  children: React.ReactNode;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const VisibilityObeserver: React.FC<VisibilityObeserverProps> = ({
  children,
  root = null,
  rootMargin = "50px 50px 50px 50px",
  threshold = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [entries, setEntries] = useState();
  const ref = React.createRef() as React.RefObject<HTMLDivElement>;

  const observerOptions = { root, rootMargin, threshold };
  const observerCallback: IntersectionObserverCallback = observerEntries => {
    const visible =
      observerEntries.filter(obj => obj.isIntersecting === true).length > 0;

    setEntries(observerEntries);
    setIsVisible(visible);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref}>
      <VisibilityContext.Provider value={{ isVisible, entries }}>
        {children}
      </VisibilityContext.Provider>
    </div>
  );
};

const useVisibilityObserver = () => {
  const { isVisible, entries } = useContext(VisibilityContext);

  return {
    isVisible,
    entries: entries as IntersectionObserverEntry[]
  };
};

export { VisibilityObeserver, useVisibilityObserver, VisibilityObeserverProps };
