"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ImageProps } from "next/image";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollByAmount = (amount: number) => {
    carouselRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleCardClose = (index: number) => {
    if (!carouselRef.current) return;
    // MODIFIED: Match new card widths: w-48 -> 192px, md:w-72 -> 288px
    const cardWidth = window.innerWidth < 768 ? 192 : 288;
    const gap = window.innerWidth < 768 ? 4 : 8; // Assuming gap is `gap-1` or `gap-2`
    carouselRef.current.scrollTo({
      left: (cardWidth + gap) * (index + 1), // Adjust scroll logic if needed
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          // MODIFIED: Reduced vertical padding
          className="flex w-full overflow-x-scroll scroll-smooth py-10 [scrollbar-width:none]"
        >
          <div className="flex flex-row gap-4 w-full">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.2 * index, ease: "easeOut" },
                }}
                className="rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute right-4 bottom-4 flex gap-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={() => scrollByAmount(-300)}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={() => scrollByAmount(300)}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }: { card: Card; index: number; layout?: boolean }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && handleClose();
    document.body.style.overflow = open ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 max-w-5xl rounded-3xl bg-white p-4 md:p-10 dark:bg-neutral-900"
            >
              <button
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p layoutId={layout ? `category-${card.title}` : undefined} className="text-base font-medium">
                {card.category}
              </motion.p>
              <motion.p layoutId={layout ? `title-${card.title}` : undefined} className="mt-4 text-2xl font-semibold md:text-5xl">
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODIFIED: Reduced card size */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={() => setOpen(true)}
        className="relative z-10 flex h-64 w-48 md:h-[28rem] md:w-72 flex-col overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-10" />
        <div className="relative z-20 p-8 text-white">
          <motion.p className="text-sm md:text-base">{card.category}</motion.p>
          <motion.p className="mt-2 text-xl md:text-3xl font-semibold">{card.title}</motion.p>
        </div>
        {/* The BlurImage component is now just a regular image component */}
        <BlurImage src={card.src} alt={card.title} className="absolute inset-0 object-cover" />
      </motion.button>
    </>
  );
};

// MODIFIED: This component no longer applies a blur effect.
export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  // REMOVED: const [isLoading, setLoading] = useState(true);
  return (
    <img
      // REMOVED: The conditional blur classes and transition.
      className={cn("h-full w-full", className)}
      // REMOVED: onLoad={() => setLoading(false)}
       src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt || "Background"}
      {...rest}
    />
  );
};