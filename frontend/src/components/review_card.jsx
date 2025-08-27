// ReviewCard.jsx
const ReviewCard = ({ review, isMine = false }) => {
    return (
        <div
            className={`p-4 rounded-2xl shadow-md border ${isMine
                    ? "border-blue-500 dark:border-blue-400"
                    : "border-gray-200 dark:border-gray-700"
                }`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {review.user}
                    </h4>
                </div>
                <div className="flex text-yellow-400 text-4xl items-center">
                    <span>{"★".repeat(review.rating)}</span>
                    <span className="text-gray-400">{"★".repeat(5 - review.rating)}</span>
                </div>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{review?.text}</p>
        </div>
    );
}

export default ReviewCard