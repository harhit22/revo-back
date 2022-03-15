const mongoose = require("mongoose");
const schema = mongoose.Schema;

const contactUs_schema = new schema(
  {
    form_subtitle: { type: String, default: "" },
    form_title: { type: String, default: "" },
    form_text: { type: String, default: "" },
    map_src: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const ContactUs = mongoose.model("contact_us", contactUs_schema);
module.exports = {
  ContactUs,
};
