import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import StarIcon from "/icons/StarIcon.png";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    img: string;
    rating: number;
    testimony: string;
    name: string;
    date: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const speedMap = {
        fast: "20s",
        normal: "40s",
        slow: "80s",
      };
      containerRef.current.style.setProperty(
        "--animation-duration",
        speedMap[speed]
      );
    }
  };

  const getStars = (rating: number) => {
    return (
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }, (_, i) => (
          <img key={i} src={StarIcon} alt="star" className="w-4 h-4" />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-[1400px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 md:gap-8 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
            }}
            className="w-[300px] sm:w-[450px] relative rounded-2xl flex-shrink-0 md:w-[550px] text-justify"
            key={item.name}
          >
            <div className="bg-white h-full w-full md:min-h-[280px] p-6 rounded-2xl relative z-10">
              {getStars(item.rating)}
              <span className="relative z-20 text-sm leading-[1.6] text-black font-normal">
                {item.testimony}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-[18px] leading-[1.6] text-[#110724] font-bold">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-[#110724] font-normal">
                    {item.date}
                  </span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
