const mongoose = require("mongoose");
const schema = mongoose.Schema;

const paper_question = new schema(
  {
    paper_id: { type: mongoose.Types.ObjectId, ref: "paper", index: true },
    question_id: {
      type: mongoose.Types.ObjectId,
      ref: "question",
      index: true,
    },
    subject_id: { type: mongoose.Types.ObjectId, ref: "subject", index: true },
    is_delete: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const PaperQuestion = mongoose.model("paperquestion", paper_question);

module.imports = {
  PaperQuestion,
};
