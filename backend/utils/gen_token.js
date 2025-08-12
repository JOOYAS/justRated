const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET);
    } catch (error) {
        console.log("Failed to generate token", error);
    }
};

module.exports = generateJWT;