const PrivacyPollices = require("../models/PrivacyPollicesScherma").PrivacyPollice;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class PrivacyPolliceController extends Controller {
  constructor() {
    super();
  }

  async AddPrivacyPollice() {
    try {
      let bodyData = this.req.body;
      let addprivacy = new Model(PrivacyPollices).store(bodyData);
      if (addprivacy != null) {
        this.res.send({
          status: 1,
          message: "Privacy data added successfully",
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
        api_name: "add Add Privacy api",
        function_name: "AddPrivacyPollice()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetPrivacyPollice() {
    try {
      let allPrivacy = await PrivacyPollices.find({});
      if (allPrivacy != null) {
        this.res.send({
          status: 1,
          message: "all Privacy Pollices retuned successfully",
          data: allPrivacy,
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
        api_name: "get PrivacyPollices api",
        function_name: "GetPrivacyPollice()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdatePrivatePollice() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_Privacy = await PrivacyPollices.findByIdAndUpdate(
          ObjectID(this.req.body.privacy_id),
          updateData
        );
        if (update_Privacy != null) {
          this.res.send({
            status: 1,
            message: "Privacy Pollice updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delPrivacy = await PrivacyPollices.findByIdAndRemove(
          ObjectID(this.req.body.privacy_id),
          dData
        );
        console.log(delPrivacy);
        if (delPrivacy != null) {
          this.res.send({
            status: 1,
            message: "Privacy Pollices deleted successfully",
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
        api_name: "update Privacy api",
        function_name: "UpdatePrivacyPollice()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = PrivacyPolliceController;