const Footer = require("../models/FooterSchema").Footer;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class FooterController extends Controller {
  constructor() {
    super();
  }

  async AddFooter() {
    try {
      let bodyData = this.req.body;
      let addFooter = new Model(Footer).store(bodyData);
      if (addFooter != null) {
        this.res.send({
          status: 1,
          message: "Footer data added successfully",
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
        api_name: " Add Footer api",
        function_name: "AddFooter()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetFooter() {
    try {
      let allFooter = await Footer.find({});
      if (allFooter != null) {
        this.res.send({
          status: 1,
          message: "all Footer retuned successfully",
          data: allFooter,
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
        api_name: "get Footer api",
        function_name: "GetFooter()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateFooter() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_Footer = await Footer.findByIdAndUpdate(
          ObjectID(this.req.body.footer_id),
          updateData
        );
        if (update_Footer != null) {
          this.res.send({
            status: 1,
            message: "Footer updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delFooter = await Footer.findByIdAndRemove(
          ObjectID(this.req.body.footer_id),
          dData
        );
        console.log(delFooter);
        if (delFooter != null) {
          this.res.send({
            status: 1,
            message: "Footer deleted successfully",
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
        api_name: "update Footer api",
        function_name: "UpdateFooter()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = FooterController;
