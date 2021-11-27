const mongoose = require("mongoose");
const schema = mongoose.Schema;

const lesson_schema = new schema(
  {
    name: { type: String, default: "" },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "package",
      index: true,
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      index: true,
    },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
    delete_status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model("lesson", lesson_schema);

module.exports = {
  Lesson,
};
