const Movie = require("../models/movie_model");
const Watchlist = require("../models/watchlist_model");
const cleanObject = require("../utils/clean_object");

const allWatchlist = async (req, res) => {
    try {
        const list = await Watchlist.find({})
            .populate('movie');

        res.json({
            success: true,
            watchlist: list
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Admin fetch failed"
        });
    }
}

const addtoWatchlist = async (req, res) => {
    try {
        const user = req.user._id;
        const movie = req.params.movieId;
        if (!user || !movie)
            return res.status(400).json({
                success: false,
                message: "No details"
            });

        const MovieExist = await Movie.findById(movie)
        if (!MovieExist) return res.status(400).json({
            success: false,
            message: 'Movie not exist'
        });

        const exists = await Watchlist.findOne({ user, movie });
        if (exists)
            return res.status(200).json({
                success: false,
                message: 'Already in watchlist'
            });

        await Watchlist.create({ user, movie });
        res.json({
            success: true,
            message: 'Added to watchlist'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const toggleWatched = async (req, res) => {
    try {
        const user = req.user._id;
        const movie = req.params.movieId;
        if (!user || !movie)
            return res.status(400).json({
                sucess: false,
                message: "No details"
            })

        const item = await Watchlist.findOne({ user, movie });
        if (!item)
            return res.status(404).json({
                success: false,
                message: "Movie not in watchlist"
            });

        item.watched = !item.watched;
        await item.save();

        res.json({
            success: true,
            message: `Marked as ${item.watched ? 'watched' : 'unwatched'}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Toggle failed"
        });
    }
};

const deletefromWatchlist = async (req, res) => {
    try {
        const user = req.user._id;
        const movie = req.params.movieId;
        if (!user || !movie)
            return res.status(400).json({
                sucess: false,
                message: "No details"
            });

        const deleted = await Watchlist.findOneAndDelete({ user, movie });
        if (!deleted)
            return res.status(404).json({
                success: false,
                message: "Not found movie in watchlist"
            });

        res.json({
            success: true,
            message: "Removed from watchlist"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "couldn't Delete from watchlist"
        });
    }
}


module.exports = {
    allWatchlist,
    addtoWatchlist,
    toggleWatched,
    deletefromWatchlist,
}