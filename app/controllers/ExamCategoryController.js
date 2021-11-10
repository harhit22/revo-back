const Model = require("../models/model");
const globals = require("../../configs/globals");
const ExamCategory = require("../models/ExamCategorySchema").ExamCategory;
const Controller = require("./Controller");
const Globals = require("../../configs/globals");

class ExamCategoryController extends Controller {
  constructor() {
    super();
  }

  async AddExamCat() {
    try {
      let cat = this.req.body;
      let examCat = await new Model(ExamCategory).store(cat);
      if (examCat != null) {
        this.res.send({
          status: 1,
          message: "exam category added successfully ",
          data: examCat,
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
        api_name: "Add exam category Api",
        function_name: "AddExamCat()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetExamCat() {
    try {
      if (!this.req.body.cat_id) {
        let getCat = await ExamCategory.find({
          is_delete: false,
          app_id: this.req.body.app_id,
        });
        this.res.send({
          status: 1,
          message: "all exam categories returned",
          data: getCat,
        });
      } else {
        let getCatg = await ExamCategory.findOne({
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
        api_name: "get exam api",
        function_name: "GetExamCat()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateExamCat() {
    try {
      if (!this.req.body.is_delete) {
        let updateCat = this.req.body;
        let upCat = await ExamCategory.findByIdAndUpdate(
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
        let delCat = await ExamCategory.findByIdAndUpdate(
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
        api_name: "update category api",
        function_name: "UpdateExam()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = ExamCategoryController;
