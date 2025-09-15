import { useEffect, useState } from "react"
import MovieCard from "../../components/movie_card"
import axiosInstance from "../../../utils/axios_instance"

const mockWatchlist = [
    { _id: "w1", title: "Mock Movie 1", poster: "https://picsum.photos/200/300" },
    { _id: "w2", title: "Mock Movie 2", poster: "https://picsum.photos/200/301" },
]

const Watchlist = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get('user/watchlist')
            .then(res => {
                // console.log(res.data);
                const moviesRes = res.data.watchlist.map(item => item.movie);
                setMovies(moviesRes);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setMovies(mockWatchlist);
                setIsLoading(false);
            });
    }, []);

    return (
        <section className='p-4 pt-2'>
            <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-4">
                    My Watchlist
                </h2>

                {movies?.length ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {movies?.map(m => <MovieCard key={m?._id} movie={m} />)}
                    </div>
                ) : (
                        <div className="text-center text-xl py-12 text-neutral-950 dark:text-neutral-100">

                            <h2>Your watchlist is empty</h2>
                            <p className="text-base mt-2">
                            Start adding movies to your watchlist
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Watchlist;