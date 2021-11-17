const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderItem = new schema(
  {
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transaction",
      index: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      index: true,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
    order_price: { type: Number, default: 0 },
    order_discount: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model("order_item", orderItem);

module.exports = {
  OrderItem,
};
