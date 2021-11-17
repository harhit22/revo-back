const mongoose = require("mongoose");
const schema = mongoose.Schema;

const exam_schema = new schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exam_category",
      index: true,
    },
    name: { type: String, default: "" },
    price: { type: Number, default: "" },
    is_delete: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("exam", exam_schema);

module.exports = {
  Exam,
};
