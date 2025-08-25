// ReviewCard.jsx
const ReviewCard = ({ review, isMine }) => {
    return (
        <div
            className={`p-4 rounded-2xl shadow-md border ${isMine
                    ? "border-blue-500 dark:border-blue-400"
                    : "border-gray-200 dark:border-gray-700"
                }`}
        >
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {review.user}
                    </h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                </div>
                <div className="flex text-yellow-400 text-lg">
                    {"⭐".repeat(review.rating)}
                    {"⭐".repeat(5 - review.rating).replace(/⭐/g, "☆")}
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{review.text}</p>
        </div>
    );
}

export default ReviewCard