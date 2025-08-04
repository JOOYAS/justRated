const User = require("../models/user_model");
const bcrypt = require("bcrypt")
const generateJWT = require("../utils/gen_token");
const cookieOptions = require("../utils/cookie_options");
const saltRounds = 10;

const signupController = async (req, res) => {
    try {
        console.log(0, "start");

        const { name, email, password } = req.body ?? {};
        if (!name || !email || !password)
            throw new Error("fill all required inputs");
        console.log(1, name, email);

        const isExist = await User.findOne({ email: email })
        if (isExist)
            throw new Error("This email is already in use");

        const hash = bcrypt.hashSync(password, saltRounds);
        const UserData = {
            name: name,
            email: email,
            password: hash
        };
        const user = await new User(UserData).save();
        const token = generateJWT({
            _id: user._id,
            name: user.name,
            role: user.role
        });
        console.log(user);

        res.cookie('token', token, cookieOptions);
        res.status(200).json(`welcome ${name}`);
    }
    catch (error) {
        console.log(error);
        res.status(400).json("Signup failed")
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body ?? {};
        if (!email || !password)
            throw new Error("incomplete credentials");

        const account = await User.findOne({ email: email });
        if (!account)
            throw new Error("Invalid Credentials");

        const passMatch = bcrypt.compareSync(password, account?.password);
        if (!passMatch)
            throw new Error("Invalid credentials")

        const token = generateJWT({
            _id: account._id,
            name: account.name,
            role: account.role
        });
        res.cookie('token', token, cookieOptions);
        res.status(200).json("successfully logged in");
    } catch (error) {
        console.log(error);
        res.status(400).json("Unauthorized")
    }
}

const logoutController = async (req, res) => {
    try {
        res.clearCookie('token', cookieOptions);
        res.status(200).json("Logged out successfully");
    } catch (error) {
        console.log(error);
        res.status(400).json("Unauthoized")
    }
}

const fetchMyData = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId)
            throw new Error("Server Error");

        const userData = await User.findById(userId);
        if (!userData)
            throw new Error("try again later");

        const { password, __v, _id, role, createdAt, updatedAt, ...rest } = userData.toObject();
        res.status(200).json(rest);
    } catch (error) {
        console.log(error);
        res.status(400).json("Unauthoized")
    }
}

const updateMyData = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId)
            throw new Error("Server Error");

        let updatedData = req.body;
        if (!Object.keys(updatedData).length)
            throw new Error("Nothing to update");

        if (updatedData.password) {
            const hash = bcrypt.hashSync(updatedData.password, saltRounds);
            updatedData = {
                ...updatedData,
                password: hash
            }
        }

        const userData = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (Object.keys(updatedData).length == 1 && updatedData.password)
            return res.status(200).json("password updated")

        const { _id, __v, password, role, createdAt, updatedAt, ...rest } = userData.toObject();
        res.status(200).json(rest)
    } catch (error) {
        console.log(error);
        res.status(500).json("couldn't update details")
    }
}

const deleteMyAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId)
            throw new Error("Server Error");

        const deleted = await User.findByIdAndDelete(userId);
        if (!deleted)
            throw new Error("couldn't delete this account");

        res.clearCookie('token', cookieOptions); // If you're using a JWT cookie
        res.status(200).json({ msg: "Account deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json("server error")
    }
}

module.exports = {
    signupController,
    loginController,
    logoutController,
    fetchMyData,
    updateMyData,
    deleteMyAccount
}