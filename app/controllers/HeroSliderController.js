const HeroSlider = require("../models/HeroSliderSchema").HeroSlider;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HeroSliderController extends Controller {
  constructor() {
    super();
  }

  async AddSlider() {
    try {
      let bodyData = this.req.body;
      let addSlider = new Model(HeroSlider).store(bodyData);
      if (addSlider != null) {
        this.res.send({ status: 1, message: "Slider added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add slider api",
        function_name: "AddSlider()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetSlider() {
    try {
      if (!this.req.body.slider_id) {
        let allSlider = await HeroSlider.find({});
        if (allSlider != null) {
          this.res.send({
            status: 1,
            message: "all slider retuned successfully",
            data: allSlider,
          });
        }
      }
      if (this.req.body.slider_id) {
        let singleSlider = await HeroSlider.find({
          _id: ObjectID(this.req.body.slider_id),
        });
        if (singleSlider != null) {
          this.res.send({
            status: 1,
            message: "single slider returned",
            data: singleSlider,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get slider api",
        function_name: "GetSlider()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateSlider() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_slider = await HeroSlider.findByIdAndUpdate(
          ObjectID(this.req.body.slider_id),
          updateData
        );
        if (update_slider != null) {
          this.res.send({
            status: 1,
            message: "slider updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delSlider = await HeroSlider.findByIdAndRemove(
          ObjectID(this.req.body.slider_id),
          dData
        );
        console.log(delSlider);
        if (delSlider != null) {
          this.res.send({
            status: 1,
            message: "slider deleted successfully",
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update slider api",
        function_name: "UpdateSlider()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = HeroSliderController;
