const mongoose = require("mongoose");
const schema = mongoose.Schema;

const portfolio_schema = new schema(
  {
    thumbnail_image: { type: String, default: "" },
    image_1: { type: String, default: "" },
    image_2: { type: String, default: "" },
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    project_link: { type: String, default: " " },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model("portfolio", portfolio_schema);
module.exports = {
  Portfolio,
};
