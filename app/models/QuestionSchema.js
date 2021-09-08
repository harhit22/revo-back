const mongoose = require("mongoose");
const schema = mongoose.Schema;

const question_schema = new schema(
  {
    subject_id: { type: mongoose.Types.ObjectId, ref: "subject", index: true },
    lang_id: { type: mongoose.Types.ObjectId, ref: "language", index: true },
    question: { type: String, default: "" },
    option_1: { type: String, default: "" },
    option_2: { type: String, default: "" },
    option_3: { type: String, default: "" },
    option_4: { type: String, default: "" },
    answer: { type: String, default: "" },
    image: { type: String, default: "" },
    positive_marks: { type: Number, default: "" },
    negaive_marks: { type: Number, default: "" },
    solution: { type: String, default: "" },
    solution_image: { type: String, default: "" },
    difficulty: { type: String, default: "" },
    is_delete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("question", question_schema);

module.exports = {
  Question,
};
