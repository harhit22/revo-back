const mongoose = require("mongoose");
const schema = mongoose.Schema;

const state_schema = new schema(
  {
    state_name: { type: String, default: "" },
    delete_status: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

const State = mongoose.model("state", state_schema);

module.exports = {
  State,
};
