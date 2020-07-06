const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  id_author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Cour = mongoose.model("cour", CourSchema);
