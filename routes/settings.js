const {
  getSettings,
  postSettings,
  editSettings,
  customEntry,
} = require("./../controllers/settings");

const Router = require("express").Router();

Router.route("/").get(getSettings).post(postSettings).put(editSettings);

Router.route("/custom").get(customEntry);

module.exports = Router;
