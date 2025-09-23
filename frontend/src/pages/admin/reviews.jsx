import { useEffect, useState } from "react"
import axiosInstance from "../../../utils/axios_instance"
import LazyImage from "../../components/lazy_image"

const mockReviews = [
    { _id: "r1", user: "Alice", movie: "Mock A", text: "Good!" },
    { _id: "r2", user: "Bob", movie: "Mock B", text: "Meh" },
]

const AdminReviews = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        axiosInstance.get('/reviews')
            .then(res => {
                console.log(res);

                setReviews(res.data?.userReviews)
            })
            .catch(err => {
                console.error(err)
                setReviews(mockReviews)
            })
    }, [])
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Manage Reviews</h2>
            {reviews.map(r => (
                <div key={r._id} className="flex gap-4 p-4 mb-4 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-900">

                    {/* Movie Poster */}
                    <LazyImage publicId={r.movie.poster.public_id} className="w-32 h-48 object-cover rounded-lg shadow-md" alt={`${r.movie.title} poster`} />
                    {/* <img
                        src={r.movie.poster.url}
                        alt=
                        className="w-32 h-48 object-cover rounded-lg shadow-md"
                    /> */}

                    {/* Review Content */}
                    <div className="flex-1">
                        {/* Movie Title */}
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                            {r.movie.title}
                        </h2>

                        {/* User Info */}
                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src={!r.user?.profile?.url ? "https://ui-avatars.com/api/?name=Admin" : r.user?.profile?.url}
                                alt={r.user.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {r.user.name}
                            </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-5 h-5 ${i < r.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                                </svg>
                            ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 dark:text-gray-200 mb-3">
                            {r.comment}
                        </p>

                        {/* Delete Button */}
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm">
                            Delete
                        </button>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default AdminReviews