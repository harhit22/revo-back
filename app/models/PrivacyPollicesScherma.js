const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PrivacyPollices_schema = new schema(
  {
   
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    
  },
  {
    timestamps: true,
  }
);

const PrivacyPollice = mongoose.model("PrivacyPollice", PrivacyPollices_schema);
module.exports = {
  PrivacyPollice,
};