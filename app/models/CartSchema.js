const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cart = new schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      index: true,
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      index: true,
    },
    quantity: { type: Number, default: 0 },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

var Cart = mongoose.model("cart", cart);
module.exports = {
  Cart,
};
