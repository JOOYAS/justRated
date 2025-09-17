import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios_instance";
import LoaderOverlay from "../../components/loader_overlay";
import { Link, useNavigate } from "react-router-dom";
import LazyImage from "../../components/lazy_image";

const mockStats = { movies: 42, users: 7, reviews: 18 }

const mockMovies = [
    {
        poster: {
            url: "https://res.cloudinary.com/db6ovssrt/image/upload/v1757760768/just_rated/dokkosdal2vxz32wd0n3.jpg",
            public_id: "just_rated/dokkosdal2vxz32wd0n3"
        },
        _id: "68c54d01e74aea4b83551c5f",
        title: "The Man From Earth",
        releaseDate: "2007-06-10T00:00:00.000Z",
        genres: ["Science fiction, Drama"],
        rating: 7.7, featuredNow: false,
        currentlyOnTheatres: false,
        createdAt: "2025 -09 - 13T10: 52: 49.834Z", updatedAt: "2025-09-13T10:52:49.834Z", __v: 0
    }, { poster: { url: "https://res.cloudinary.com/db6ovssrt/image/upload/v1757781833/just_rated/sjtvem5w0iyigeoc91nl.jpg", public_id: "just_rated/sjtvem5w0iyigeoc91nl" }, _id: "68c59f4be7bf7392483b9f80", title: "About Time", releaseDate: "2013-09-04T00:00:00.000Z", genres: ["Drama, Fantasy, Romance, Science fiction"], rating: 7.9, featuredNow: false, currentlyOnTheatres: false, createdAt: "2025-09-13T16:43:55.459Z", updatedAt: "2025-09-13T16:43:55.459Z", __v: 0 }, {
        poster: { url: "https://res.cloudinary.com/db6ovssrt/image/upload/v1757848393/just_rated/yubvn0a42nwioxztxg6x.jpg", public_id: "just_rated/yubvn0a42nwioxztxg6x" }, _id: "68c6a34be7bf7392483ba212", title: "The Secret Life of Walter Mitty", releaseDate: "2013-12-25T00:00:00.000Z", genres: ["adventure, drama, comedy, fantasy"], rating: 7.5, featuredNow: false, "currentlyOnTheatres": false,
        createdAt: "2025-09-14T11:13:15.401Z", updatedAt: "2025-09-14T11:13:15.401Z", __v: 0
    }, {
        poster: { url: "https://res.cloudinary.com/db6ovssrt/image/upload/v1757848921/just_rated/gg6ms0s4zxxilkvwrhto.jpg", public_id: "just_rated/gg6ms0s4zxxilkvwrhto" }, _id: "68c6a55ae7bf7392483ba21a", title: "Life of Pi", releaseDate: "2012-11-21T00:00:00.000Z", genres: ["adventure, drama, survival, fantasy"], rating: 8.5, featuredNow: false, "currentlyOnTheatres": false,
        createdAt: "2025-09-14T11:22:02.788Z", updatedAt: "2025-09-14T11:22:02.788Z", __v: 0
    }, {
        poster: { url: "https://res.cloudinary.com/db6ovssrt/image/upload/v1757849396/just_rated/tnccajspxl57wv0wwrse.jpg", public_id: "just_rated/tnccajspxl57wv0wwrse" }, _id: "68c6a735e7bf7392483ba222", title: "Eega", releaseDate: "2012-07-06T00:00:00.000Z", genres: ["comedy, drama, fantasy"], rating: 9, featuredNow: false, "currentlyOnTheatres": false,
        createdAt: "2025-09-14T11:29:57.750Z", updatedAt: "2025-09-14T11:29:57.750Z", __v: 0
    }, {
        poster: { url: "https://res.cloudinary.com/db6ovssrt/image/upload/v1757851052/just_rated/rh9yfswe3wjzwyp1zkot.jpg", public_id: "just_rated/rh9yfswe3wjzwyp1zkot" }, _id: "68c6adaee7bf7392483ba22a", title: "Tumbbad", releaseDate: "2018-10-12T00:00:00.000Z", genres: ["horror, drama, mystery, fantasy, thriller"], rating: 9, featuredNow: false, "currentlyOnTheatres": false,
        createdAt: "2025-09-14T11:57:34.263Z", updatedAt: "2025-09-14T11:57:34.263Z", __v: 0
    }, {
        poster: { url: "https://res.cloudinary.com/db6ovssrt/image/upload/v1757862154/just_rated/qmsfy4h3h5ntznc6l4xl.jpg", public_id: "just_rated/qmsfy4h3h5ntznc6l4xl" }, _id: "68c6d90ae7bf7392483ba232", title: "Raavanan", releaseDate: "2010-06-18T00:00:00.000Z", genres: ["drama, action, adventure"], rating: 6.2, featuredNow: false, "currentlyOnTheatres": false,
        createdAt: "2025-09-14T15:02:34.809Z", updatedAt: "2025-09-14T15:02:34.809Z", __v: 0
    }]
