const mongoose = require("mongoose");
const schema = mongoose.Schema;

const FAQ_Schema = new schema(
  {
   
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  
  },
  {
    timestamps: true,
  }
);

const FAQ = mongoose.model("FAQ",FAQ_Schema);
module.exports = {
  FAQ,
};