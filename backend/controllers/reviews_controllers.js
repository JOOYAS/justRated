const CriticReview = require("../models/critic_review_model");
const Movie = require("../models/movie_model");
const Review = require("../models/review_model");
const cleanObject = require("../utils/clean_object");

const allReviews = async (req, res) => {
    try {
        const userReviews = await Review.find()
            .populate('user')
            .populate('movie')
            .sort({ createdAt: -1 });
        const criticReviews = await CriticReview.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            userReviesCount: userReviews?.length,
            criticReviewsCount: criticReviews?.length,
            userReviews,
            criticReviews
        });
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get reviews"
        });
    }
}

const newReview = async (req, res) => {
    try {
        const userId = req.user._id;
        const { movie, rating, comment } = req.body ?? {};

        if (!movie || !userId || !rating)
            return res.status(400).json({
                success: false,
                message: "Missing fields"
            });

        let reviewData = { movie, rating, user: userId, comment };
        reviewData = cleanObject(reviewData)
        const existing = await Review.findOne({ movie, user: userId });

        if (existing) {
            const updatedReview = await Review.findByIdAndUpdate(existing._id, reviewData, { new: true })
                .populate('user')
                .populate('movie');
            return res.status(200).json({
                success: true,
                message: "Review updated",
                review: updatedReview
            });
        }

        const review = await Review.create(reviewData);
        await review.populate('user');
        await review.populate('movie');
        res.status(201).json({
            success: true,
            message: "Review added",
            review
        });
    } catch (error) {
        console.error("Error in newReview:", error);
        res.status(500).json({
            success: false,
            message: "Review save failed"
        });
    }
};

const newCriticReview = async (req, res) => {
    try {
        const { movie, critic, rating, comment } = req.body ?? {};
        // console.log("movie ->", movie);

        if (!movie || !critic || !rating)
            return res.status(400).json({
                success: false,
                message: "Missing fields"
            });

        let reviewData = { movie, critic, rating, comment };
        reviewData = cleanObject(reviewData)

        const existing = await CriticReview.findOne({ movie, critic });

        if (existing) {
            const updatedCriticReview = await CriticReview.findByIdAndUpdate(existing._id, reviewData, { new: true })
                .populate('movie');
            return res.status(200).json({
                success: true,
                message: "Critic review updated",
                review: updatedCriticReview
            });
        }

        const review = await new CriticReview(reviewData).populate('movie')
            .populate('movie')
            .save();
        res.status(201).json({
            success: true,
            message: "Critic review added",
            review
        });
    } catch (error) {
        console.error("Error in newCriticReview:", error);
        res.status(500).json({
            success: false,
            message: "Critic review save failed"
        });
    }
};

const editReview = async (req, res) => {
    //const users = await User.find({})
    //res.json(users)
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id).populate('movie');
        if (!review)
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });

        res.status(200).json({
            success: true,
            message: `your Review for ${review?.movie?.title} got deleted`
        });
    } catch (error) {
        console.error("Delete review error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete review"
        });
    }
};

const deleteCriticReview = async (req, res) => {
    try {
        const { id } = req.params;
        const criticReview = await CriticReview.findByIdAndDelete(id).populate('movie');
        if (!criticReview)
            return res.status(404).json({
                success: false,
                message: "Critic review not found"
            });

        res.status(200).json({
            success: true,
            message: "Critic review deleted"
        });
    } catch (error) {
        console.error("Delete critic review error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete critic review"
        });
    }
};


module.exports = {
    allReviews,
    newReview,
    newCriticReview,
    editReview,
    deleteReview,
    deleteCriticReview
}