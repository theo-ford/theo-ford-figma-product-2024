import { useEffect, useState, useRef } from "react";

export function useOnScreenFullBleed(ref) {
  // console.log("useOnSCreen");
  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef(null);
  const options = {
    threshold: 0,
  };

  useEffect(
    () => {
      observerRef.current = new IntersectionObserver(([entry]) =>
        setIsOnScreen(entry.isIntersecting)
      );
    },
    {
      root: document,
      rootMargin: "50%",
      threshold: 0,
    }
  );
  useEffect(() => {
    observerRef.current.observe(ref.current);
    return () => {
      observerRef.current.disconnect();
    };
  }, [ref]);
  return isOnScreen;
}
