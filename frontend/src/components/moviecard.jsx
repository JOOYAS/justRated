import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios_instance";

const MovieCard = ({ movie }) => {

    return (
        <div
            className="group flex-none  w-32 md:w-44 relative bg-white dark:bg-amber-950 rounded-xl shadow hover:shadow-lg transition duration-300 border-4 border-transparent hover:border-amber-200"
        >
            <img
                src={movie.poster?.url || "/328-300x300.jpg"}
                alt={`${movie.name} movie poster`}
                className="w-full h-40 md:h-64 object-cover rounded-lg bg-amber-800/35"
            />
            <svg width="30" height="30" className="absolute top-0 ms-2 cursor-pointer" onClick={() => {
                axiosInstance.post(`/watchlist/${movie._id}`, {})
                    .then(res => res.data)
                    .then(data => {
                        if (data?.success) console.log('toggle success');
                    })
            }}>
                <path d="M   0   0
             L 30   0
             L 30 30
             L  15  20
             L   0 30
             Z"
                    fill="#ffd230" />

                <text x="15"
                    y="15"
                    fill="#000000"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="text-3xl">
                    +
                </text>
            </svg>
            <div className="p-2">
                {movie?.rating && <p className="text-base font-medium text-gray-500">{movie.rating}/10</p>}
                <Link
                    to={`/movies/${movie._id}`}
                    className="block w-full text-center truncate text-lg font-semibold group-hover:text-blue-500 hover:underline group-hover:whitespace-normal group-hover:overflow-visible"
                >
                    {movie.name}
                </Link>


            </div>
        </div>
    );
}

export default MovieCard;