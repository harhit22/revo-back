const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Aboutaboutsctions_Schema = new schema(
  {
    about_image: { type: String, default: "" },
    title: { type: String, default: "" },
    
    subtitle: { type: String, default: "" },

    section: [
      {
        title: String,
        Content: String,
      },
      {
        title: String,
        Content: String,
      },
      {
        title: String,
        Content: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Aboutaboutsection = mongoose.model(
  "aboutaboutSection",
  Aboutaboutsctions_Schema
);
module.exports = {
  Aboutaboutsection,
};
