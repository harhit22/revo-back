const mongoose = require("mongoose");
const schema = mongoose.Schema;

const wishlist_schema = new schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      index: "true",
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      index: "true",
    },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("wishlist", wishlist_schema);

module.exports = {
  Wishlist,
};
