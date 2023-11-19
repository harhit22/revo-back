const mongoose = require("mongoose");
const schema = mongoose.Schema;

const HomeRecommend_schema = new schema(
  {
    owner_image: { type: String, default: "" },
    owner_name: { type: String, default: "" },
    owner_des: { type: String, default: "" },
    owner_Text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const HomeRecommend = mongoose.model("HomeRecommend", HomeRecommend_schema);
module.exports = {
  HomeRecommend
};
