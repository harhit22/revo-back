const mongoose = require("mongoose");
const schema = mongoose.Schema;

const aboutWhyUs_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const aboutWhyUsTab_schema = new schema(
  {
    tab_name: { type: String, default: "" },
    image_url: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const AboutWhyUs = mongoose.model("about_whyus", aboutWhyUs_schema);
const AboutWhyUsTab = mongoose.model("aboutwhy_tab", aboutWhyUsTab_schema);
module.exports = {
  AboutWhyUs,
  AboutWhyUsTab,
};
