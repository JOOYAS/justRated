const ReviewCard = ({ review, isMine = false }) => {
    // Safe access with fallbacks
    const userName = review.user?.name || 'Unknown User';
    const userProfile = review.user?.profile?.url;
    const userFirstName = userName.match(/^(\w+)/)?.[0] || userName;

    // console.log("review card ==========", review);
    return (
        <div
            className={`p-4 rounded-2xl shadow-md border ${isMine
                ? "border-blue-500 dark:border-blue-400"
                : "border-gray-200 dark:border-gray-700"
                }`}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {userProfile ? (
                        <img
                            className="size-12 overflow-hidden object-cover bg-amber-800 rounded-full"
                            src={userProfile}
                            alt={`${userName}'s profile`}
                        />
                    ) : (
                        <span className="size-12 overflow-hidden object-cover bg-amber-800 rounded-full flex justify-center items-center">
                            {userName.charAt(0).toUpperCase()}
                        </span>
                    )}
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {userFirstName}
                    </h4>
                </div>
                <div className="flex text-yellow-400 text-4xl items-center">
                    <span>{"★".repeat(review.rating)}</span>
                    <span className="text-gray-400">{"★".repeat(5 - review.rating)}</span>
                </div>
            </div>
            <p className="mt-4 mx-10 text-gray-700 dark:text-gray-300 text-sm">
                {review?.comment || review?.text || 'No comment'}
            </p>
        </div>
    );
}


export default ReviewCard