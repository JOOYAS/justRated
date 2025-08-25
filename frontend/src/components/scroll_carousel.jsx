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
                className="absolute h-full left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 hover:border-2 border-amber-100"
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
                className="absolute h-full right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 hover:border-2 border-amber-100"
            >
                ▶
            </button>
        </div>
    );
}

export default ScrollableCarousel;