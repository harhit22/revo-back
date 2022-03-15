const mongoose = require("mongoose");
const schema = mongoose.Schema;

const weDo_head_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const weDo_crousal_schema = new schema(
  {
    image: { type: String, default: "" },
    button_text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const weDo_head = mongoose.model("wedo_head", weDo_head_schema);
const weDo_crousal = mongoose.model("wedo_crousal", weDo_crousal_schema);
module.exports = {
  weDo_head,
  weDo_crousal,
};
