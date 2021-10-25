const mongoose = require("mongoose");
const schema = mongoose.Schema;

const content_schema = new schema({
  name: { type: String, default: "" },
  pdf_url: { type: String, default: "" },
  subject_id: { type: mongoose.Schema.Types.ObjectId, default: "" },
  lesson_id: { type: mongoose.Schema.Types.ObjectId, default: "" },
});

const Content = mongoose.model("content", content_schema);

module.exports = {
  Content,
};
