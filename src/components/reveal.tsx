"use client";

import {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  as?: ElementType;
  delay?: number;
  mode?: "load" | "in-view";
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

type RevealGroupProps = HTMLAttributes<HTMLDivElement> & {
  as?: ElementType;
  mode?: "load" | "in-view";
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function Reveal({
  children,
  className,
  style,
  as: Component = "div",
  delay = 0,
  mode = "in-view",
  once = true,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.24,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const frame = window.requestAnimationFrame(() => {
        setVisible(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    if (mode === "load") {
      const frame = window.requestAnimationFrame(() => {
        setVisible(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [mode, once, rootMargin, threshold]);

  const mergedStyle: CSSProperties = {
    ...style,
    transitionDelay: `${delay}ms`,
  };

  return (
    <Component
      ref={ref}
      className={`reveal${visible ? " reveal-visible" : ""}${className ? ` ${className}` : ""}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({
  children,
  className,
  as: Component = "div",
  mode = "in-view",
  once = true,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.24,
  ...rest
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const frame = window.requestAnimationFrame(() => {
        setVisible(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    if (mode === "load") {
      const frame = window.requestAnimationFrame(() => {
        setVisible(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [mode, once, rootMargin, threshold]);

  return (
    <Component
      ref={ref}
      className={`reveal-group${visible ? " reveal-group-visible" : ""}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
