const mongoose = require("mongoose");
const schema = mongoose.Schema;

const pac_sub = new schema(
  {
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "package",
      index: true,
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      index: true,
    },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const PackSub = mongoose.model("packsubject", pac_sub);

module.exports = {
  PackSub,
};
