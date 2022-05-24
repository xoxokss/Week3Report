const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const boardSchema = new mongoose.Schema({
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
        type : Date, //이거 굳이 Date로 안받아도 될거같은데? 날짜순으로 DB에 넣어야합니다.
        default : Date.now// new Date().toString() 이거 어디에 넣지
    },
    content : {
        type : String
    }
});

boardSchema.plugin(AutoIncrement, {inc_field:'postId'});
module.exports = mongoose.model("Board", boardSchema);
