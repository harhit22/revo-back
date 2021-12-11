const Globals = require("../../configs/globals");
const Controller = require("../controllers/Controller");
const Model = require("../models/model");
const PackSub = require("../models/PackageSubjectSchema").PackSub;
const ObjectID = require("mongodb").ObjectId;
const Agreegate = require("../models/Aggregations");
const Lesson = require("../models/LessonSchema").Lesson;
const VideoCourses = require("../models/VideoCoursesSchema").VideoCourses;

class ByIdController extends Controller {
  constructor() {
    super();
  }
  async GetSubjectByPackage() {
    try {
      let filter = {
        package_id: ObjectID(this.req.body.package_id),
        app_id: ObjectID(this.req.body.app_id),
      };
      let packageData = await new Agreegate(PackSub).getSubjectbyPackage(
        filter
      );
      if (packageData != null) {
        this.res.send({
          status: 1,
          message: "subject with package id returned successfully",
          data: packageData,
        });
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occured..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: " Byid api",
        function_name: "GetSubjectByPackage()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetLessonBySubject() {
    try {
      let filter = {
        subject_id: ObjectID(this.req.body.subject_id),
        package_id: ObjectID(this.req.body.package_id),
        app_id: ObjectID(this.req.body.app_id),
      };

      let subjectData = await Lesson.find(filter);
      if (subjectData != null) {
        if (subjectData.length != 0) {
          subjectData.forEach(async (element, index) => {
            let totalVideos = await VideoCourses.find({
              lesson_id: element._id,
            }).count();
            console.log("total videoes", totalVideos);

            subjectData["total_videoes"] = totalVideos;
            console.log(subjectData);
            if (index == subjectData.length - 1) {
              this.res.send({
                status: 1,
                message: "lesson successfully successfully",
                data: subjectData,
              });
            }
          });
        } else {
          this.res.send({
            status: 1,
            message: "no courses found",
            data: [],
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occured..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "Byid api",
        function_name: "GetLessonBySubject()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetVideoesByLesson() {
    try {
      let filter = {
        lesson_id: ObjectID(this.req.body.lesson_id),
        package_id: ObjectID(this.req.body.package_id),
        app_id: ObjectID(this.req.body.app_id),
      };
      let lessonData = await VideoCourses.find(filter);
      if (lessonData != null) {
        this.res.send({
          status: 1,
          message: "videoes with lesson id returned successfully",
          data: lessonData,
        });
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occured..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "Byid api",
        function_name: "GetVideoesByLesson()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = ByIdController;
