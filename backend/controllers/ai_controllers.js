const ai = require("../config/gen_ai_connection");
const Movie = require("../models/movie_model");
const Review = require("../models/review_model");
const aiGenerate = require("../utils/ai_generate");

const aiFindMovies = async (req, res) => {
    try {
        const { partialTitle } = req.body;

        const prompt = `
You are a movie data assistant. A user has searched for movies using a partial title: "${partialTitle}". 


Find up to 6 released movies whose titles starts with this input or includes this input in the start of word in the title.order should be latest-old . Only include movies that have already been released.

Return a clean JSON array of objects. Each object should follow this structure:

{
  "title": "Movie Name",
  "releaseDate": must be converted to JavaScript Date object
  "genres": ["Genre1", "Genre2"]
}

Do not include poster URLs or ratings. Do not wrap the output in markdown or code blocks. Do not include any explanation—just the raw JSON array.
`;
        const rawOutput = await aiGenerate(prompt);
        if (!rawOutput)
            throw new Error("No text content found in AI response");

        const rawText = rawOutput?.candidates[0]?.content?.parts[0]?.text;
        const cleaned = rawText.replace(/```json\n?/, '').replace(/```$/, '').trim();
        const movies = JSON.parse(cleaned);
        res.status(200).json({ movies });
    } catch (error) {
        console.error('ai find movies error :', error);
        res.status(500).json({
            success: false,
            message: "ai couldn't generate movie details"
        });
    }
}


const reviewSummary = async (req, res) => {
    try {
        // console.log('started creating ai summary');
        const today = new Date().toDateString(); // e.g., "Thu Oct 02 2025"

        const { movieId } = req.params;
        const { movieInDB, movieData } = req.body || [];

        if (!movieId)
            return res.status(400).json({
                success: false,
                message: "No movie id found"
            });

        let reviews;

        if (movieInDB)
            reviews = await Review.find({ movie: movieId })

        let prompt = "";
        let summary = "";

        if (!reviews?.length && movieInDB) {
            const movie = await Movie.findById(movieId);
            if (!movie) throw new Error("Movie not found in DB");

            const title = movie.title;
            const releaseDate = new Date(movie.releaseDate).toDateString();

            prompt = `Today is ${today}. The movie "${title}" was released on ${releaseDate}. If the movie has not yet been released, respond only with: "This movie has not been released yet. No reviews are currently available." Otherwise, generate a concise 2-line review summary suitable for a movie review site. Focus on audience and critic sentiment. Highlight one commonly praised aspect and one commonly criticized aspect. Do not describe the plot or characters unless directly relevant to the review. Avoid speculation and do not mention release status unless unreleased.`;
        }

        if (reviews?.length) {
            const comments = reviews.map(r => r.comment).filter(Boolean).join(" ");

            prompt = `Today is ${today}. Based on the following user reviews, generate a concise 2-line summary suitable for a movie review site. Focus on audience sentiment. If the reviews are too short, expand meaningfully. If too long, condense to 2 lines. Highlight one commonly praised aspect and one commonly criticized aspect. Do not describe the plot or characters unless directly relevant to the review. Avoid speculation and do not mention release status:\n\n${comments}`;
        }

        if (!movieInDB && movieData) {
            const { title, year } = movieData;

            prompt = `Today is ${today}. The movie "${title}" was released in ${year}. If the movie has not yet been released, respond only with: "This movie has not been released yet. No reviews are currently available." Otherwise, summarize online reviews into a concise 2-line review suitable for a movie review site. Focus on public sentiment. Highlight one commonly praised aspect and one commonly criticized aspect. Do not describe the plot or characters unless directly relevant to the review. Avoid speculation and do not mention release status unless unreleased.`;
        }

        const rawOutput = await aiGenerate(prompt);
        if (!rawOutput)
            throw new Error("No text content found in AI response");

        const rawText = rawOutput?.candidates[0]?.content?.parts[0]?.text;
        if (rawText.includes("has not yet been released") || rawText.includes("still in production") || rawText.includes("as an ai") || rawText.includes("As an AI")) {
            throw new Error("AI misunderstood the release timeline. This movie summary will not be available");
        }

        summary = rawText?.trim();

        return res.status(200).json({
            success: true,
            summary
        });

    } catch (error) {
        console.error('ai review summary error :', error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error/AI error"
        });
    }
}

module.exports = {
    aiFindMovies,
    reviewSummary,
}