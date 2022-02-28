const mongoose = require("mongoose");
const schema = mongoose.Schema;

const examBanner_schema = new schema(
  {
    image_url: { type: String, default: "" },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
    delete_status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ExamBanner = mongoose.model("exam_banner", examBanner_schema);
module.exports = {
  ExamBanner,
};
