import { useRef } from "react";

const ScrollableCarousel = ({ children }) => {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === "left" ? -300 : 300,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative w-full scroll">
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
               flex items-center justify-center 
               h-12 w-12 rounded-full 
               bg-black/40 backdrop-blur-sm 
               text-white shadow-lg
               hover:bg-black/60 hover:scale-110  active:text-amber-500
               hover:ring-2 hover:ring-amber-400 
               transition-all duration-300"
            >
                ◀
            </button>

            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth px-10"
            >
                {children}
            </div>

            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
               flex items-center justify-center 
               h-12 w-12 rounded-full 
               bg-black/40 backdrop-blur-sm 
               text-white shadow-lg
               hover:bg-black/60 hover:scale-110 
               hover:ring-2 hover:ring-amber-400 active:text-amber-500
               transition-all duration-300" 
            >
                ▶
            </button>
        </div>
    );
}

export default ScrollableCarousel;