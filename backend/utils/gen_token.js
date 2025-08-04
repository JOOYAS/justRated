const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error("Failed to generate token");
    }
};

module.exports = generateJWT;