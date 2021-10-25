const Controller = require("./Controller");
const ObjectId = require("mongodb").ObjectID;
const Lesson = require("../models/LessonSchema").Lesson;
const Globals = require("../../configs/globals");
const Model = require("../models/model");

class LessonController extends Controller {
  constructor() {
    super();
  }

  async AddLesson() {
    try {
      let data = this.req.body;
      let addlesson = await new Model(Lesson).store(data);
      if (addlesson != null) {
        this.res.send({ status: 1, message: "lesson added successfully" });
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
        api_name: "add lesson api",
        function_name: "AddLesson()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateLesson() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_lesson = await Lesson.findByIdAndUpdate(
          this.req.body.lesson_id,
          updateData
        );
        if (update_lesson != null) {
          this.res.send({
            status: 1,
            message: "lesson updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let deleteLesson = await Lesson.findByIdAndUpdate(
          this.req.body.lesson_id,
          dData
        );
        console.log(deleteLesson);
        if (deleteLesson != null) {
          this.res.send({
            status: 1,
            message: "lesson deleted successfully",
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update lesson api",
        function_name: "UpdateLesson()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = LessonController;
