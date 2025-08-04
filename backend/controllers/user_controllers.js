//signup and login controllers created in 'authControllers'

const User = require("../models/user_model")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        if (users.length === 0)
            throw new Error("Currently no user");

        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(400).json("couldn't fetch Users")
    }
}

const fetchUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            throw new Error("enter object Id");

        const user = await User.findById(id)
        if (!user) throw new Error("Couldn't fetch User data");

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.role;
        res.status(400).json(userObj)
    } catch (error) {
        console.log("fetchUser error -> ", error);
    }
}

const allMyReviews = async (req, res) => {
    //const users = await User.find({})
    //res.json(users)
}

const allMyFavourites = async (req, res) => {
    //const users = await User.find({})
    //res.json(users)
}

const allMyWatchlist = async (req, res) => {
    //const users = await User.find({})
    //res.json(users)
}



module.exports = {
    getAllUsers,
    fetchUserById,
    allMyReviews,
    allMyFavourites,
    allMyWatchlist,
}