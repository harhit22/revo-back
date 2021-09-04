const mongoose = require("mongoose");

const error = new mongoose.Schema(
  {
    is_from: { type: String, default: "NA" },
    api_name: { type: String, default: "NA" },
    finction_name: { type: String, default: "NA" },
    description: { type: String, default: "NA" },
    error_title: { type: String, default: "NA" },
    mobile_data: { type: String, default: "NA" },
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

const Errorlogs = mongoose.model("errorlog", error);
module.exports = {
  Errorlogs,
};
