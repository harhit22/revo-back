const AboutGetToKnow = require("../models/AboutGetToKnowSchema").AboutGetToKnow;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class AboutGetToKnowController extends Controller {
  constructor() {
    super();
  }

  async AddAboutGetToKnow() {
    try {
      let bodyData = this.req.body;
      let addAboutGetToKnow = new Model(AboutGetToKnow).store(bodyData);
      if (addAboutGetToKnow != null) {
        this.res.send({
          status: 1,
          message: "AboutGetToKnow data added successfully",
        });
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
        api_name: "add Add AboutGetToKnow api",
        function_name: "AddAboutGetToKnow()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetAboutGetToKnow() {
    try {
      let allAboutGetToKnow = await AboutGetToKnow.find({});
      if (allAboutGetToKnow != null) {
        this.res.send({
          status: 1,
          message: "all AboutGetToKnow retuned successfully",
          data: allAboutGetToKnow,
        });
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
        api_name: "get AboutGetToKnow api",
        function_name: "GetAboutGetToKnow()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateAboutGetToKnow() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_AboutGetToKnow = await AboutGetToKnow.findByIdAndUpdate(
          ObjectID(this.req.body.aboutgettoknow_id),
          updateData
        );
        if (update_AboutGetToKnow != null) {
          this.res.send({
            status: 1,
            message: "AboutGetToKnow updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delAboutGetToKnow = await AboutGetToKnow.findByIdAndRemove(
          ObjectID(this.req.body.aboutgettoknow_id),
          dData
        );
        console.log(delAboutGetToKnow);
        if (delAboutGetToKnow != null) {
          this.res.send({
            status: 1,
            message: "AboutGetToKnow deleted successfully",
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
        api_name: "update AboutGetToKnow api",
        function_name: "UpdateAboutGetToKnow()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = AboutGetToKnowController;
