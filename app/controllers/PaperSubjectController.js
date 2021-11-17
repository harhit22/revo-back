const Controller = require("../controllers/Controller");
const Globals = require("../../configs/globals");
const Subject = require("../models/PaperSubjectSchema").Subject;
const Model = require("../models/model");
const ObjectID = require("mongodb").ObjectId;

class PaperSubjectController extends Controller {
  constructor() {
    super();
  }

  async AddSub() {
    try {
      let sub = this.req.body;
      let addSub = await new Model(Subject).store(sub);
      if (addSub != null) {
        this.res.send({ status: 1, message: "subject is added successfully" });
      }
    } catch (error) {
      this.req.send({
        status: 0,
        message:
          "some error occoured on server...please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add subject api",
        function_name: "AddSub()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetSub() {
    try {
      if (!this.req.body.paper_id) {
        let getSub = await Subject.find({
          is_delete: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (getSub != null) {
          this.res.send({
            status: 1,
            message: "return all paper subjects",
            data: getSub,
          });
        }
      } else {
        let paperID = ObjectID(this.req.body.paper_id);
        let getSubject = await Subject.find({
          paper_id: ObjectID(paperID),
          is_delete: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (getSubject != null) {
          this.res.send({
            status: 1,
            message: "return subject paper by paper ID",
            data: getSubject,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some erro occoured on server...please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get subject api",
        function_name: "GetSub()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateSub() {
    try {
      if (!this.req.body.is_delete) {
        let updateData = this.req.body;
        let UpdateSub = await Subject.findByIdAndUpdate(
          ObjectID(this.req.body.sub_id),
          updateData
        );
        if (UpdateSub != null) {
          this.res.send({ status: 1, message: "subject updated successfully" });
        }
      } else {
        let delSub = await Subject.findByIdAndUpdate(
          ObjectID(this.req.body.sub_id),
          {
            is_delete: true,
          }
        );

        if (delSub != null) {
          this.res.send({ status: 1, message: "subject deleted successfully" });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update subject api",
        function_name: "UpdateSub()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = PaperSubjectController;
