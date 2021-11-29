const mongoose = require("mongoose");
const schema = mongoose.Schema;

const package_schema = new schema(
  {
    name: { type: String, default: "" },
    price: { type: String, default: "" },
    duration: { type: Number, default: "" },
    demo_video_url: { type: String, default: "" },
    short_description: { type: String, default: "" },
    long_description: { type: String, default: "" },
    package_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "package_category",
      index: true,
    },
    has_testSeries: { type: Boolean, default: false },
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: "exam", index: true },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("package", package_schema);

module.exports = {
  Package,
};
