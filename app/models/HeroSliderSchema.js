const mongoose = require("mongoose");
const schema = mongoose.Schema;

const heroSlider_schema = new schema(
  {
    slider_name: { type: String, default: "" },
    image_url: { type: String, default: "" },
    subtitles: { type: String, default: "" },
    title: { type: String, default: "" },
    button: { type: String, default: "" },
    button_url: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const HeroSlider = mongoose.model("hero_slider", heroSlider_schema);
module.exports = {
  HeroSlider,
};
