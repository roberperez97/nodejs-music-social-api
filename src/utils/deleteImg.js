const cloudinary = require('cloudinary').v2;

const deleteImgCloudinary = (imgUrl) =>{
    const imgSplited = imgUrl.split('/');
    const nameSplited = imgSplited.at(-1).split('.')[0];
    const folder = imgSplited.at(-2);
    const public_id = `${folder}/${nameSplited}`;

    cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(result);
    });
}

module.exports = deleteImgCloudinary;