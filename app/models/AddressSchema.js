const mongoose = require("mongoose");
const schema = mongoose.Schema;

const address_schema = new schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "user", index: true },
    street_address: { type: String, default: "" },
    postal_code: { type: Number, default: 0 },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("address", address_schema);

module.exports = {
  Address,
};
