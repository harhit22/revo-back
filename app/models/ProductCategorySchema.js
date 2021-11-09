const mongoose = require("mongoose");
const schema = mongoose.Schema;

const product_cat = new schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    is_delete: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model("product_category", product_cat);

module.exports = {
  ProductCategory,
};
