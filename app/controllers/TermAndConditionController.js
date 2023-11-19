const TermAndCondition = require("../models/TermAndConditionSchema").TermAndCondition;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class TermAndConditionController extends Controller {
  constructor() {
    super();
  }

  async AddTermCondition() {
    try {
      let bodyData = this.req.body;
      let addTermCondition = new Model(TermAndCondition).store(bodyData);
      if (addTermCondition != null) {
        this.res.send({
          status: 1,
          message: " TermAndCondition data added successfully",
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
        api_name: "add Add TermAndCondition api",
        function_name: "AddTermAndCondition()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetTermAndCondition() {
    try {
      if (!this.req.body.services_id) {
        let allTermAndCondition = await TermAndCondition.find({});
        if (allTermAndCondition != null) {
          this.res.send({
            status: 1,
            message: "all TermAndCondition retuned successfully",
            data: allTermAndCondition,
          });
        }
      } else {
        console.log("why not here");
        let singleTermAndCondition = await TermAndCondition.findOne({
          _id: ObjectID(this.req.body.termandcondition_id),
        });
        if (singleTermAndCondition != null) {
          this.res.send({
            status: 1,
            message: "single TermAndCondition returned successfully",
            data: singleTermAndCondition,
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get TermAndCondition api",
        function_name: "GetTermAndCondition()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateTermAndCondition() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_TermAndCondition = await TermAndCondition.findByIdAndUpdate(
          ObjectID(this.req.body.termandcondition_id),
          updateData
        );
        if (update_TermAndCondition != null) {
          this.res.send({
            status: 1,
            message: "TermAndCondition updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delTermAndCondition = await TermAndCondition.findByIdAndRemove(
          ObjectID(this.req.body.termandcondition_id),
          dData
        );
        console.log(delTermAndCondition);
        if (delTermAndCondition != null) {
          this.res.send({
            status: 1,
            message: "TermAndCondition deleted successfully",
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });

      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update TermAndCondition api",
        function_name: "UpdateTermAndCondition()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = TermAndConditionController;
