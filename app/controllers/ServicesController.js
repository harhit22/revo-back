const Services = require("../models/ServicesSchema").Services;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class ServicesController extends Controller {
  constructor() {
    super();
  }

  async AddServices() {
    try {
      let bodyData = this.req.body;
      let addServices = new Model(Services).store(bodyData);
      if (addServices != null) {
        this.res.send({
          status: 1,
          message: "Services data added successfully",
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
        api_name: "add Add Services api",
        function_name: "AddServices()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetServices() {
    try {
      if (!this.req.body.services_id) {
        let allServices = await Services.find({});
        if (allServices != null) {
          this.res.send({
            status: 1,
            message: "all Services retuned successfully",
            data: allServices,
          });
        }
      } else {
        let singleService = await Services.findOne({
          _id: ObjectID(this.req.body.services_id),
        });
        if (singleService != null) {
          this.res.send({
            status: 1,
            message: "single Service returned successfully",
            data: singleService,
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
        api_name: "get Services api",
        function_name: "GetServices()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateServices() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_Services = await Services.findByIdAndUpdate(
          ObjectID(this.req.body.services_id),
          updateData
        );
        if (update_Services != null) {
          this.res.send({
            status: 1,
            message: "Services updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delServices = await Services.findByIdAndRemove(
          ObjectID(this.req.body.services_id),
          dData
        );
        console.log(delServices);
        if (delServices != null) {
          this.res.send({
            status: 1,
            message: "Services deleted successfully",
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
        api_name: "update Services api",
        function_name: "UpdateServices()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = ServicesController;
