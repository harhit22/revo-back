const mongoose = require("mongoose");
const schema = mongoose.Schema;

const aboutGetToKnow_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title1: { type: String, default: "" },
    upper_image: { type: String, default: "" },
    lower_image: { type: String, default: "" },
    subtitle2: { type: String, default: "" },
    title2: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const AboutGetToKnow = mongoose.model("about_gettoknow", aboutGetToKnow_schema);
module.exports = {
  AboutGetToKnow,
};
