const mongoose = require("mongoose");
const schema = mongoose.Schema;

const video_course = new schema({
  name: { type: String, default: "" },
  video_url: { type: String, default: "" },
  thumbnail_url: { type: String, default: "" },
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
});

const VideoCourses = mongoose.model("VideoCourses", video_course);
module.exports = {
  VideoCourses,
};
