const Exam = require("../models/ExamSchema").Exam;
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectID;
const Controller = require("../controllers/Controller");

class ExamController extends Controller {
  constructor() {
    super();
  }

  async AddExam() {
    try {
      let addData = this.req.body;
      let adData = await new Model(Exam).store(addData);
      if (adData != null) {
        this.res.send({ status: 1, message: "exam added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured...please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add exam api",
        function_name: "AddExam()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
  async GetExam() {
    try {
      if (!this.req.body.category_id) {
        let gExam = await Exam.find({ is_delete: false });
        if (gExam != null) {
          this.res.send({ status: 1, message: "return all exams" });
        }
      } else {
        let catID = ObjectID(this.req.body.category_id);
        let getExam = await Exam.find({
          category_id: ObjectID(catID),
          is_delete: false,
        });
        if (getExam != null) {
          this.res.send({ status: 1, message: "return exam by category" });
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
        api_name: "get exam api",
        function_name: "GetExam()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateExam() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_exam = await Exam.findByIdAndUpdate(
          this.req.body.exam_id,
          updateData
        );
        if (update_exam != null) {
          this.res.send({ status: 1, message: "exam updated successfully" });
        }
      } else {
        let dData = this.req.body;
        let deletexams = await Exam.findByIdAndUpdate(
          this.req.body.exam_id,
          dData
        );
        console.log(deletexams);
        if (deletexams != null) {
          this.res.send({ status: 1, message: "exam deleted successfully" });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update exam api",
        function_name: "UpdateExam()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = ExamController;
