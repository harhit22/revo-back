const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userPack_schema = new schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
  package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "package",
    index: true,
  },
  transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "transaction",
    index: true,
  },
});

const UserPackage = mongoose.model("userPackage", userPack_schema);

module.exports = {
  UserPackage,
};
