const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "lax",
    maxAge: 24 * 60 * 60 * 1000, //--------in 1 day cookie expires--------
};

module.exports = cookieOptions;