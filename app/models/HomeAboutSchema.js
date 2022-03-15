const mongoose = require("mongoose");
const schema = mongoose.Schema;

const homeabout_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    button_text: { type: String, default: "" },
    button_url: { type: String, default: "" },
    image1_url: { type: String, default: "" },
    image2_url: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const HomeAbout = mongoose.model("home_about", homeabout_schema);
module.exports = {
  HomeAbout,
};
