const mongoose = require("mongoose");
const menuItemsSchema = new mongoose.Schema({
    surname: {
        type: String
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    rollno : {
        type : String
    },
    zender : {
        type : String
    },
    age: {
        type: Number
    },
    standard: {
        type: String
    },
    birthdate: {
        type: String
    },
    email: {
        type: String
    },
    phonenumber: {
        type: Number,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String
    },
    complains: [
        {
            date : {
                type: String
            },
            complain : {
                type : String
            },
        }
    ]
})

const MenueItem = mongoose.model("MenueItems", menuItemsSchema);

module.exports = MenueItem
