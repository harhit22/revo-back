const mongoose = require("mongoose");
const schema = mongoose.Schema;

const lang_schema = new schema(
  {
    name: { type: String, default: "" },
    short_code: { type: String, default: "" },
    delete_status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Language = mongoose.model("language", lang_schema);

module.exports = {
  Language,
};
