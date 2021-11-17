const mongoose = require("mongoose");
const schema = mongoose.Schema;

const city_schema = new schema(
  {
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "state",
      index: true,
    },
    city_name: { type: String, default: "" },
    delete_status: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const City = mongoose.model("city", city_schema);

module.exports = {
  City,
};
