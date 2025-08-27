import { useEffect, useState } from "react"
import MovieCard from "../../components/moviecard"
import axiosInstance from "../../../utils/axios_instance"

const mockWatchlist = [
    { _id: "w1", title: "Mock Movie 1", poster: "https://picsum.photos/200/300" },
    { _id: "w2", title: "Mock Movie 2", poster: "https://picsum.photos/200/301" },
]

const Watchlist = () => {
    const [movies, setMovies] = useState(mockWatchlist)

    useEffect(() => {
        axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/watchlist`)
            .then(res => {
                setMovies(res.data.watchlist)
                setMovies(mockWatchlist)
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <div className="p-6">
            <h2 className="text-center font-bold text-3xl text-amber-500 dark:text-amber-300 py-4">
                My Watchlist
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.length
                    ? movies.map(m => <MovieCard key={m._id} movie={m} />)
                    : "empty watchlist"
                }
            </div>
        </div>
    )
}

export default Watchlist;