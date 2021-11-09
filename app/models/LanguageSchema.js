const mongoose = require("mongoose");
const schema = mongoose.Schema;

const lang_schema = new schema(
  {
    name: { type: String, default: "" },
    short_code: { type: String, default: "" },
    delete_status: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Language = mongoose.model("language", lang_schema);

module.exports = {
  Language,
};
