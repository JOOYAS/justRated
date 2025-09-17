import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios_instance";
import { Link, useLocation } from "react-router-dom";

const SearchModal = ({ show, onClose }) => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([])
    const [persons, setPersons] = useState([])

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
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <span key={i} className="bg-yellow-300">
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
        onClose(); // close modal
    }, [location.pathname]);

    if (!show) return null;
    return (
        <div className="fixed inset-0 h-dvh backdrop-blur-sm pt-2 bg-black/60 mt-16 flex justify-center items-start">
            <div className="bg-white dark:bg-neutral-800 w-full max-w-3xl rounded-3xl shadow-lg p-6 relative">
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
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {filteredMovies.map((m) => (
                                <Link key={m?._id} to={`/movies/${m?._id}`} className="p-2 rounded-md bg-amber-50 dark:bg-neutral-700/40 hover:text-blue-900 hover:underline">
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
                                <Link key={p?._id} to={`/person/${p?._id}`} className="p-2 rounded-md bg-amber-50/40 dark:bg-neutral-700/40">
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
            </div>
        </div>
    );
}

export default SearchModal;