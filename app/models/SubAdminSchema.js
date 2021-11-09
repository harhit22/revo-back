const mongoose = require("mongoose");
const schema = mongoose.Schema;

const subAdmin = new schema({
  fname: { type: String, default: "" },
  lname: { type: String, default: "" },
  profile_picture: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  phone_no: { type: Number, default: "" },
  is_suspended: { type: Boolean },
  app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
});

const SubAdmin = mongoose.model("subadmin", subAdmin);

const permission = new schema(
  {
    subAdmin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subadmin",
      index: true,
    },
    test_series: { type: Boolean, default: false },
    video_courses: { type: Boolean, default: false },
    live_classes: { type: Boolean, default: false },
    course_content: { type: Boolean, default: false },
    ecommerce: { type: Boolean, default: false },
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: "app", index: true },
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model("permission", permission);

module.exports = {
  SubAdmin,
  Permission,
};
