const MovieDetail = require("../models/movie_detail_model");
const Movie = require("../models/movie_model");
const cleanObject = require("../utils/cleanObject");
const cloudinaryUpload = require("../utils/imgUpload");
const withRetry = require("../utils/retry_upload");

const newMovie = async (req, res) => {
    try {
        const { title, year, genres, rating, featuredNow, currentlyOnTheatres } = req.body;
        if (!title || !year)
            throw new Error("incomplete details to add movie");

        let posterUrl;
        if (req.file) {
            posterUrl = await cloudinaryUpload(req.file.buffer);
            console.log("url -> ", posterUrl);
        }

        const movieData = { title, year, genres, rating, featuredNow, currentlyOnTheatres, posterUrl };
        Object.keys(movieData).forEach(key => {
            if (movieData[key] === undefined) delete movieData[key]; // cleaning undefined data entries
        })

        const movie = await new Movie(movieData).save();
        if (!movie)
            throw new Error("retry to add movie");

        res.status(200).json(movie)
    } catch (error) {
        console.log("adding new movie error", error);
        res.status(400).json("couldn't add this movie")
    }
}

const allMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        if (!movies)
            throw new Error("No movies Added");

        res.status(200).json(movies);
    } catch (error) {
        console.log(error);
        res.status(400).json("couldn't fetch movies")
    }
}

const fetchmovieById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            throw new Error("No id found");

        const movie = await Movie.findById(id);
        if (!movie)
            throw new Error("no movie matched id");

        res.status(200).json(movie);
    } catch (error) {
        console.log(error);
        res.status(400).json("couldn't find this movie")
    }
}

const allReviewsofMovie = async (req, res) => {
    //const users = await User.find({})
    //res.json(users)
}

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            throw new Error("No id found");
        let posterUrl;
        let images;
        if (req.files) {
            const posterImg = req.files['posterImg'] ? req.files['posterImg'][0].buffer : null;
            // images = req.files['images'] ? req.files['images'].map(file => file.buffer) : [];
            posterUrl = posterImg ? await withRetry(() => cloudinaryUpload(posterImg)) : null;
            console.log("posterUrl -> ", posterUrl, "images ->", images)

        }
        const movieData = await Movie.findById(id);
        if (!movieData)
            throw new Error("This movie not available to edit");

        const { title, year, genres, rating, featuredNow, currentlyOnTheatres, description, trailerUrl, releaseDate, tags, globalCollection, director, cast, writers, duration, availbleOn, country, language } = req.body ?? {};

        const newMovieData = { title, year, genres, rating, featuredNow, currentlyOnTheatres, posterUrl }
        const newMovieDetails = { description, trailerUrl, releaseDate, tags, globalCollection, director, cast, writers, duration, availbleOn, country, language, images };
        const cleanedMovie = cleanObject(newMovieData);
        const cleanedMovieDetails = cleanObject(newMovieDetails)

        Object.assign(movieData, cleanedMovie); ///data updated into currentMovieData

        let movieDetail = await MovieDetail.findOne({ movie: id });
        if (!movieDetail) {
            movieDetail = await MovieDetail.create({ movie: id, ...cleanedMovieDetails });
        } else {
            Object.assign(movieDetail, cleanedMovieDetails);
            await movieDetail.save();
        }

        const populatedDetail = await MovieDetail.findById(movieDetail._id).populate("movie");
        res.status(200).json(populatedDetail);

    } catch (error) {
        console.log(error);
        res.status(500).json("sorry, movie update failed");
    }
}
const deleteMovie = async (req, res) => {
    //const users = await User.find({})
    //res.json(users)
}

module.exports = {
    newMovie,
    allMovies,
    fetchmovieById,
    allReviewsofMovie,
    updateMovie,
    deleteMovie
}