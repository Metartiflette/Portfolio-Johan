// app/components/ui/carousel.tsx

"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

interface SlideData {
  src: string;
  alt?: string | null;
}

interface CarouselProps {
  slides: SlideData[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function Carousel({
  slides,
  autoPlay = false,
  autoPlayInterval = 10000,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextSlide = useCallback(
    () => setCurrent((prev) => (prev + 1) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (autoPlay) {
      timeoutRef.current = setTimeout(nextSlide, autoPlayInterval);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, autoPlay, autoPlayInterval, nextSlide]);

  return (
    <div className="relative w-full md:flex-[1_1_75%] md:max-w-[550px] overflow-hidden rounded-xl group">
      <div
        className="flex w-full h-full transition-transform duration-750 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-w-full flex-shrink-0 w-full">
            <div className="relative w-full h-full min-h-[450px] md:min-h-[650px]">
              <Image
                src={slide.src}
                alt={slide.alt || `Slide ${index + 1}`}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Aller au slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white scale-110" : "bg-gray-500/50 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}