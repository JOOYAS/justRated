import { Link, useNavigate } from "react-router-dom";
import LazyImage from "../lazy_image";

const AdminMovieCard = ({ movie }) => {

    return (
        <div
            className="group flex-none w-32 md:w-44 relative bg-gray-100 dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition duration-300 border-4 border-transparent hover:border-amber-600"
        >
            <LazyImage publicId={movie?.poster?.public_id} alt={`${movie.name} movie poster`} className={"w-full h-40 md:h-64 object-cover rounded-lg bg-amber-800/35"} />
            {/* <img
                src={movie.poster?.url || "/ooorganize.svg"}
                alt={`${movie.name} movie poster`}
                className="w-full h-40 md:h-64 object-cover rounded-lg bg-amber-800/35"
            /> */}
            <div className="p-3 space-y-0.5">
                <Link
                    to={`/su/movies/${movie._id}`}
                    className="block w-full truncate text-lg font-semibold group-hover:text-blue-500 hover:underline group-hover:whitespace-normal group-hover:overflow-visible"
                >
                    {movie.title}
                </Link>
                {movie?.rating &&
                    <span className="text-amber-400 font-semibold py-0.5 rounded-full shadow hover:scale-150">
                        ⭐ {movie.rating}/10
                    </span>}
                {/* <div className="flex gap-2 mt-2">
                    <button className="flex-1 px-2 py-1 text-xs rounded bg-blue-500 hover:bg-blue-600 text-white">Edit</button>
                    <button className="flex-1 px-2 py-1 text-xs rounded bg-red-500 hover:bg-red-600 text-white">Delete</button>
                </div> */}
            </div>
        </div>
    );
}

export default AdminMovieCard;