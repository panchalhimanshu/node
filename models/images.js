const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
    standard : {type : String},
    subject : {type : String},
    date : {type : String},
    originalname:{
        type : String
    },
    data : {
        type : String
    }
})

const Image = mongoose.model("image", imageSchema);

module.exports = Image
