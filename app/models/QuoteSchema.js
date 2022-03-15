const mongoose = require("mongoose");
const schema = mongoose.Schema;

const quote_schema = new schema(
  {
    image_url: { type: String, default: "" },
    icon_url: { type: String, default: "" },
    quote: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model("quote", quote_schema);
module.exports = {
  Quote,
};
