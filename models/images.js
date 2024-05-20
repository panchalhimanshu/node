const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
    originalname:{
        type : String
    },
    data : {
        type : String
    }
})

const Image = mongoose.model("image", imageSchema);

module.exports = Image