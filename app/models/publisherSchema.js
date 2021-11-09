const mongoose = require("mongoose");
const schema = mongoose.Schema;

const publisher_schema = new schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    status: { type: Boolean, default: true },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Publisher = mongoose.model("publisher", publisher_schema);
module.exports = {
  Publisher,
};
