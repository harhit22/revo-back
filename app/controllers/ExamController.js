const Exam = require("../models/ExamSchema").Exam;
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectId;
const Controller = require("../controllers/Controller");
const Agreegate = require("../models/Aggregations");

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
      if (!this.req.body.category_id && !this.req.body.exam_id) {
        const filter = {
          is_delete: false,
          app_id: ObjectID(this.req.body.app_id),
        };
        let exam = await new Agreegate(Exam).getExam(filter);
        console.log(exam);
        if (exam != null) {
          this.res.send({
            status: 1,
            message: "all exam returned successfully",
            data: exam,
          });
        }
      } else if (this.req.body.exam_id) {
        let examID = ObjectID(this.req.body.exam_id);
        let getExam = await Exam.findOne({
          _id: ObjectID(examID),
          is_delete: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        console.log("this is", getExam);
        if (getExam != null) {
          this.res.send({
            status: 1,
            message: "return single exam",
            data: getExam,
          });
        }
      } else {
        let catID = ObjectID(this.req.body.category_id);
        let getExam = await Exam.find({
          category_id: ObjectID(catID),
          is_delete: false,
          app_id: ObjectID(this.req.body.app_id),
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
          ObjectID(this.req.body.exam_id),
          updateData
        );
        if (update_exam != null) {
          this.res.send({
            status: 1,
            message: "exam updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delExam = await Exam.findByIdAndUpdate(
          ObjectID(this.req.body.exam_id),
          dData
        );
        console.log(delExam);
        if (delExam != null) {
          this.res.send({
            status: 1,
            message: "exam deleted successfully",
          });
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
