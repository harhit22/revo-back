const mongoose = require("mongoose");
const schema = mongoose.Schema;

const TermAndCondition_schema = new schema(
  {
   
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    
  },
  {
    timestamps: true,
  }
);

const TermAndCondition = mongoose.model("TermAndCondition", TermAndCondition_schema);
module.exports = {
  TermAndCondition,
};