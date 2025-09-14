//-----------------signup and login controllers created in 'authControllers', so thats not here---------------

const Review = require("../models/review_model");
const User = require("../models/user_model");
const Watchlist = require("../models/watchlist_model");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        if (users.length === 0)
            return res.status(400).json({
                success: false,
                message: "Currently no user"
            });

        res.status(200).json({
            success: true,
            message: users
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "couldn't fetch Users"
        })
    }
}

const fetchUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password')
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Couldn't fetch User data"
            });

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.log("fetchUser error -> ", error);
        res.status(400).json({
            success: false,
            message: "couldn't get User"
        });
    }
}

const allMyReviews = async (req, res) => {
    try {
        const user = req.user._id;
        const list = await Review.find({ user }).populate('movie');
        res.status(200).json({
            success: true,
            reviews: list
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "couldn't fetch your Reviews"
        });
    }
}

const allMyFavourites = async (req, res) => {
    //const users = await User.find({})
    //res.json(users)
}

const allMyWatchlist = async (req, res) => {
    try {
        const user = req.user._id;
        const list = await Watchlist.find({ user }).populate('movie');
        console.log(list);

        res.json({
            success: true,
            watchlist: list
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Couldn't fetch your Watchlist"
        });
    }

    //
    try {
        const list = await Watchlist.find({ user: req.user._id })
            .populate({
                path: 'movie',
                select: '_id title poster genres' // Specify fields you want
            });

        console.log('Populated Watchlist:', JSON.stringify(list, null, 2));

        res.json({
            success: true,
            watchlist: list
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllUsers,
    fetchUserById,
    allMyReviews,
    allMyFavourites,
    allMyWatchlist,
}