const mongoose = require("mongoose");
const schema = mongoose.Schema;

const homeservices_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const HomeServices = mongoose.model("home_services", homeservices_schema);
module.exports = {
  HomeServices,
};
