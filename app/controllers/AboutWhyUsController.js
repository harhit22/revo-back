const AboutWhyUs = require("../models/AboutWhyUsSchema").AboutWhyUs;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class AboutWhyUsController extends Controller {
  constructor() {
    super();
  }

  async AddAboutWhyUs() {
    try {
      let bodyData = this.req.body;
      let addAboutWhyUs = new Model(AboutWhyUs).store(bodyData);
      if (addAboutWhyUs != null) {
        this.res.send({
          status: 1,
          message: "AboutWhyUs data added successfully",
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
        api_name: "add Add AboutWhyUs api",
        function_name: "AddAboutWhyUs()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetAboutWhyUs() {
    try {
      let allAboutWhyUs = await AboutWhyUs.find({});
      if (allAboutWhyUs != null) {
        this.res.send({
          status: 1,
          message: "all AboutWhyUs retuned successfully",
          data: allAboutWhyUs,
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
        api_name: "get AboutWhyUs api",
        function_name: "GetAboutWhyUs()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateAboutWhyUs() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_AboutWhyUs = await AboutWhyUs.findByIdAndUpdate(
          ObjectID(this.req.body.aboutwhyus_id),
          updateData
        );
        if (update_AboutWhyUs != null) {
          this.res.send({
            status: 1,
            message: "AboutWhyUs updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delAboutWhyUs = await AboutWhyUs.findByIdAndRemove(
          ObjectID(this.req.body.aboutwhyus_id),
          dData
        );
        console.log(delAboutWhyUs);
        if (delAboutWhyUs != null) {
          this.res.send({
            status: 1,
            message: "AboutWhyUs deleted successfully",
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
        api_name: "update AboutWhyUs api",
        function_name: "UpdateAboutWhyUs()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = AboutWhyUsController;
