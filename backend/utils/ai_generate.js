const ai = require("../config/gen_ai_connection");

const aiGenerate = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // or "gemini-1.5-pro"
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        return response
    } catch (error) {
        console.error('Gemini error:', error);
        throw new Error('AI generation failed');
    }
}

module.exports = aiGenerate;