const isAdmin = (req, res, next) => {
    try {
        const { role } = req.user ?? {};
        if (role === "admin")
            return next()
        throw new Error("not an Admin");
    } catch (error) {
        console.log("🔒Admin checking", error);
        res.status(403).json({
            success: false,
            message: "Sorry, you are not an Admin"
        });
    }
}

module.exports = isAdmin;