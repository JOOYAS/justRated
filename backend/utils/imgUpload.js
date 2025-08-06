const streamifier = require('streamifier');
const cloudinaryConnection = require('../config/cloudinary_connection');

const cloudinaryUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinaryConnection.uploader.upload_stream(
            {
                folder: "just_rated",
                quality: "auto",
                fetch_format: "auto",
            },
            (err, result) => {
                if (err) return reject(err);
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id
                });            
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

module.exports = cloudinaryUpload;

// const cloudinaryConnection = require("../config/cloudinary_connection");

// const mgUpload = async (path) => {
//     try {
//         const uploadResult = await cloudinaryConnection.uploader.upload(path, {
//             resource_type: "image",
//         });
//         if (!uploadResult.secure_url) {
//             throw new Error("Image upload failed: No secure URL returned.");
//         }
//         return uploadResult.secure_url;
//     } catch (error) {
//         console.error("Image upload failed:", error.message || error);
//         throw new Error("Failed to upload image");
//     }
// };

//module.exports = imgUpload;