const mongoose = require("mongoose");
const schema = mongoose.Schema;

const homeBanner_schema = new schema(
  {
    image_url: { type: String, default: "" },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
    delete_status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const HomeBanner = mongoose.model("home_banner", homeBanner_schema);
module.exports = {
  HomeBanner,
};
