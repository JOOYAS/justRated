import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios_instance";
import LazyImage from "./lazy_image";
import { useState } from "react";

const MovieCard = ({ movie }) => {
    const location = useLocation();
    const isWatchlistPage = location.pathname === '/watchlist';
    const [fillColor, setFillColor] = useState('#ffff66');

    const addToWatchlist = () => {
        axiosInstance.post(`/watchlist/${movie._id}`, {})
            .then(res => {
                if (res?.data?.success) {
                    console.log('toggle success')
                    setFillColor('#ffd230'); // update fill color on success
                }
            })
            .catch(err => {
                console.error('Error adding to watchlist:', err);
            });
    };


    return (
        <div
            className="group flex-none  w-32 md:w-44 relative bg-white dark:bg-amber-950 rounded-xl shadow hover:shadow-lg transition duration-300 border-4 border-transparent hover:border-amber-200"
        >
            <LazyImage publicId={movie?.poster?.public_id} alt={`${movie?.name} movie poster`} className={"w-full h-40 md:h-64 object-cover rounded-lg bg-amber-800/35"} />
            {/* <img
                src={movie.poster?.url || "/sample_placeholder.png"}
                alt={`${movie.name} movie poster`}
                className=""
            /> */}
            {!isWatchlistPage && (
                <svg width="30" height="30" className="hidden group-hover:block absolute top-0 ms-2 cursor-pointer" onClick={() => addToWatchlist}>
                    <title>Add to Watchlist</title>
                    <path d="M   0   0 L 30   0 L 30 30 L  15  20 L   0 30 Z" fill={fillColor} />
                    <text x="15"
                        y="15"
                        fill="#000000"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        className="text-3xl">
                        +
                    </text>
                </svg>
            )}
            <div className="p-2">{movie?.rating &&
                <span className="text-amber-400 font-semibold py-0.5 group-hover:text-3xl">
                    <span className="group-hover:hidden">⭐</span> {movie.rating}/10
                </span>}
                <Link
                    to={`/movies/${movie._id}`}
                    className="block w-full truncate text-base md:text-lg font-semibold group-hover:text-blue-500 hover:underline group-hover:whitespace-normal group-hover:overflow-visible"
                    aria-label="view detailed" title="view detailed"
                >
                    {movie.title}
                </Link>
            </div>
        </div>
    );
}

export default MovieCard;