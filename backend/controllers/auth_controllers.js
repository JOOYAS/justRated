const User = require("../models/user_model");
const bcrypt = require("bcrypt")
const generateJWT = require("../utils/gen_token");
const cookieOptions = require("../utils/cookie_options");
const cloudinaryUpload = require("../utils/imgUpload");
const cleanObject = require("../utils/cleanObject");
const saltRounds = 10;

const signupController = async (req, res) => {
    try {
        console.log(0, "start");

        const { name, email, password } = req.body ?? {};
        if (!name || !email || !password)
            return res.status(400).json({
                success: false,
                message: "fill all required inputs"
            });
        console.log(1, name, email);

        const isExist = await User.findOne({ email: email })
        if (isExist)
            return res.status(400).json({
                sucess: false,
                message: "This email is already in use"
            });

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
        res.status(200).json({
            sucess: true,
            message: `welcome ${name}`
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Signup failed"
        });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body ?? {};
        if (!email || !password)
            return res.status(400).json({
                success: false,
                message: "incomplete credentials"
            });

        const account = await User.findOne({ email: email });

        const passMatch = bcrypt.compareSync(password, account?.password);
        if (!passMatch)
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });

        const token = generateJWT({
            _id: account._id,
            name: account.name,
            role: account.role
        });
        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            success: true,
            message: "successfully logged in"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Unauthorized"
        });
    }
}

const logoutController = async (req, res) => {
    try {
        res.clearCookie('token', cookieOptions);
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Unauthoized"
        });
    }
}

const fetchMyData = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId)
            return res.status(400).json({
                success: false,
                message: "couldn't find userId"
            });

        const userData = await User.findById(userId);

        const { password, __v, _id, role, createdAt, updatedAt, ...rest } = userData.toObject();
        res.status(200).json({
            success: true,
            userdata: rest
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "couldn't fetch your Data"
        });
    }
}

const updateMyData = async (req, res) => {
    try {
        const userId = req.user._id;

        const { email, name, password } = req.body;
        let profile;
        if (req.file) {
            profile = await cloudinaryUpload(req.file.buffer);
            console.log("url -> ", profile);
        }
        let updatedData = { name, email, password, profile };

        updatedData = cleanObject(updatedData);
        if (!Object.keys(updatedData).length)
            return res.status(400).json({
                success: false,
                message: "Nothing to update"
            });

        if (updatedData.password) {
            const hash = bcrypt.hashSync(updatedData.password, saltRounds);
            updatedData = {
                ...updatedData,
                password: hash
            }
        }

        const userData = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password -_id -role');

        if (Object.keys(updatedData).length == 1 && updatedData.password)
            return res.status(200).json({
                success: true,
                message: "password updated"
            })

        if (Object.keys(updatedData).length == 1 && updatedData.profile)
            return res.status(200).json({
                success: true,
                message: "profile picture changed"
            })

        res.status(200).json({
            success: true,
            userData: userData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "couldn't update details"
        })
    }
}

const deleteMyAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId)
            return res.status(400).json({
                success: false,
                message: "couldn't find userId"
            });

        const deleted = await User.findByIdAndDelete(userId);

        res.clearCookie('token', cookieOptions); // If you're using a JWT cookie
        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "couldn't delete your account"
        });
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