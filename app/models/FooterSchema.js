const mongoose = require("mongoose");
const schema = mongoose.Schema;

const footer_schema = new schema(
  {
    image_url: { type: String, default: "" },
    footer_description: { type: String, default: "" },
    contact: { type: String, default: "" },
    facebook_link: { type: String, default: "" },
    instagram_link: { type: String, default: "" },
    linkdin_link: { type: String, default: "" },
    copyright_text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Footer = mongoose.model("footer", footer_schema);
module.exports = {
  Footer,
};
