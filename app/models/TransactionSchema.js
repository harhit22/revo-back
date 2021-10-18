var mongoose = require("mongoose");
var schema = mongoose.Schema;

var transaction = new schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      index: true,
    },
    order_id: {
      type: mongoose.Types.ObjectId,
      ref: "order",
      index: true,
    },
    transaction_status: { type: String, default: "" },
    transaction_array: { type: String, default: "" },
    payment_method: { type: String, default: "" },
    card_number: { type: String, default: "" },
    card_type: { type: String, default: "" },
    invoice_id: { type: Number, default: "" },
    actual_amount: { type: Number, default: "" },
    discount: { type: Number, default: "" },
    final_amount: { type: Number, default: "" },
    wallet_used: { type: Number, default: 0 },
    currency: { type: String, default: "" },
    localization: { type: String, default: "" },
    device_type: { type: String, default: "" },
    os_type: { type: String, default: "" },
    location: { type: String, default: "" },
    time: { type: String, default: "" },
    status: { type: Boolean, default: true },
    is_delete: { type: Boolean, default: false },
    is_save_card: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

var Transactions = mongoose.model("Transaction", transaction);

module.exports = {
  Transactions,
};
