const ExamBanner = require("../models/ExamBannerSchema").ExamBanner;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("../controllers/Controller");
const ObjectID = require("mongodb").ObjectId;

class ExamBannerController extends Controller {
  constructor() {
    super();
  }

  async AddExamBanner() {
    try {
      let bodyData = this.req.body;
      let addBanner = new Model(ExamBanner).store(bodyData);
      if (addBanner != null) {
        this.res.send({ status: 1, message: "Exam Banner added successfully" });
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
        api_name: "exam banner api",
        function_name: "AddExamBanner()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetExamBanner() {
    try {
      let allBanner = await ExamBanner.find({
        delete_status: false,
        app_id: ObjectID(this.req.body.app_id),
      });
      if (allBanner != null) {
        this.res.send({
          status: 1,
          message: "all banner retuned successfully",
          data: allBanner,
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
        api_name: "get exam banner api",
        function_name: "GetExamBanner()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateExamBanner() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_banner = await ExamBanner.findByIdAndUpdate(
          ObjectID(this.req.body.banner_id),
          updateData
        );
        if (update_banner != null) {
          this.res.send({
            status: 1,
            message: "banner updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delBanner = await ExamBanner.findByIdAndUpdate(
          ObjectID(this.req.body.banner_id),
          dData
        );
        console.log(delBanner);
        if (delBanner != null) {
          this.res.send({
            status: 1,
            message: "banner deleted successfully",
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
        api_name: "update exam banner api",
        function_name: "UpdateExamBanner()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = ExamBannerController;
