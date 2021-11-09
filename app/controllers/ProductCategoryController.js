const Model = require("../models/model");
const globals = require("../../configs/globals");
const ProductCategory =
  require("../models/ProductCategorySchema").ProductCategory;
const Controller = require("./Controller");
const Globals = require("../../configs/globals");

class ProductCategoryController extends Controller {
  constructor() {
    super();
  }

  async AddCat() {
    try {
      let cat = this.req.body;
      let prodCat = await new Model(ProductCategory).store(cat);
      if (prodCat != null) {
        this.res.send({
          status: 1,
          message: " category added successfully",
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
        api_name: "Add category Api",
        function_name: "AddCat()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetCat() {
    try {
      if (!this.req.body.cat_id) {
        let getCat = await ProductCategory.find({
          is_delete: false,
          app_id: this.req.body.app_id,
        });
        this.res.send({
          status: 1,
          message: "all categories returned",
          data: getCat,
        });
      } else {
        let getCatg = await ProductCategory.find({
          _id: this.req.body.cat_id,
          app_id: this.req.body.app_id,
        });
        this.res.send({
          status: 1,
          message: "single category returned",
          data: getCatg,
        });
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get category api",
        function_name: "GetCat()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateCat() {
    try {
      if (!this.req.body.is_delete) {
        let updateCat = this.req.body;
        let upCat = await ProductCategory.findByIdAndUpdate(
          this.req.body.cat_id,
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
        let delCat = await ProductCategory.findByIdAndUpdate(
          this.req.body.cat_id,
          delData
        );
        if (delData != null) {
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
        api_name: "update product category api",
        function_name: "UpdateExam()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = ProductCategoryController;
