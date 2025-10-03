const MovieSuggestion = require("../models/movie_suggestion");

const recordSuggestedMovie = async (req, res) => {
    const { title, year, imdbID } = req.body;

    try {
        let suggestion = await MovieSuggestion.findOne({ imdbID });

        if (suggestion) {
            suggestion.requestCount += 1;
            await suggestion.save();
        } else {
            suggestion = new MovieSuggestion({ title, year, imdbID });
            await suggestion.save();
        }

        res.status(200).json({ success: true, suggestion });
    } catch (err) {
        console.error('Error suggesting movie:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const fetchSuggestionData = async (req, res) => {
    try {
        const suggestions = await MovieSuggestion.find({})
            .sort({ requestCount: -1 }); // optional: sort by popularity

        res.status(200).json({ success: true, suggestions });
    } catch (err) {
        console.error('Error fetching suggestions:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {
    recordSuggestedMovie,
    fetchSuggestionData
}