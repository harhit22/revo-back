const mongoose = require("mongoose");
const schema = mongoose.Schema;

const service_schema = new schema(
  {
    image_url: { type: String, default: "" },
    icon_url: { type: String, default: "" },
    heading: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Services = mongoose.model("services", service_schema);
module.exports = {
  Services,
};
