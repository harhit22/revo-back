const PageBanner = require("../models/PageBannerSchema").PageBanner;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class PageBannerController extends Controller {
  constructor() {
    super();
  }

  async AddPageBanner() {
    try {
      let bodyData = this.req.body;
      let addPageBanner = new Model(PageBanner).store(bodyData);
      if (addPageBanner != null) {
        this.res.send({
          status: 1,
          message: "PageBanner data added successfully",
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
        api_name: "add Add PageBanner api",
        function_name: "AddPageBanner()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetPageBanner() {
    try {
      let allPageBanner = await PageBanner.find({});
      if (allPageBanner != null) {
        this.res.send({
          status: 1,
          message: "all PageBanner retuned successfully",
          data: allPageBanner,
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
        api_name: "get PageBanner api",
        function_name: "GetPageBanner()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdatePageBanner() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_PageBanner = await PageBanner.findByIdAndUpdate(
          ObjectID(this.req.body.pagebanner_id),
          updateData
        );
        if (update_PageBanner != null) {
          this.res.send({
            status: 1,
            message: "PageBanner updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delPageBanner = await PageBanner.findByIdAndRemove(
          ObjectID(this.req.body.pagebanner_id),
          dData
        );
        console.log(delPageBanner);
        if (delPageBanner != null) {
          this.res.send({
            status: 1,
            message: "PageBanner deleted successfully",
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
        api_name: "update PageBanner api",
        function_name: "UpdatePageBanner()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = PageBannerController;
