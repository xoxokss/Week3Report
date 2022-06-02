const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const boardSchema = new mongoose.Schema({
    title : {
        type : String
    },
    postDate: {
        type : Date,
        default : Date.now
    },
    content : {
        type : String
    }
});

boardSchema.plugin(AutoIncrement, {inc_field:'postId'});
module.exports = mongoose.model("Board", boardSchema);
