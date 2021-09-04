const mongoose = require("mongoose");
const schema = mongoose.Schema;

const city_schema = new schema(
  {
    state_id: { type: mongoose.Types.ObjectId, ref: "state", index: true },
    city_name: { type: String, default: "" },
    delete_status: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

const City = mongoose.model("city", city_schema);

module.exports = {
  City,
};
