const mongoose = require("mongoose");
const schema = mongoose.Schema;

const product_cat = new schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    is_delete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model("product_category", product_cat);

module.exports = {
  ProductCategory,
};
