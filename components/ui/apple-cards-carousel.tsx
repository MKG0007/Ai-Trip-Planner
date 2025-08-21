"use client";

import { useEffect, useRef, useState } from "react";

// ✅ Hook to handle clicks outside
function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}

interface CardData {
  category: string;
  title: string;
  src: string;
}

interface CarouselProps {
  items: CardData[];
  initialScroll?: number;
}

export default function AppleCardsCarousel({
  items,
  initialScroll = 0,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useOutsideClick(containerRef, handleClose);

  useEffect(() => {
    if (containerRef.current && initialScroll > 0) {
      containerRef.current.scrollLeft = initialScroll;
    }
  }, [initialScroll]);

  return (
    <div
      ref={containerRef}
      className="relative flex space-x-6 overflow-x-auto p-10 
                 bg-gradient-to-br from-white via-gray-50 to-gray-100 
                 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 
                 rounded-2xl shadow-xl scrollbar-hide"
    >
      {items.map((card, i) => (
        <div
          key={i}
          className="flex flex-col w-[320px] md:w-[380px] h-[420px] md:h-[460px] 
                     bg-white dark:bg-neutral-800 rounded-2xl 
                     shadow-md hover:shadow-2xl 
                     transform hover:scale-105 transition-all duration-300 ease-out
                     p-6"
        >
          {/* Image wrapper */}
          <div className="w-full h-48 overflow-hidden rounded-xl">
            <img
              src={card.src}
              alt={card.category}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content wrapper */}
          <div className="flex flex-col flex-1 justify-between mt-4 text-center">
            <h3 className="text-lg font-semibold">{card.category}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {card.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
