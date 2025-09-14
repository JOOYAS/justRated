const genres = [
    'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance',
    'Sci-Fi', 'Thriller', 'Documentary', 'Animation', 'Adventure'
];

const GenreBar = ({ selectedGenre, onSelect }) => {
    return (
        <div className="w-full overflow-x-auto whitespace-nowrap py-2 px-4 bg-neutral-900/25 dark:bg-white/25">
            {genres.map((genre) => (
                <button
                    key={genre}
                    onClick={() => onSelect(genre)}
                    className={`inline-block px-4 py-2 mx-2 rounded-full text-sm font-medium transition-colors duration-300 ${selectedGenre === genre
                        ? 'bg-yellow-400 text-black'
                        : 'bg-neutral-200 dark:bg-gray-700 text-black dark:text-white hover:bg-yellow-500'
                        }`}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default GenreBar