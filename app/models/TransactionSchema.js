const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transaction = new schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      index: true,
    },
    app_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "app",
      index: true,
    },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "package",
      index: true,
    },
    exam_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exam",
      index: true,
    },
    promocode_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "promocode",
      index: true,
    },
    promo_discount: { type: Number, default: 0 },
    wallet_used: { type: Number, default: 0 },
    transaction_type: { type: String, default: "" },
    transaction_mode: { type: String, default: "" },
    transaction_status: { type: Boolean, default: false },
    actual_amount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    final_amount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Transactions = mongoose.model("Transaction", transaction);

module.exports = {
  Transactions,
};
