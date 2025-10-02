const ai = require("../config/gen_ai_connection");

const aiGenerate = async (prompt) => {
    try {
        if (!prompt.includes("undefined")) {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [{ role: "user", parts: [{ text: prompt }] }],
            });

            return response;
        } else {
            throw new Error("Prompt contains undefined values. Cannot send to AI.");
        }
    } catch (error) {
        console.error('Gemini error:', error);
        throw new Error('AI generation failed');
    }
}

module.exports = aiGenerate;