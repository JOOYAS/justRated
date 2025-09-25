import { useEffect, useState } from "react"
import MovieCard from "../../components/movie_card"
import axiosInstance from "../../../utils/axios_instance"

const mockWatchlist = [
    { _id: "w1", title: "Mock Movie 1", poster: "https://picsum.photos/200/300" },
    { _id: "w2", title: "Mock Movie 2", poster: "https://picsum.photos/200/301" },
]

const Watchlist = () => {
    const [watchList, setWatchList] = useState([]);
    const [watched, setWatched] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get('user/watchlist')
            .then(res => {
                // console.log(res.data);
                const moviesRes = res.data.watchlist.map(item => item.movie);
                setWatchList(moviesRes);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setWatchList(mockWatchlist);
                setIsLoading(false);
            });
    }, []);

    return (
        <section className="p-4 pt-2">
            <div className="max-w-4xl mx-auto space-y-10">
                {/* Watchlist Section */}
                <div>
                    <h2 className="text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-4">
                        My Watchlist
                    </h2>

                    {watchList?.length ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {watchList.map((m) => (
                                <MovieCard key={m._id} movie={m} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-xl py-12 text-neutral-950 dark:text-neutral-100">
                            <h2>Your watchlist is empty</h2>
                            <p className="text-base mt-2">Start adding movies to your watchlist</p>
                        </div>
                    )}
                </div>

                {/* Watched Section */}
                <div>
                    <h2 className="text-center font-bold text-2xl text-green-600 dark:text-green-400 py-4">
                        Watched Movies
                    </h2>

                    {watched?.length ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {watched.map((m) => (
                                <MovieCard key={m._id} movie={m} watched />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-base py-8 text-neutral-700 dark:text-neutral-300">
                            <p>You haven’t marked any movies as watched yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Watchlist;