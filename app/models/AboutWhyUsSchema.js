const mongoose = require("mongoose");
const schema = mongoose.Schema;

const aboutWhyUs_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    tab_name: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const AboutWhyUs = mongoose.model("about_whyus", aboutWhyUs_schema);
module.exports = {
  AboutWhyUs,
};
