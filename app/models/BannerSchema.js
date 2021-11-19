const mongoose = require("mongoose");
const schema = mongoose.Schema;

const banner_schema = new schema(
  {
    banner_name: { type: String, default: "" },
    image_url: { type: String, default: "" },
    subtitles: { type: String, default: "" },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
    delete_status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("banner", banner_schema);
module.exports = {
  Banner,
};
