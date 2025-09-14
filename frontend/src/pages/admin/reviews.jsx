const mockReviews = [
    { _id: "r1", user: "Alice", movie: "Mock A", text: "Good!" },
    { _id: "r2", user: "Bob", movie: "Mock B", text: "Meh" },
]

const AdminReviews = () => {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Manage Reviews</h2>
            {mockReviews.map(r => (
                <div key={r._id} className="p-4 mb-2 rounded-xl shadow bg-white dark:bg-gray-800">
                    <p><b>{r.user}</b> on <i>{r.movie}</i></p>
                    <p>{r.text}</p>
                    <button className="mt-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
            ))}
        </div>
    )
}

export default AdminReviews