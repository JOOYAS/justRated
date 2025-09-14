import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios_instance";

const mockStats = { movies: 42, users: 7, reviews: 18 }
const mockMovies = [
    { _id: "m1", name: "Inception", year: 2010 },
    { _id: "m2", name: "Interstellar", year: 2014 },
    { _id: "m3", name: "Dune", year: 2021 },
];

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

const StatCard = ({ title, value, loading }) => (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800 text-center">
        <p className="text-lg capitalize">{title}</p>
        <p className="text-2xl font-bold">{loading ? "Loading..." : value}</p>
    </div>
);

const ContentOverviewChart = ({ stats }) => (
    <div className="flex items-end gap-4 h-40">
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

const AdminDashboard = () => {
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
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Admin Dashboard</h2>

            {error && <p className="text-red-500">{error}</p>}

            {/* Stats cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                {Object.entries(stats).map(([key, value]) => (
                    <StatCard key={key} title={key} value={value} loading={loading} />
                ))}
            </div>

            {/* Recent + Notifications */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Recent Movies */}
                <div className="p-4 rounded-2xl shadow bg-white dark:bg-gray-800">
                    <h3 className="font-semibold mb-3">Recent Movies</h3>
                    <ul className="space-y-2">
                        {mockMovies.map(({ _id, name, year }) => (
                            <li key={_id} className="flex justify-between border-b pb-1 text-sm">
                                <span>{name}</span>
                                <span className="text-gray-500">{year}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recent Users */}
                <div className="p-4 rounded-2xl shadow bg-white dark:bg-gray-800">
                    <h3 className="font-semibold mb-3">Recent Users</h3>
                    <ul className="space-y-2">
                        {mockUsers.map(({ _id, name }) => (
                            <li key={_id} className="flex justify-between border-b pb-1 text-sm">
                                <span>{name}</span>
                                <span className="text-gray-500">joined</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Notifications */}
                <div className="p-4 rounded-2xl shadow bg-white dark:bg-gray-800">
                    <h3 className="font-semibold mb-3">Latest Activity</h3>
                    <ul className="space-y-2 text-sm">
                        {mockActivity.map(({ id, msg }) => (
                            <li key={id} className="border-b pb-1">
                                {msg}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Content Overview Chart */}
            <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800 flex h-auto">
                <h3 className="font-semibold mb-4">Content Overview</h3>
                <ContentOverviewChart stats={stats} />

            </div>
        </div>
    );
};

export default AdminDashboard;