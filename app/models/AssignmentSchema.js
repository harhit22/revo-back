const mongoose = require("mongoose");
const schema = mongoose.Schema;

const assignment_schema = new schema(
  {
    name: { type: String, default: "" },
    pdf_url: { type: String, default: "" },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      index: "true",
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

const Assignment = mongoose.model("assignment", assignment_schema);

module.exports = {
  Assignment,
};
