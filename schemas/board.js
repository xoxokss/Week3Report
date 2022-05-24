const mongoose = require("mongoose");

const boardsSchema = mongoose.Schema({
    postId : {
        type : Number,
        required : true,
        unique : true
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String
    },
    postingTitle : {
        type : String
    },
    content : {
        type : String
    },
    postingTime : {
        type : String
        // date : new Date().toString() 에러가 나네
    },
});

module.exports = mongoose.model("Board", boardsSchema);
