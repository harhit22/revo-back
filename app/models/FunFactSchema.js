const mongoose = require("mongoose");
const schema = mongoose.Schema;

const funfact_schema = new schema(
  {
    number: { type: String, default: "" },
    title: { type: String, default: "" },
    icons: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Funfact = mongoose.model("funfact", funfact_schema);
module.exports = {
  Funfact,
};
