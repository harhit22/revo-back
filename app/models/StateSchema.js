const mongoose = require("mongoose");
const schema = mongoose.Schema;

const state_schema = new schema(
  {
    state_id: { type: String, default: "" },
    delete_status: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const State = mongoose.model("state", state_schema);

module.exports = {
  State,
};
