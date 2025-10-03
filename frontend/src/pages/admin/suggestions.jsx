import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axios_instance';
import { Link } from 'react-router-dom';

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const res = await axiosInstance.get('/suggest');
                if (res.data.success) {
                    setSuggestions(res.data.suggestions);
                }
            } catch (err) {
                console.error('Failed to load suggestions:', err);
            }
        };

        fetchSuggestions();
    }, []);


    return (
        <>
            <section className="px-6 py-10 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">📬 Requested Movies</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {suggestions?.map((movie) => (
                        <div
                            key={movie._id}
                            className="group relative bg-gradient-to-br from-gray-900 via-indigo-800 to-purple-700 text-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
                        >
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-pulse transition-all duration-300">
                                {movie.requestCount} <span className='hidden group-hover:inline'> Requests</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                <Link to={`/movies/external/${movie?.imdbID}`} className='hover:underline'>{movie.title}</Link></h3>
                            <p className="text-lg text-gray-300">{movie.year}</p>
                        </div>
                    ))}
                </div>
            </section>

        </>
    )
}

export default Suggestions