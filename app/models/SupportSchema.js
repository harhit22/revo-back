const mongoose = require("mongoose");
const schema = mongoose.Schema;

const support_schema = new schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "user", index: true },
    title: { type: String, default: "" },
    description: { type: String },
    image: { type: String, default: "" },
    reponse: { type: String, default: "" },
    response_image: { type: String, default: "" },
    status: { type: String, default: "pending" },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Support = mongoose.model("support", support_schema);

module.exports = {
  Support,
};
