const mongoose = require("mongoose");
const schema = mongoose.Schema;

const product_sub = new schema(
  {
    cat_id: {
      type: mongoose.Types.ObjectId,
      ref: "product_category",
      index: true,
    },
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    is_delete: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const productSubcategory = mongoose.model("product_subcategory", product_sub);

module.exports = {
  productSubcategory,
};
