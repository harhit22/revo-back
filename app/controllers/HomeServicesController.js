const HomeServices = require("../models/HomeServices").HomeServices;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HomeServicesController extends Controller {
  constructor() {
    super();
  }

  async AddHomeServices() {
    try {
      let bodyData = this.req.body;
      let addHomeServices = new Model(HomeServices).store(bodyData);
      if (addHomeServices != null) {
        this.res.send({
          status: 1,
          message: "Home services data added successfully",
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
        api_name: "add AddHomeServices api",
        function_name: "AddHomeServices()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetHomeServices() {
    try {
      let allHomeServices = await HomeServices.find({});
      if (allHomeServices != null) {
        this.res.send({
          status: 1,
          message: "all HomeServices retuned successfully",
          data: allHomeServices,
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
        api_name: "get HomeServices api",
        function_name: "getHomeServices()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateHomeServices() {
    try {
      console.log("update service");
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_HomeServices = await HomeServices.findByIdAndUpdate(
          ObjectID(this.req.body.homeservices_id),
          updateData
        );
        if (update_HomeServices != null) {
          this.res.send({
            status: 1,
            message: "HomeServices updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delHomeServices = await HomeServices.findByIdAndRemove(
          ObjectID(this.req.body.homeservices_id),
          dData
        );
        console.log(delHomeServices);
        if (delHomeServices != null) {
          this.res.send({
            status: 1,
            message: "HomeServices deleted successfully",
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
        api_name: "update HomeServices api",
        function_name: "UpdateHomeServices()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = HomeServicesController;
