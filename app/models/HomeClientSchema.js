const mongoose = require("mongoose");
const schema = mongoose.Schema;

const homeclient_schema = new schema(
  {
    subtitle: { type: String, default: "" },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const clientCrousal_schema = new schema(
  {
    image_url: { type: String, default: "" },
    link_url: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const HomeClient = mongoose.model("home_client", homeclient_schema);
const ClientCrousal = mongoose.model("client_crousal", clientCrousal_schema);
module.exports = {
  HomeClient,
  ClientCrousal,
};
