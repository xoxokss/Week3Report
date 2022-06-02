const mongoose = require("mongoose");

const { Schema } = mongoose;
const CommentSchema = new Schema({
  postId: { type : Number} ,
  nickname: {type : String} ,
  comment: {type : String},
  postDate: {
    type : Date,
    default : Date.now
},
});
CommentSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
  });
  CommentSchema.set("toJSON", {
    virtuals: true,
  });
module.exports = mongoose.model("Comment", CommentSchema);