const mongoose = require("mongoose");
const schema = mongoose.Schema;

const form_schema = new schema(
  {
    fname: { type: String, default: "" },
    lname: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    message: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const ContactUsForm = mongoose.model("contactus_form", form_schema);
module.exports = {
  ContactUsForm,
};
