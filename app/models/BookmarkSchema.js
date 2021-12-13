const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookmark_schema = new schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
    video_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videoes",
      index: true,
    },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Bookmarks = mongoose.model("bookmarks", bookmark_schema);
module.exports = {
  Bookmarks,
};
