const HomeTrustedClient =
  require("../models/HomeTrustedClient").HomeTrustedClient;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HomeTrustedClientController extends Controller {
  constructor() {
    super();
  }

  async AddHomeTrustedClient() {
    try {
      let bodyData = this.req.body;
      let addHomeTrustedClient = new Model(HomeTrustedClient).store(bodyData);
      if (addHomeTrustedClient != null) {
        this.res.send({
          status: 1,
          message: "Home Client data added successfully",
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
        api_name: "add Client api",
        function_name: "AddHomeTrustedClient()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetHomeTrustedClient() {
    try {
      let allHomeTrustedClient = await HomeTrustedClient.find({});
      if (allHomeTrustedClient != null) {
        this.res.send({
          status: 1,
          message: "all HomeTrustedClient retuned successfully",
          data: allHomeTrustedClient,
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
        api_name: "get HomeTrustedClient api",
        function_name: "getHomeTrustedClient()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateHomeTrustedClient() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_HomeTrustedClient =
          await HomeTrustedClient.findByIdAndUpdate(
            ObjectID(this.req.body.hometrustedclient_id),
            updateData
          );
        if (update_HomeTrustedClient != null) {
          this.res.send({
            status: 1,
            message: "HomeTrustedClient updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delHomeTrustedClient = await HomeTrustedClient.findByIdAndRemove(
          ObjectID(this.req.body.hometrustedclient_id),
          dData
        );
        console.log(delHomeTrustedClient);
        if (delHomeTrustedClient != null) {
          this.res.send({
            status: 1,
            message: "HomeTrustedClient deleted successfully",
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
        api_name: "update HomeTrustedClient api",
        function_name: "UpdateHomeTrustedClient()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = HomeTrustedClientController;
