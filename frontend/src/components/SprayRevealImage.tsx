"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

type SprayRevealImageProps = ImageProps & {
  className?: string;
};

export default function SprayRevealImage({ className = "", ...props }: SprayRevealImageProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={containerRef} className={`spray-reveal${isVisible ? " is-visible" : ""}`}>
      <span aria-hidden="true" className="spray-reveal__mist" />
      <span aria-hidden="true" className="spray-reveal__droplets" />
      <Image {...props} className={`spray-reveal__image ${className}`} />
    </span>
  );
}