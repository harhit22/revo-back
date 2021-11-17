const mongoose = require("mongoose");
const schema = mongoose.Schema;

const wallet_schema = new schema(
  {
    order_txn_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      index: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      index: true,
    },
    amount: { type: Number, default: 0 },
    cr_dr: { type: String, default: "" },
    description: { type: String, default: "" },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("wallet_transactions", wallet_schema);

module.exports = {
  Wallet,
};
