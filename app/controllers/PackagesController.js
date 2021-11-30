const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;
const Package = require("../models/PackagesSchema").Package;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Agreegate = require("../models/Aggregations");

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

  async GetPackage() {
    try {
      if (this.req.body.exam_id) {
        let examID = ObjectID(this.req.body.exam_id);
        let getPackage = await Package.find({
          exam_id: ObjectID(examID),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (getPackage != null) {
          this.res.send({
            status: 1,
            message: "return package by exam",
            data: getPackage,
          });
        }
      } else if (this.req.body.is_free) {
        let freePackage = await Package.find({
          is_free: true,
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (freePackage != null) {
          this.res.send({
            status: 1,
            message: "return free packages",
            data: freePackage,
          });
        }
        console.log(freePackage);
      } else if (this.req.body.packageCat_id) {
        let packageCat = await Package.find({
          package_category: ObjectID(this.req.body.packageCat_id),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (packageCat != null) {
          this.res.send({
            status: 1,
            message: "return package by category",
            data: packageCat,
          });
        }
      } else if (this.req.body.package_id) {
        let packageid = await Package.find({
          _id: ObjectID(this.req.body.package_id),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (packageid != null) {
          this.res.send({
            status: 1,
            message: "single package return",
            data: packageid,
          });
        }
      } else {
        const filter = {
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        };
        let gpackage = await new Agreegate(Package).getPackage(filter);
        console.log(gpackage);
        if (gpackage != null) {
          this.res.send({
            status: 1,
            message: "all packages returned successfully",
            data: gpackage,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server....please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get package api",
        function_name: "GetPackage()",
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
          ObjectID(this.req.body.package_id),
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
          ObjectID(this.req.body.package_id),
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
