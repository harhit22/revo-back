const mongoose = require("mongoose");
const schema = mongoose.Schema;

const paper_schema = new schema(
  {
    exam_id: { type: mongoose.Types.ObjectId, ref: "exam", index: "true" },
    name: { type: String, default: "" },
    is_free: { type: Boolean, default: false },
    delete_status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Paper = mongoose.model("paper", paper_schema);
module.exports = {
  Paper,
};
