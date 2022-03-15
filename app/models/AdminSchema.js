const mongoose = require("mongoose");
const schema = mongoose.Schema;

const admin_schema = new schema(
  {
    admin_id: { type: String, default: "" },
    password: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("admin", admin_schema);

module.exports = {
  Admin,
};
