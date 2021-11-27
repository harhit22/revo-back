const Model = require("../models/model");
const globals = require("../../configs/globals");
const PackageCategory = require("../models/PackageCategory").PackageCategory;
const Controller = require("./Controller");
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectId;

class PackageCategoryController extends Controller {
  constructor() {
    super();
  }

  async AddPackageCat() {
    try {
      let cat = this.req.body;
      let packCat = await new Model(PackageCategory).store(cat);
      if (packCat != null) {
        this.res.send({
          status: 1,
          message: "package category added successfully ",
          data: packCat,
        });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "Add package category Api",
        function_name: "AddPackageCat()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetPackageCat() {
    try {
      let getCat = await PackageCategory.find({
        is_delete: false,
        app_id: ObjectID(this.req.body.app_id),
      });
      if (getCat != null) {
        this.res.send({
          status: 1,
          message: "all package categories returned",
          data: getCat,
        });
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get package category api",
        function_name: "GetPackageCat()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdatePackageCat() {
    try {
      if (!this.req.body.is_delete) {
        let updateCat = this.req.body;
        let upCat = await PackageCategory.findByIdAndUpdate(
          ObjectID(this.req.body.cat_id),
          updateCat
        );
        if (upCat != null) {
          this.res.send({
            status: 1,
            message: "category updated successfully",
          });
        }
      } else {
        let delData = this.req.body;
        let delCat = await PackageCategory.findByIdAndUpdate(
          ObjectID(this.req.body.cat_id),
          delData
        );
        if (delCat != null) {
          this.res.send({ status: 1, message: "category delete successfully" });
        }
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
        api_name: "update category api",
        function_name: "UpdateExam()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = PackageCategoryController;
