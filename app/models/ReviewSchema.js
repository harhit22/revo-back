const mongoose = require("mongoose");
const schema = mongoose.Schema;

const review_schema = new schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", index: true },
  app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "package",
    index: true,
  },
  rating: { type: String, default: "" },
  review: { type: String, default: "" },
  delete_status: { type: Boolean, default: false },
});

const Review = mongoose.model("review", review_schema);
module.exports = {
  Review,
};
