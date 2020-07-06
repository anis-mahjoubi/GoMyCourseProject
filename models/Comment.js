const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  id_user: {
    type: String,
    required: true,
  },
  id_video: {
    type: String,
    required: true,
  },
  id_comment: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
