const mongoose = require("mongoose");
const schema = mongoose.Schema;

const package_cat = new schema(
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

const PackageCategory = mongoose.model("package_category", package_cat);

module.exports = {
  PackageCategory,
};
