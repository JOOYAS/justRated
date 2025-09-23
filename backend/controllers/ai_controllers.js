const ai = require("../config/gen_ai_connection");
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
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    aiFindMovies
}