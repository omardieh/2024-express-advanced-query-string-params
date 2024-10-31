const { Schema, model } = require("mongoose");

const GooseSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
});

const Goose = model("Goose", GooseSchema);
module.exports = Goose;
