const mongoose = require("mongoose");
const schema = mongoose.Schema;

const product_schema = new schema(
  {
    name: { type: String, default: "" },
    cat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product_category",
      index: true,
    },
    subcat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product_subcategory",
      index: true,
    },
    mrp: { type: Number, default: "" },
    discount: { type: Number, default: "" },
    tax: { type: Number, default: "" },
    price_with_tax: { type: Number, default: "" },
    selling_price: { type: Number, default: "" },
    image: { type: String, default: "" },
    stock: { type: Number, default: "" },
    description: { type: String, default: "" },
    publisher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "publisher",
      index: true,
    },
    delete_status: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", product_schema);
module.exports = {
  Product,
};
