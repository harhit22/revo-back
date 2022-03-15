const mongoose = require("mongoose");
const schema = mongoose.Schema;

const logo_schema = new schema(
  {
    logo_url: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const menu_schema = new schema(
  {
    name: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Logo = mongoose.model("logo", logo_schema);
const Menu = mongoose.model("menu", menu_schema);
module.exports = {
  Logo,
  Menu,
};
