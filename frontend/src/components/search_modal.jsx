import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios_instance";
import { Link, useLocation } from "react-router-dom";
import ExternalMovieDetailsPage from "../pages/user/external_movie_detail";

const SearchModal = ({ show, onClose }) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([])
    const [persons, setPersons] = useState([])
    const [externalMovies, setExternalMovies] = useState([])

    useEffect(() => {
        axiosInstance.get('/movies')
            .then(res => setMovies(res.data?.movies))
            .catch(err => {
                console.error(err)
            })
    }, [])
    useEffect(() => {
        axiosInstance.get('/person')
            .then(res => setPersons(res.data?.persons))
            .catch(err => {
                console.error(err)
            })
    }, [])

    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
    useEffect(() => {
        if (!searchTerm) return;
        const delayDebounce = setTimeout(() => {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.Response === 'True') {
                        setExternalMovies(data?.Search.slice(0, 6))
                    } else {
                        console.warn('Movie not found:', data.Error);
                        setExternalMovies([]);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('OMDb fetch error:', err);
                    setLoading(false);
                });
        }, 1000); // wait 1000ms after user stops typing

        return () => clearTimeout(delayDebounce); // cleanup on next keystroke
    }, [searchTerm])




    const filteredMovies = movies.filter(m =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPersons = persons.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function HighlightText({ text, query }) {
        if (!query) return <>{text}</>;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return (
            <span className="hover:text-blue-900 dark:hover:text-blue-500 hover:underline inline">
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={i} className="bg-yellow-400 dark:bg-yellow-800 inline">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    }

    useEffect(() => {
        onClose(); // close modal when moving to another page
    }, [location.pathname]);

    if (!show) return null;
    return (
        <div className="fixed inset-0 h-dvh backdrop-blur-sm p-4 bg-black/60 mt-16 flex justify-center items-start">
            <div className="bg-white dark:bg-indigo-950 w-full max-w-3xl rounded-3xl shadow-lg p-6 relative">
                {/* Close Btn */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                >
                    ✕
                </button>

                {/* Search Input */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movies or persons..."
                    className="w-full border-b border-neutral-400 dark:border-neutral-600 bg-transparent outline-none p-2 mb-6 text-lg"
                />

                {/* Movies */}
                {/* Movies */}
                {filteredMovies.length > 0 && searchTerm !== "" ? (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Movies</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredMovies.map((m) => (
                                <Link key={m?._id} to={`/movies/${m?._id}`} className="p-2 rounded-md bg-emerald-50 dark:bg-indigo-950/40 border border-transparent hover:border-blue-500 flex items-center gap-1">
                                    <img src={m.poster.url} className="h-20" alt="movie poster" />
                                    <HighlightText text={m?.title} query={searchTerm} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )
                    : ""}

                {/* persons */}
                {filteredPersons.length > 0 && searchTerm !== "" ? (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">persons</h3>
                        <div className="flex flex-wrap gap-4">
                            {filteredPersons.map((p) => (
                                <Link key={p?._id} to={`/person/${p?._id}`} className="p-2 rounded-md bg-emerald-50/40 dark:bg-indigo-950/40 flex items-center hover">
                                    <img src={p.photo.url} alt="person photo" />
                                    <HighlightText text={p?.name} query={searchTerm} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )
                    : ""}

                {/* Empty */}
                {filteredMovies.length === 0 && filteredPersons.length === 0 && (
                    <p className="text-center text-gray-500">Couldn't find anything.</p>
                )}

                {externalMovies.length > 0 && searchTerm !== "" ? (
                    <div className="mb-6">
                        <div className="flex items-center mb-3">
                            <h3 className="text-lg font-semibold mr-2">Suggested Movies from External Sources</h3>
                            <span
                                className="text-yellow-500 cursor-help"
                                title="These movie details are sourced from the internet and may not exist in our official database."
                            >
                                ⚠️
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {externalMovies.map((m, i) => (
                                <Link key={m?.i} to={`/movies/external/${m?.imdbID}`} className="p-2 rounded-md bg-emerald-50 dark:bg-indigo-950/40 border border-transparent hover:border-blue-500 flex items-center gap-1">
                                    <img src={m.Poster} className="h-20" alt="movie poster" />
                                    <HighlightText text={m?.Title + ", " + m?.Year} query={searchTerm} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )
                    : ""}
            </div>
        </div>
    );
}

export default SearchModal;