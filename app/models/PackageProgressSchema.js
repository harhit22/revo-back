const mongoose = require("mongoose");
const schema = mongoose.Schema;

const progress_schema = new schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "package",
      index: true,
    },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
    video_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videocourses",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model("progress", progress_schema);
module.exports = {
  Progress,
};
