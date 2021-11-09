const mongoose = require("mongoose");
const schema = mongoose.Schema;

const result_schema = new schema(
  {
    paper_id: { type: mongoose.Types.ObjectId, ref: "paper", index: true },
    user_id: { type: mongoose.Types.ObjectId, ref: "user", index: true },
    marks: { type: Number, default: "" },
    total_attempt: { type: Number, default: "" },
    not_attempt: { type: Number, default: "" },
    bookmark: { type: Number, default: "" },
    not_visited: { type: Number, default: "" },
    total_marks: { type: Number, default: "" },
    percentiles: { type: Number, default: "" },
    correct_answer: { type: Number, default: "" },
    incorrect_answer: { type: Number, default: "" },
    delet_status: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("result", result_schema);

module.exports = {
  Result,
};
