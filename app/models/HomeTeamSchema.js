const mongoose = require("mongoose");
const schema = mongoose.Schema;

const hometeam_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const HomeTeam = mongoose.model("home_team", hometeam_schema);
module.exports = {
  HomeTeam,
};
