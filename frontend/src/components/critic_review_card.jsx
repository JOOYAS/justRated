const CriticReviewCard = ({ critic }) => {
    const { critic: name, rating, review } = critic;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-600 p-2 transition-transform transform hover:scale-105 flex flex-col items-center">
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-extrabold font-sans text-indigo-700 dark:text-indigo-300">
                    {name.toUpperCase()}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg text-indigo-600 dark:text-indigo-400 align-baseline">{rating}/10</span>
                </div>
            </div>
            <p className=" text-indigo-600 dark:text-indigo-200 leading-relaxed text-base italic text-center">
                “{review}”
            </p>
        </div>

    );
}

export default CriticReviewCard