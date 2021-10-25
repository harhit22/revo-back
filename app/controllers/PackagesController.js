const Controller = require("./Controller");
const ObjectId = require("mongodb").ObjectID;
const Package = require("../models/PackagesSchema").Package;
const Globals = require("../../configs/globals");
const Model = require("../models/model");

class PackageController extends Controller {
  constructor() {
    super();
  }

  async AddPackage() {
    try {
      let data = this.req.body;
      let addPackage = await new Model(Package).store(data);
      if (addPackage != null) {
        this.res.send({ status: 1, message: "packages added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server...please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add package api",
        function_name: "AddPackage()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdatePackage() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_package = await Package.findByIdAndUpdate(
          this.req.body.package_id,
          updateData
        );
        if (update_package != null) {
          this.res.send({
            status: 1,
            message: "packages updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let deletePackage = await Package.findByIdAndUpdate(
          this.req.body.package_id,
          dData
        );
        console.log(deletePackage);
        if (deletePackage != null) {
          this.res.send({
            status: 1,
            message: "package deleted successfully",
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update package api",
        function_name: "UpdatePackage()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = PackageController;
