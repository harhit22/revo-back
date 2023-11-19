const mongoose = require("mongoose");
const schema = mongoose.Schema;

const testimonial_schema = new schema(
  {
    btntext: { type: String, default: "" },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("Testimonial", testimonial_schema);
module.exports = {
  Testimonial,
};