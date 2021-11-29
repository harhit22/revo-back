const mongoose = require("mongoose");
const schema = mongoose.Schema;

const recommedation_schema = new schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Recommedation = mongoose.model(
  "courses_recommedation",
  recommedation_schema
);

module.exports = {
  Recommedation,
};
