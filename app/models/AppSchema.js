const mongoose = require("mongoose");
const schema = mongoose.Schema;

const app_schema = new schema(
  {
    subadmin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subadmin",
      index: true,
    },
    app_logo: { type: String, default: "" },
    app_primary_color: { type: String, default: "" },
    app_secondary_color: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const App = mongoose.model("app", app_schema);

module.exports = {
  App,
};
