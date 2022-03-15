const mongoose = require("mongoose");
const schema = mongoose.Schema;

const testimonialHead_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const testimonialCrousal_schema = new schema(
  {
    image_url: { type: String, default: "" },
    name: { type: String, default: "" },
    position: { type: String, default: "" },
    feedback: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const TestimonialHead = mongoose.model(
  "testimonial_head",
  testimonialHead_schema
);
const TestimonialCrousal = mongoose.model(
  "testimonial_crousal",
  testimonialCrousal_schema
);
module.exports = {
  TestimonialHead,
  TestimonialCrousal,
};
