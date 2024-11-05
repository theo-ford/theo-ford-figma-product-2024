import { useEffect, useState, useRef } from "react";

export function useOnScreenFullBleed(ref) {
  // console.log("useOnSCreen");
  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef(null);

  console.log("TEST");

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
      },
      {
        root: document,
        rootMargin: "0px 0px 150px 0px",
        threshold: 0,
      }
    );
  });
  useEffect(() => {
    observerRef.current.observe(ref.current);
    return () => {
      observerRef.current.disconnect();
    };
  }, [ref]);
  return isOnScreen;
}
