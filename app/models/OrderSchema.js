var mongoose = require("mongoose");
var schema = mongoose.Schema;

var order = new schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      index: true,
    },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transaction",
      index: true,
    },
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "invoice",
      index: true,
    },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    address: { type: String, default: "" },
    order_status: { type: String, default: "pending" },
    is_delete: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

var Orders = mongoose.model("order", order);

module.exports = {
  Orders,
};
