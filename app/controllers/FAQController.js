const FAQ = require("../models/FAQSchema").FAQ;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class FAQController extends Controller {
  constructor() {
    super();
  }

  async AddFAQ() {
    try {
      let bodyData = this.req.body;
      let addFAQ = new Model(FAQ).store(bodyData);
      if (addFAQ != null) {
        this.res.send({
          status: 1,
          message: "FAQ data added successfully",
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
        api_name: "add Add FAQ api",
        function_name: "AddFAQ()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetFAQ() {
    try {
      let allFAQ = await FAQ.find({});
      if (allFAQ != null) {
        this.res.send({
          status: 1,
          message: "all Funfact retuned successfully",
          data: allFAQ,
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
        api_name: "get FAQ api",
        function_name: "GetFAQ()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateFAQ() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_FAQ = await FAQ.findByIdAndUpdate(
          ObjectID(this.req.body.funfact_id),
          updateData
        );
        if (update_FAQ != null) {
          this.res.send({
            status: 1,
            message: "FAQ updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delFAQ = await FAQ.findByIdAndRemove(
          ObjectID(this.req.body.FAQ_id),
          dData
        );
        console.log(delFAQ);
        if (delFAQ != null) {
          this.res.send({
            status: 1,
            message: "FAQ deleted successfully",
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
        api_name: "update FAQ api",
        function_name: "UpdateFAQ()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = FAQController;
