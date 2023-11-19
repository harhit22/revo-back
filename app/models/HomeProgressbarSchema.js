const mongoose = require("mongoose");
const schema = mongoose.Schema;

const HomeProgressbar_schema = new schema(
  {
    prog_title: { type: String, default: "" },
    prog_percentage: { type: String, default: "" },
 
  },
  {
    timestamps: true,  
  }
);

const HomeProgressbar = mongoose.model("HomeProgressbar", HomeProgressbar_schema);
module.exports = {
  HomeProgressbar
};
