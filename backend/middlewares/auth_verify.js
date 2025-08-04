var jwt = require('jsonwebtoken');

const authVerify = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token)
            throw new Error("you are not logged in");

        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenDecoded;

        next()
    } catch (error) {
        console.error("auth_verfy_middleware ::", error);
        res.status(401).json("Unauthorized");
    }
}

module.exports = authVerify;