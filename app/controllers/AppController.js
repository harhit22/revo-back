const App = require("../models/AppSchema").App;
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectID;
const Controller = require("../controllers/Controller");
const SubAdmin = require("../models/SubAdminSchema").SubAdmin;
const Agreegate = require("../models/Aggregations");

class AppController extends Controller {
  constructor() {
    super();
  }

  async AddApp() {
    try {
      let addData = this.req.body;
      let subAdminEmail = addData.email;
      let findSubAdminId = await SubAdmin.findOne({
        email: subAdminEmail,
        is_delete: false,
      });
      console.log(findSubAdminId);
      if (findSubAdminId) {
        let subAdminId = findSubAdminId.id;
        addData["subadmin_id"] = subAdminId;
        let addApp = await new Model(App).store(addData);

        if (addApp != null) {
          this.res.send({ status: 1, message: "app added successfully" });
        }
      } else {
        this.res.send({
          status: 0,
          message: "no subadmin existd by this email",
        });
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
        api_name: "add app api",
        function_name: "AddApp()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
  async GetApp() {
    try {
      if (!this.req.body.subadmin_id) {
        let sort = { createdAt: 1 };
        let app = await new Agreegate(App).getApp(sort);
        console.log(app);
        if (app != null) {
          this.res.send({
            status: 1,
            message: "all app returned successfully",
            data: app,
          });
        }
      } else {
        let appID = ObjectID(this.req.body.subadmin_id);
        let getApp = await App.find({
          category_id: ObjectID(catID),
          is_delete: false,
          app_id: this.req.body.app_id,
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

module.exports = AppController;
