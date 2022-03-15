const HomeClient = require("../models/HomeClientSchema").HomeClient;
const ClientCrousal = require("../models/HomeClientSchema").ClientCrousal;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HomeClientController extends Controller {
  constructor() {
    super();
  }

  async AddHomeClient() {
    try {
      let bodyData = this.req.body;
      let addHomeClient = new Model(HomeClient).store(bodyData);
      if (addHomeClient != null) {
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
        function_name: "AddHomeClient()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetHomeClient() {
    try {
      let allHomeClient = await HomeClient.find({});
      if (allHomeClient != null) {
        this.res.send({
          status: 1,
          message: "all HomeClient retuned successfully",
          data: allHomeClient,
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
        api_name: "get HomeClient api",
        function_name: "getHomeClient()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateHomeClient() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_HomeClient = await HomeClient.findByIdAndUpdate(
          ObjectID(this.req.body.homeclient_id),
          updateData
        );
        if (update_HomeClient != null) {
          this.res.send({
            status: 1,
            message: "HomeClient updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delHomeClient = await HomeClient.findByIdAndRemove(
          ObjectID(this.req.body.homeclient_id),
          dData
        );
        console.log(delHomeClient);
        if (delHomeClient != null) {
          this.res.send({
            status: 1,
            message: "HomeClient deleted successfully",
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
        api_name: "update HomeClient api",
        function_name: "UpdateHomeClient()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async AddClientCrousal() {
    try {
      let bodyData = this.req.body;
      let addClientCrousal = new Model(ClientCrousal).store(bodyData);
      if (addClientCrousal != null) {
        this.res.send({
          status: 1,
          message: " ClienCrousalt data added successfully",
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
        function_name: "AddClientCrousal()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetClientCrousal() {
    try {
      let allClientCrousal = await ClientCrousal.find({});
      if (allClientCrousal != null) {
        this.res.send({
          status: 1,
          message: "all ClientCrousal retuned successfully",
          data: allClientCrousal,
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
        api_name: "get ClientCrousal api",
        function_name: "getClientCrousal()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateClientCrousal() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_ClientCrousal = await ClientCrousal.findByIdAndUpdate(
          ObjectID(this.req.body.clientcrousal_id),
          updateData
        );
        if (update_ClientCrousal != null) {
          this.res.send({
            status: 1,
            message: "ClientCrousal updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delClientCrousal = await ClientCrousal.findByIdAndRemove(
          ObjectID(this.req.body.clientcrousal_id),
          dData
        );
        console.log(delClientCrousal);
        if (delClientCrousal != null) {
          this.res.send({
            status: 1,
            message: "ClientCrousal deleted successfully",
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
        api_name: "update ClientCrousal api",
        function_name: "UpdateClientCrousal()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = HomeClientController;
