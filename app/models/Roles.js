const mongoose = require("mongoose");
const schema = mongoose.Schema;

const roles_schema = new schema({
  name: { type: String, default: "" },
  permissions: { type: Boolean, default: false },
});

const Roles = mongoose.model("roles", roles_schema);

module.exports = {
  Roles,
};
