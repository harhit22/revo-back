const mongoose = require("mongoose");
const schema = mongoose.Schema;

const homePortfolio_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const HomePortfolio = mongoose.model("home_portfolio", homePortfolio_schema);
module.exports = {
  HomePortfolio,
};
