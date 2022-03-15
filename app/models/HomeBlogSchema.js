const mongoose = require("mongoose");
const schema = mongoose.Schema;

const homeblog_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const HomeBlog = mongoose.model("home_blog", homeblog_schema);
module.exports = {
  HomeBlog,
};
