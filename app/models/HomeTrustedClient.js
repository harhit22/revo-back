const mongoose = require("mongoose");
const schema = mongoose.Schema;

const trustedClient_schema = new schema(
  {
    image_url: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },

    button_text: { type: String, default: "" },
    button_url: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const HomeTrustedClient = mongoose.model(
  "trusted_client",
  trustedClient_schema
);
module.exports = {
  HomeTrustedClient,
};
