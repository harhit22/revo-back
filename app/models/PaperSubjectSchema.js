const mongoose = require("mongoose");
const schema = mongoose.Schema;
const sub_schema = new schema(
  {
    paper_id: { type: mongoose.Types.ObjectId, ref: "paper", index: true },
    name: { type: String, default: "" },
    language: { type: String, default: "" },
    is_delete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("subject", sub_schema);

module.exports = {
  Subject,
};
