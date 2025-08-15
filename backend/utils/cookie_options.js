const cookieOptions = {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "production" ? true : false,
    sameSite: process.env.ENVIRONMENT === "production" ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000, //--------in 1 day cookie expires--------
};

module.exports = cookieOptions;