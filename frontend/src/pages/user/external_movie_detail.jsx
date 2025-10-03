import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoaderOverlay from '../../components/loader_overlay';
import AISummaryCard from '../../components/ai_summary';
import axiosInstance from '../../../utils/axios_instance';

const ExternalMovieDetailsPage = () => {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [aiSummary, setAiSummary] = useState('');
    const [suggested, setSuggested] = useState(false);
    const [suggestLoading, setSuggestLoading] = useState(false);


    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

    useEffect(() => {
        if (!imdbID) return;
        http://www.omdbapi.com/?i=tt0111161&apikey=YOUR_API_KEY

        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}`)
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
    }, [imdbID]);

    useEffect(() => {
        const fetchAISummary = async () => {
            try {
                const res = await axiosInstance.post(
                    `/ai/review/${movie?.imdbID}`,
                    {
                        movieInDB: false,
                        movieData: {
                            title: movie?.Title,
                            year: movie?.Year
                        }
                    });
                if (res?.data?.success) {
                    setAiSummary(res.data.summary);
                }
            } catch (err) {
                console.error('Failed to fetch AI summary:', err);
            }
        };

        if (movie?.Title) fetchAISummary();
    }, [movie]);

    const handleSuggest = async () => {
        setSuggestLoading(true);
        try {
            const res = await axiosInstance.post(
                '/suggest',
                {
                    title: movie?.Title,
                    year: movie?.Year,
                    imdbID: movie?.imdbID
                });
            if (res.data.success) {
                setSuggested(true);
            }
        } catch (err) {
            console.error('Suggestion failed:', err);
        } finally {
            setSuggestLoading(false);
        }
    };


    if (loading) return <LoaderOverlay />;
    if (!movie || movie.Response !== 'True') {
        return <p className="text-center text-red-500 mt-10">Movie details not available.</p>;
    }

    return (
        <>
            <section className="relative h-[40vh] md:h-[70vh] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={movie.Poster}
                        alt="Background"
                        className="absolute blur-xs w-full h-full bg-indigo-100 dark:bg-neutral-300 object-cover animate-bg-move"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                <div className="relative z-10 h-[40vh] md:h-[70vh] flex flex-row items-end gap-4 max-w-4xl mx-auto px-4 pb-6">
                    <img
                        src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/fallback.svg'}
                        alt={`${movie.Title} poster`}
                        className="w-32 md:w-64 h-auto rounded-lg shadow-lg"
                    />
                    <div className="text-white">
                        {movie.Title && (
                            <h1 className="text-xl md:text-3xl font-bold">{movie.Title} {movie.Year && (
                                <span className="text-gray-300 text-sm mt-1">{movie.Year}</span>
                            )}</h1>
                        )}

                        {movie.imdbRating && (
                            <p className="text-yellow-400 text-lg mt-2">⭐ {movie.imdbRating}/10</p>
                        )}
                        {movie.Genre && (
                            <p className="text-sm text-gray-300 mt-2">Genres: {movie.Genre}</p>
                        )}


                        <div className="mt-2">
                            <button
                                onClick={handleSuggest}
                                disabled={suggested || suggestLoading}
                                className={`inline-block px-2 md:px-6 py-2 rounded-2xl  text-black text-sm md:text-base font-semibold shadow-lg border-transparent border-4   duration-200
                                    ${suggested
                                        ? 'bg-green-500 text-white cursor-default'
                                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:border-amber-100 hover:shadow-xl transition-transform hover:scale-105'
                                    }`}
                            >
                                {suggested ? 'Suggested ✔️' : suggestLoading ? 'Suggesting...' : 'Suggest Adding to DataBase'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-4 mt-4 p-4 bg-yellow-400/45 border-l-4 border-yellow-500 rounded-2xl">
                <div className="flex items-center">
                    <span className="font-semibold">⚠️Notice:</span>
                    <span className="text-xs ml-1">This movie was retrieved from IMDb and is not part of our internal database. Some features may be unavailable.</span>
                </div>
            </section>
            <section className='mx-4 py-6 max-w-3xl md:mx-auto space-y-4'>
                <AISummaryCard aiSummary={aiSummary} />
            </section>

            <section className="mx-4 px-4 py-6 max-w-3xl md:mx-auto space-y-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                {movie.Plot && (
                    <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                        {movie.Plot}
                    </p>
                )}
                {movie.Runtime && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-gray-800 dark:text-gray-300">Runtime:</span> {movie.Runtime}
                    </p>
                )}
                {movie.Director && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-gray-800 dark:text-gray-300">Director:</span> {movie.Director}
                    </p>
                )}
                {movie.Actors && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-gray-800 dark:text-gray-300">Cast:</span> {movie.Actors}
                    </p>
                )}
            </section>
        </>
    );
}

export default ExternalMovieDetailsPage;