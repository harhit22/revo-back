const mongoose = require("mongoose");
const schema = mongoose.Schema;

const homeexp_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    video_url: { type: String, default: "" },
    video_text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const HomeExperience = mongoose.model("home_experience", homeexp_schema);
module.exports = {
  HomeExperience,
};
