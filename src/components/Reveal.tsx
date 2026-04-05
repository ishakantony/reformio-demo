import { useEffect, useRef, type ReactNode } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export function Reveal({
  children,
  className = "",
  scale = false,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  scale?: boolean;
  stagger?: boolean;
}) {
  const ref = useReveal();
  const base = stagger
    ? "stagger-children"
    : scale
      ? "reveal-scale"
      : "reveal";
  return (
    <div ref={ref} className={`${base} ${className}`}>
      {children}
    </div>
  );
}
