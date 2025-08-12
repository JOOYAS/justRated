const jwt = require('jsonwebtoken');

const authVerify = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token)
            throw new Error("not logged in");

        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenDecoded;

        next()
    } catch (error) {
        console.error("authVerify Error", error);
        res.status(401).json({ success: false, message: "Unauthorized Action" });
    }
}

module.exports = authVerify;