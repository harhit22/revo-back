const Controller = require("./Controller");
const ObjectId = require("mongodb").ObjectID;
const Subject = require("../models/SubjectsSchema").Subject;
const Globals = require("../../configs/globals");
const Model = require("../models/model");

class SubjectController extends Controller {
  constructor() {
    super();
  }

  async AddSubject() {
    try {
      let data = this.req.body;
      let addSubject = await new Model(Subject).store(data);
      if (addSubject != null) {
        this.res.send({ status: 1, message: "subject added successfully" });
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
        api_name: "add subject api",
        function_name: "AddSubject()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetSubject() {
    try {
      if (!this.req.subject_id) {
        let sub = await Subject.find({ delete_status: false });
        if (sub != null) {
          this.res.send({
            status: 1,
            message: "all subject returned successfully",
            data: sub,
          });
        }
      } else {
        let allSub = await Subject.find({
          _id: this.req.body.subject_id,
          delete_status: false,
        });
        if (allSub != null) {
          this.res.send({
            status: 1,
            message: "single subject returned",
            data: stat,
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get subject api",
        function_name: "GetSUbject()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateSubject() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_subject = await Subject.findByIdAndUpdate(
          this.req.body.subject_id,
          updateData
        );
        if (update_subject != null) {
          this.res.send({
            status: 1,
            message: "subject updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let deleteSubject = await Subject.findByIdAndUpdate(
          this.req.body.subject_id,
          dData
        );
        console.log(deleteSubject);
        if (deleteSubject != null) {
          this.res.send({
            status: 1,
            message: "subject deleted successfully",
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update subject api",
        function_name: "UpdateSubject()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = SubjectController;
