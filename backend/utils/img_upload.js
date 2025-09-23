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
            (error, result) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
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