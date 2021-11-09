const mongoose = require("mongoose");
const schema = mongoose.Schema;

const subject_schema = new schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    delete_status: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("subject", subject_schema);

module.exports = {
  Subject,
};
