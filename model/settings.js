const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  year: String,
  term: String,
});

const settingsModel = mongoose.model("setting", settingsSchema);

module.exports = settingsModel;
