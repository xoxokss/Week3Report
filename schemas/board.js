const mongoose = require("mongoose");


const boardSchema = new mongoose.Schema({
    postNum : {
        type : Number,
        // required : true,
        // unique : true
    },
    userName : {
        type : String,
        // required : true,
        // unique : true
    },
    password : {
        type : String
    },
    title : {
        type : String
    },
    postDate: {
        type : String //이거 굳이 Date로 안받아도 될거같은데? 날짜순으로 DB에 넣어야합니다.
        // new Date().toString() 이거 어디에 넣지
    },
    content : {
        type : String
    }
});

module.exports = mongoose.model("Board", boardSchema);
