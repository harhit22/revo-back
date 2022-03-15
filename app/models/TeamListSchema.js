const mongoose = require("mongoose");
const schema = mongoose.Schema;

const teamList_schema = new schema(
  {
    image_url: { type: String, default: "" },
    name: { type: String, default: "" },
    designation: { type: String, default: "" },
  },

  {
    timestamps: true,
  }
);

const TeamList = mongoose.model("team_list", teamList_schema);
module.exports = {
  TeamList,
};
