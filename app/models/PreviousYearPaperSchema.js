const mongoose = require("mongoose");
const schema = mongoose.Schema;

const privious_year = new schema(
  {
    name: { type: String, default: "" },
    pdf_url: { type: String, default: "" },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      index: true,
    },
    lesson_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lesson",
      index: true,
    },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Previous = mongoose.model("previousYear", privious_year);
module.exports = {
  Previous,
};
