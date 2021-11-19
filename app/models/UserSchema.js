const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user_schema = new schema(
  {
    fname: { type: String, default: "" },
    lname: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    profile_picture: { type: String, default: "" },
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
      index: true,
    },
    city_id: { type: mongoose.Schema.Types.ObjectId, ref: "city", index: true },
    status: { type: Boolean, default: true },
    delete_status: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", user_schema);

module.exports = {
  User,
};
