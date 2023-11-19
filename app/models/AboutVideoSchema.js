const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AboutVideo_schema = new schema(
  {
    client_subtitle: { type: String, default: "" },
    client_title: { type: String, default: "" },
    client_image: { type: String, default: "" },
    client_text: { type: String, default: "" },
    client_name: { type: String, default: "" },
    client_post: { type: String, default: "" },
    client_video: { type: String, default: "" },
    client_videoimage: { type: String, default: "" },
    getin_touchtitle: { type: String, default: "" },
    getin_touchsubtitle: { type: String, default: "" },
    btn_text: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const AboutVideo = mongoose.model("AboutVideo", AboutVideo_schema);
module.exports = {
  AboutVideo
};
