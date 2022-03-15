const mongoose = require("mongoose");
const schema = mongoose.Schema;

const pagebanner_schema = new schema(
  {
    about_image: { type: String, default: "" },
    about_title: { type: String, default: "" },
    services_image: { type: String, default: "" },
    services_title: { type: String, default: "" },
    portfolio_image: { type: String, default: "" },
    portfolio_title: { type: String, default: "" },
    blog_image: { type: String, default: "" },
    blog_title: { type: String, default: "" },
    contact_image: { type: String, default: "" },
    contact_title: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const PageBanner = mongoose.model("page_banner", pagebanner_schema);
module.exports = {
  PageBanner,
};
