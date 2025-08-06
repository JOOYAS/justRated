const mongoose = require("mongoose");

//to check the _id in params is object id or not
//else have chance to get error
function validateObjectId(req, res, next) {
    try {
        const id = Object.values(req.params)[0];

        if (!mongoose.Types.ObjectId.isValid(id))
            throw new Error("Invalid id used");

        next(); 
    } catch (error) {
        console.log("validateObject ", error);
        res.status(400).json({
            success: false,
            message: "Invalid ID Used"
        });
    }

}

module.exports = validateObjectId;