const topCommentedMovie = mockMovies[0]
const topRatedMovie = mockMovies[1]
const topVisitedMovie = mockMovies[2]
const topWatchedMovie = mockMovies[3]
const mockUsers = [
    { _id: "u1", name: "Alice" },
    { _id: "u2", name: "Bob" },
    { _id: "u3", name: "Charlie" },
];

const mockActivity = [
    { id: 1, msg: "User Alice added Inception to watchlist" },
    { id: 2, msg: "User Bob wrote a review for Dune" },
    { id: 3, msg: "Admin updated Interstellar details" },
];

const AdminDashboard = () => {
    const navigate = useNavigate()
    const [stats, setStats] = useState({ movies: 0, users: 0, reviews: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [moviesRes, usersRes, reviewsRes] = await Promise.all([
                    axiosInstance.get("/admin/movies/count"),
                    axiosInstance.get("/admin/users/count"),
                    axiosInstance.get("/admin/reviews/count"),
                ]);
                setStats({
                    movies: moviesRes.data.count,
                    users: usersRes.data.count,
                    reviews: reviewsRes.data.count,
                });

            } catch (err) {
                setStats(mockStats)
                setError("Failed to load stats");
                setLoading(false)
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const ContentOverviewChart = ({ stats }) => (
        <div className="flex items-end gap-4 h-96">
            {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="flex-1 text-center">
                    <div
                        className={`w-full rounded ${key === 'movies' ? 'bg-amber-500' : key === 'users' ? 'bg-blue-500' : 'bg-green-500'}`}
                        style={{ height: `${value * (key === 'users' ? 10 : key === 'movies' ? 5 : 4) || 10}px` }}
                    ></div>
                    <p className="mt-1 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                </div>
            ))}
        </div>
    );

    const StatCard = ({ title, value, loading }) => (
        <div className="p-6 rounded-2xl shadow border-4 border-transparent bg-gray-100 dark:bg-gray-800 text-center cursor-pointer hover:border-blue-600" onClick={() => navigate(`/su/${title.toLowerCase()}`)}>
            <p className="text-lg capitalize">{title}</p>
            <p className="text-2xl font-bold">{loading ? "Loading..." : value}</p>
        </div>
    );

    const HighlightCard = ({ title, movie, badge }) => (
        <div className="p-4 rounded-2xl border-4 border-transparent shadow bg-gray-100 dark:bg-gray-800 flex gap-4 hover:border-blue-700 cursor-pointer" onClick={() => navigate(`/su/movies/${movie._id}`)}>
            <LazyImage alt={movie.title} publicId={movie.poster.public_id} className="w-20 h-28 object-cover rounded-lg" />
            {/* <img
                src={ || "https://via.placeholder.com/80x120"}
                alt={movie.title}
                className="w-20 h-28 object-cover rounded-lg"
            /> */}
            <div>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded">
                    {badge}
                </span>
                <p className="mt-12 text-sm text-gray-600 dark:text-gray-300">{movie.title}</p>

            </div>
        </div>
    );

    return (
        <>
            {loading ? <LoaderOverlay overlay />
                : <div className="p-4 mx-auto md:p-8 space-y-4  max-w-3xl">
                    {/* Header */}
                    <h2 className="text-3xl font-bold text-amber-500">Admin Dashboard</h2>
            {error && <p className="text-red-500">{error}</p>}

                    {/* Stats Cards */}
                    <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(stats).map(([key, value]) => (
                    <StatCard key={key} title={key} value={value} loading={loading} />
                ))}
            </div>

                    {/* Highlights Section */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Top Rated Movie */}
                        <HighlightCard
                            title="Top Rated Movie"
                            movie={topRatedMovie}
                            badge="⭐ Highest Rating"
                        />

                        {/* Top Visited Movie */}
                        <HighlightCard
                            title="Top Visited Movie"
                            movie={topVisitedMovie}
                            badge="👀 Most Views"
                        />

                        {/* Top Commented Movie */}
                        <HighlightCard
                            title="Top Commented Movie"
                            movie={topCommentedMovie}
                            badge="💬 Most Comments"
                        />

                        {/* Top Watched Movie */}
                        <HighlightCard
                            title="Top Watched Movie"
                            movie={topWatchedMovie}
                            badge="🎬 Most Watched"
                        />
                    </div>

                    {/* Recent Activity Section */}
                    <div className="grid md:grid-cols-3 gap-6">
                {/* Recent Movies */}
                        <Card title="Recent Movies">
                            <ul className="space-y-2 text-sm">
                                {mockMovies.map(({ _id, title, releaseDate }) => (
                                    <li key={_id} className="group flex justify-between border-b pb-1">
                                        <Link to={`/su/movies/${_id}`} className="group-hover:text-blue-700 group-hover:underline">{title}</Link>
                                        <span className="text-gray-500">{new Date(releaseDate).getFullYear()}</span>
                            </li>
                        ))}
                    </ul>
                        </Card>

                {/* Recent Users */}
                        <Card title="Recent Users">
                            <ul className="space-y-2 text-sm">
                        {mockUsers.map(({ _id, name }) => (
                            <li key={_id} className="flex justify-between border-b pb-1">
                                <span>{name}</span>
                                <span className="text-gray-500">joined</span>
                            </li>
                        ))}
                    </ul>
                        </Card>

                {/* Notifications */}
                        <Card title="Latest Activity">
                    <ul className="space-y-2 text-sm">
                        {mockActivity.map(({ id, msg }) => (
                            <li key={id} className="border-b pb-1">{msg}</li>
                        ))}
                    </ul>
                        </Card>
            </div>

                    {/* Content Overview Chart */}
                    <h3 className="font-semibold mb-4">Content Overview</h3>
                    <div className="p-6 py-2 rounded-2xl shadow bg-white dark:bg-gray-800">
                <ContentOverviewChart stats={stats} />
                    </div>
                </div>
            }</>
    );
};

const ContentOverviewChart = ({ stats }) => (
    <div className="flex items-end gap-4 h-96">
        {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="flex-1 text-center">
                <div
                    className={`w-full rounded ${key === 'movies' ? 'bg-amber-500' : key === 'users' ? 'bg-blue-500' : 'bg-green-500'}`}
                    style={{ height: `${value * (key === 'users' ? 10 : key === 'movies' ? 5 : 4) || 10}px` }}
                ></div>
                <p className="mt-1 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            </div>
        ))}
    </div>
);



const Card = ({ title, children }) => (
    <div className="p-4 rounded-2xl border-4 border-transparent shadow bg-white dark:bg-gray-800 hover:border-blue-700">
        <h3 className="font-semibold mb-3">{title}</h3>
        {children}
    </div>
);


export default AdminDashboard;