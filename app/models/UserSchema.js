const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user_schema = new schema(
  {
    fname: { type: String, default: "" },
    lname: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: Number, default: "" },
    state_id: { type: mongoose.Types.ObjectId, ref: "state", index: true },
    city_id: { type: mongoose.Types.ObjectId, ref: "city", index: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", user_schema);

module.exports = {
  User,
};
