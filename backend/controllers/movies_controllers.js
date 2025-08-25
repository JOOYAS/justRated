const CriticReview = require("../models/critic_review_model");
const MovieDetail = require("../models/movie_detail_model");
const Movie = require("../models/movie_model");
const Review = require("../models/review_model");
const cleanObject = require("../utils/cleanObject");
const cloudinaryUpload = require("../utils/imgUpload");

const newMovie = async (req, res) => {
    try {
        const { title, releaseDate, genres, rating, featuredNow, currentlyOnTheatres, description } = req.body;
        if (!title || !releaseDate || !description)
            return res.status(400).json({
                success: false,
                message: "incomplete details to add movie"
            });

        let poster;
        if (req.file) {
            poster = await cloudinaryUpload(req.file.buffer);
            if (poster && poster.buffer) delete poster.buffer; // remove raw file data
            if (poster && !poster.url) poster = null; // ensure valid structure
        }

        let movieData = { title, releaseDate, genres, rating, featuredNow, currentlyOnTheatres, poster };
        movieData = cleanObject(movieData);

        const movie = await new Movie(movieData).save();
        if (!movie)
            return res.status(400).json({
                success: false,
                message: "retry to add movie"
            });
        const movieDetail = await MovieDetail.create({ movie: movie._id, description });

        const movieDetailed = await MovieDetail.findById(movieDetail._id).populate('movie').select("-_id -__v -createdAt -updatedAt");
        const movieDetailObj = movieDetailed.toObject();

        const merged = cleanObject({
            ...movieDetailObj,
            ...movieDetailObj.movie
        });
        delete merged.movie;

        res.status(200).json({
            success: true,
            message: `movie ${movie?.title?.toUpperCase()} added`,
            movie: merged
        });
    } catch (error) {
        console.log("adding new movie error", error);
        res.status(400).json({
            success: false,
            message: "couldn't add this movie"
        });
    }
}

const allMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        if (!movies)
            return res.status(400).json({
                success: false,
                message: "No movies Found"
            });

        res.status(200).json({
            success: true,
            movies
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "couldn't fetch movies"
        });
    }
}

const fetchmovieById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                success: false,
                message: "No Movie id found"
            });

        const movieDetailed = await MovieDetail.findOne({ movie: id })
            .populate('movie')
            .populate('director', 'name photo')
            .populate('cast', 'name photo')
            .populate('writers', 'name photo')
            .select("-_id -__v -createdAt -updatedAt");
        if (!movieDetailed)
            return res.status(400).json({
                success: false,
                message: "no movie matched id"
            });
        if (!movieDetailed.movie?.title)
            return res.status(400).json({
                success: false,
                message: "movie details are partial"
            });

        const movieDetailObj = movieDetailed.toObject();
        const merged = cleanObject({
            ...movieDetailObj,
            ...movieDetailObj.movie
        });
        delete merged.movie;

        res.status(200).json({
            success: true,
            movie: merged
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "couldn't find this movie"
        })
    }
}

const allReviewsofMovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                success: false,
                message: "No id found"
            });

        const uReviews = await Review.find({ movie: id })
            .populate('user', 'name')
            .sort('-createdAt'); // newest first
        const cReviews = await CriticReview.find({ movie: id })
            .sort('-createdAt');

        res.json({
            success: true,
            count: uReviews.length,
            reviews: uReviews,
            critics: cReviews
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "couldn't fetch reviews for this movie"
        });
    }
}

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                success: false,
                message: "No id found"
            });
        let poster;
        let images = [];
        if (req.files) {
            const posterImg = req.files['posterImg']?.[0]?.buffer;
            const imageBuffers = req.files['images']?.map(file => file.buffer) || [];

            poster = posterImg ? await cloudinaryUpload(posterImg) : null;

            images = await Promise.all(
                imageBuffers.map(buf => cloudinaryUpload(buf))
            );
        }

        const movieData = await Movie.findById(id);
        if (!movieData)
            return res.status(400).json({
                success: false,
                message: "This movie not available to edit"
            });

        const { title, genres, releaseDate, rating, featuredNow, currentlyOnTheatres, description, trailerUrl, tags, globalCollection, director, cast, writers, duration, availbleOn, country, language } = req.body ?? {};

        //---------------have two models as seperate, thats why these stored as "Movie" & "MovieDetail"-----------
        const newMovieData = { title, genres, releaseDate, rating, featuredNow, currentlyOnTheatres, poster }
        const newMovieDetails = { description, trailerUrl, tags, globalCollection, director, cast, writers, duration, availbleOn, country, language, images };
        const cleanedMovie = cleanObject(newMovieData);
        const cleanedMovieDetails = cleanObject(newMovieDetails)

        Object.assign(movieData, cleanedMovie); //-------------data updated into currentMovieData----------------
        await movieData.save();

        const movieDetail = await MovieDetail.findOneAndUpdate({ movie: id }, cleanedMovieDetails, { new: true }).populate('movie').select("-_id -__v -createdAt -updatedAt");

        const movieDetailObj = movieDetail.toObject();
        const merged = cleanObject({
            ...movieDetailObj,
            ...movieDetailObj.movie
        });
        delete merged.movie;

        res.status(200).json({
            success: true,
            message: `movie ${movieDetail.movie.title.toUpperCase()} got updated`,
            movie: merged
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "sorry, movie update failed"
        });
    }
}

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                success: false,
                message: "No id found"
            });

        const movie = await Movie.findByIdAndDelete(id)
        await Movie.findOneAndDelete({ _id: id })

        res.status(200).json({
            success: true,
            message: `movie ${movie.title.toUpperCase()} got Deleted`
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "sorry, couldn't delete movie"
        });
    }
}

module.exports = {
    newMovie,
    allMovies,
    fetchmovieById,
    allReviewsofMovie,
    updateMovie,
    deleteMovie
}