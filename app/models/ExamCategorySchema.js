const mongoose = require("mongoose");
const schema = mongoose.Schema;

const exam_cat = new schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    is_delete: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
    show_on_home: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ExamCategory = mongoose.model("exam_category", exam_cat);

module.exports = {
  ExamCategory,
};
