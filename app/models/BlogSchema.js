const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blog_schema = new schema(
  {
    blog_image: { type: String, default: "" },
    thumbnail_image: { type: String, default: "" },
    title: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blog_schema);
module.exports = {
  Blog,
};
