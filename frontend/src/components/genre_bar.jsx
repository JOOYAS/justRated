import { useEffect, useRef, useState } from "react";

const genres = [
    'Featured', 'Top', 'Malayalam', 'Indian', 'Action', 'Comedy', 'Fantasy', 'Romance',
    'Sci-Fi', 'Thriller', 'Animation'
];


const GenreBar = ({ selectedGenre, onSelect }) => {
    const [showHeader, setShowHeader] = useState(true)
    const lastScroll = useRef(0);

    useEffect(() => {


        const handleScroll = () => {
            const current = window.scrollY;
            setShowHeader(current < lastScroll.current || current < 10);
            lastScroll.current = current;
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <div className={`fixed w-full z-40 overflow-x-auto py-2 px-4 backdrop-blur-xs bg-neutral-900/5 dark:bg-white/25 transition-all duration-500 ${showHeader ? "" : "top-0"}`}>
            <div className="flex whitespace-nowrap justify-center min-w-max">
            {genres.map((genre) => (
                <a
                    key={genre}
                    href={`#${genre.toLowerCase()}`}
                    // onClick={}
                    className={`inline-block px-4 py-2 mx-2 rounded-full text-sm font-medium transition-colors duration-300 ${selectedGenre === genre
                        ? 'bg-yellow-400 text-black'
                        : 'bg-neutral-200 dark:bg-gray-700 text-black dark:text-white hover:bg-yellow-500'
                        }`}
                >
                    {genre}
                </a>
            ))}
            </div>
        </div>
    );
};

export default GenreBar