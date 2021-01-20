const mongoose = require('mongoose');



const ImgSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String
    }
});


module.exports = new mongoose.model('image', ImgSchema);