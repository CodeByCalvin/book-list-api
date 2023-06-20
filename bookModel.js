const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  readStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Book", bookSchema);
