import { useEffect, useState } from "react"
import MovieCard from "../../components/movie_card"
import axiosInstance from "../../../utils/axios_instance"
import LoaderOverlay from "../../components/loader_overlay";
import toast from "react-hot-toast";


const Watchlist = () => {
    const [watchListData, setWatchListData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const fetchWatchlist = () => {
        setIsLoading(true);
        axiosInstance.get('user/watchlist')
            .then(res => {
                // console.log(res.data);
                const moviesRes = {
                    watchlist: [],
                    watched: []
                };

                res.data.watchlist.forEach(item => {
                    if (item.watched) {
                        moviesRes.watched.push(item.movie);
                    } else {
                        moviesRes.watchlist.push(item.movie);
                    }
                });

                setWatchListData(moviesRes);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const removeFromWatchlist = (movie) => {
        axiosInstance.delete(`/watchlist/${movie._id}`, {})
            .then(res => {
                if (res?.data?.success) {
                    // setIsInwatchlist(true)
                    toast.success(res.data.message || "movie removed from watchlist");
                    // refetching
                    fetchWatchlist();
                }
            })
            .catch(err => {
                console.error('Error adding to watchlist:', err);
            });
    };

    const toggleWatched = (movie) => {
        axiosInstance.patch(`/watchlist/${movie._id}/toggle`, {})
            .then(res => {
                if (res?.data?.success) {
                    // setIsWatched(true)
                    toast.success(res.data?.message || "movie added/removed from watched");
                    // refetching
                    fetchWatchlist();
                }
            })
            .catch(err => {
                console.error('Error adding to watchlist:', err);
            });
    };

    if (isLoading) return <LoaderOverlay />;
    return (
        <section className="p-4 pt-2">
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Watchlist Section */}
                <div>
                    <h2 className="text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-4">
                        My Watchlist
                    </h2>

                    {watchListData?.watchlist?.length ? (
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            {watchListData.watchlist.map((m) => (
                                <div className="group relative w-fit">
                                <MovieCard key={m._id} movie={m} />

                                    {/* Hover Actions */}
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        <button
                                            onClick={() => removeFromWatchlist(m)}
                                            title="Remove from Watchlist"
                                            className="px-2 py-1 rounded-2xl bg-red-600 text-black text-xs shadow hover:bg-yellow-600"
                                        >
                                            Unlist
                                        </button>
                                        <button
                                            onClick={() => toggleWatched(m)}
                                            title="Mark Movie as Watched"
                                            className="px-2 py-1 rounded-2xl bg-green-600 text-white text-xs shadow hover:bg-green-700"
                                        >
                                            Watched
                                        </button>
                                    </div>
                                </div>
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

                    {watchListData?.watched?.length ? (
                        <div className="flex flex-wrap justify-center-safe md:justify-start gap-4">
                            {watchListData.watched.map((m) => (
                                <div className="group relative w-fit">
                                    <MovieCard key={m._id} movie={m} />

                                    {/* Hover Action */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        <button
                                            onClick={() => toggleWatched(m)}
                                            title="Remove from Watched List"
                                            className="px-2 py-1 rounded-2xl bg-yellow-500 text-white text-xs shadow hover:bg-red-700"
                                        >
                                            Unwatch
                                        </button>
                                    </div>
                                </div>
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