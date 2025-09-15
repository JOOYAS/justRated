const genres = [
    'Featured', 'Top', 'Malayalam', 'Indian', 'Action', 'Comedy', 'Fantasy', 'Romance',
    'Sci-Fi', 'Thriller', 'Animation'
];

const GenreBar = ({ selectedGenre, onSelect }) => {
    return (
        <div className="w-full overflow-x-auto py-2 px-4 bg-neutral-900/25 dark:bg-white/25">
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