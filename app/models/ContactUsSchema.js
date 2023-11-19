const mongoose = require("mongoose");
const schema = mongoose.Schema;

const contactUs_schema = new schema(
  {
    form_subtitle: { type: String, default: "" },
    form_title: { type: String, default: "" },
    form_text: { type: String, default: "" },
    contact_info: { type: String, default: "" },
    contact_info_title: { type: String, default: "" },
    contact_info_email: { type: String, default: "" },
    contact_info_mobile: { type: String, default: "" },
    contact_info_adderess: { type: String, default: "" },
    facebook_src: { type: String, default: "" },
    twitter_src: { type: String, default: "" },
    instgram_src: { type: String, default: "" },
    linkdin_src: { type: String, default: "" },
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
