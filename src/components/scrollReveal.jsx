import { useEffect, useRef, useState } from "react";

export default function useScrollReveal(threshold = 0.02) {
  const ref = useRef(null);                // single element
  const refs = useRef([]);                 // multiple elements
  const [visible, setVisible] = useState(false);       // single
  const [visibleList, setVisibleList] = useState([]);  // multiple

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // single-element mode
            if (entry.target === ref.current) {
              setVisible(true);
            }

            // multi-element mode
            const index = refs.current.indexOf(entry.target);
            if (index !== -1) {
              setVisibleList((prev) => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
              });
            }
          }
        });
      },
      { threshold }
    );

    // Observe single element if used
    if (ref.current) observer.observe(ref.current);

    // Observe all multi refs
    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, refs, visible, visibleList };
}
