const mongoose = require("mongoose");
const teachersSchema = new mongoose.Schema({
    surname:{
        type:String
    },
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    zender : {
        type : String
    },
    subject : {
        type : String
    },
    age:{
        type:Number
    } ,
    birthdate : {
        type : String
    },
    mainstandard : {
        type : String
    },
    standard : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    schoolid: {
        type: String,
    },
    phonenumber : {
        type : Number,
        minlength :10,
        maxlength : 10
    }
})

const Teacher = mongoose.model("Teacher", teachersSchema);

module.exports = Teacher
