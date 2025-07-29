const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Users',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif']
    }
})

const upload = multer({storage});

module.exports = upload;