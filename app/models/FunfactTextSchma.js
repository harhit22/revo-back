const mongoose = require("mongoose");
const schema = mongoose.Schema;

const funfactText_schema = new schema(
  {
    btntext: { type: String, default: "" },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    subtitle2: { type: String, default: "" },
    timecontact: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const FunfactText = mongoose.model("funfactText", funfactText_schema);
module.exports = {
  FunfactText,
};