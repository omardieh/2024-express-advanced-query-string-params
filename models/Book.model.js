const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  year: Number,
  codeISBN: { type: String, maxlength: 13, unique: true },
  quantity: { type: Number, min: 0, default: 0 },
  lastPublished: { type: Date, default: Date.now },
  genre: { type: String, enum: ["romance", "fiction", "biography", "poetry"] },
  author: String,
});

const Book = model("Book", bookSchema);
module.exports = Book;
