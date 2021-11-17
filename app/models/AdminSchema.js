const mongoose = require("mongoose");
const schema = mongoose.Schema;

const admin_schema = new schema(
  {
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
      index: true,
    },
    fname: { type: String, default: "" },
    lname: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("admin", admin_schema);

module.exports = {
  Admin,
};
