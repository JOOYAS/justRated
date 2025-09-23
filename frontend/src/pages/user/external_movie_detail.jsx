import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ExternalMovieDetailsPage = () => {
    const { title } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

    useEffect(() => {
        if (!title) return;

        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    console.warn('Movie not found:', data.Error);
                    setMovie(null);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('OMDb fetch error:', err);
                setLoading(false);
            });
    }, [title]);

    if (loading) return <p>Loading...</p>;
    if (!movie) return <p>Movie not found.</p>;


    return (<>
        <section className="relative h-[40vh] md:h-[70vh] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src={'/ooorganize4.svg'}
                    alt="Background"
                    className="absolute w-full h-full bg-indigo-100 dark:bg-neutral-300 object-cover animate-bg-move"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className='relative z-10 h-[40vh] md:h-[70vh] flex flex-row items-end gap-4 max-w-4xl mx-auto px-4 pb-6'>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/fallback.svg'}
                    alt={`${movie.Title} poster`}
                    className="w-32 md:w-64 h-auto rounded-lg shadow-lg"
                />
                <div>
                    <h1 className="text-3xl font-bold mt-6 text-center">{movie.Title}</h1>
                    <p className="text-center text-gray-400">{movie.Year}</p>
                    <p className="text-yellow-400 text-center mt-2">⭐ {movie.imdbRating}/10</p>
                    <p className="text-center text-sm mt-2">Genres: {movie.Genre}</p>
                </div>

            </div>
        </section>
        <section>
            <p className="mt-4 text-center max-w-2xl mx-auto">{movie.Plot}</p>

        </section>
    </>
    );
}

export default ExternalMovieDetailsPage;