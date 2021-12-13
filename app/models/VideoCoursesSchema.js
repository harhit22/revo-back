const mongoose = require("mongoose");
const schema = mongoose.Schema;

const video_course = new schema(
  {
    name: { type: String, default: "" },
    video_url: { type: String, default: "" },
    thumbnail_url: { type: String, default: "" },
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
    lesson_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lesson",
      index: true,
    },
    description: { type: String, default: "" },
    delete_status: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const VideoCourses = mongoose.model("VideoCourses", video_course);
module.exports = {
  VideoCourses,
};
