const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AnyProject_schema = new schema(
  {
    btntext: { type: String, default: "" },
    title: { type: String, default: "" },
  
  },
  {
    timestamps: true,
  }
);

const AnyProject = mongoose.model("AnyProject", AnyProject_schema);
module.exports = {
  AnyProject,
};