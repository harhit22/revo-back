const monggose = require("mongoose");
const schema = monggose.Schema;

const wishlist_schema = new schema({
  user_id: { type: monggose.Types.ObjectId, ref: "user", index: "true" },
  product_id: { type: monggose.Types.ObjectId, ref: "product", index: "true" },
});

const Wishlist = monggose.model("wishlist", wishlist_schema);

module.exports = {
  Wishlist,
};
