import { useEffect, useRef, useState, createContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  body: string;
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
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth / visibleItems();
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth / visibleItems();
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const visibleItems = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: (index) => setCurrentIndex(index), currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex overflow-x-scroll py-10 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-col md:flex-row gap-10 w-full">
            {items.map((item, index) => (
              <motion.div
                key={"card" + index}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex justify-end gap-2 mt-2">
          <button
            className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="h-10 w-10 rounded-full bg-moonstone-400 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  return (
    <>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        className="overflow-hidden flex flex-col items-center md:items-start md:justify-start relative z-10 cursor-auto"
      >
        <img src={card.src} />
        <div className="absolute h-full top-0 inset-x-0 z-30" />
        <div className="relative z-40 py-4">
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-moonstone-500 text-xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {card.title}
          </motion.p>
        </div>
        <motion.p
          layoutId={layout ? `body-${card.body}` : undefined}
          className="md:text-justify leading-8"
        >
          {card.body}
        </motion.p>
      </motion.button>
    </>
  );
};
