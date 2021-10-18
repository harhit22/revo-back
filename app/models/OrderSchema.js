var mongoose = require("mongoose");
var schema = mongoose.Schema;

var order = new schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      index: true,
    },
    transaction_id: {
      type: mongoose.Types.ObjectId,
      ref: "transaction",
      index: true,
    },
    invoice_id: {
      type: mongoose.Types.ObjectId,
      ref: "invoice",
      index: true,
    },

    tracking_id: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    address: { type: String, default: "" },
    order_status: { type: String, default: "pending" },
    status: { type: Boolean, default: true },
    is_delete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

var Orders = mongoose.model("order", order);

module.exports = {
  Orders,
};
