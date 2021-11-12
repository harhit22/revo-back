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
        let exist = await App.find({ subAdminId, is_delete: false });
        if (exist.length == 1) {
          this.res.send({
            status: 0,
            message: "app with this subadmin is already exist",
          });
        } else {
          addData["subadmin_id"] = subAdminId;
          let addApp = await new Model(App).store(addData);

          if (addApp != null) {
            this.res.send({ status: 1, message: "app added successfully" });
          }
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
      if (!this.req.body.subadmin_id && !this.req.body.app_id) {
        if (!this.req.body.page || !this.req.body.pagesize) {
          this.res.send({ status: 0, message: "send proper data" });
        } else {
          let page = parseInt(this.req.body.page);
          let pagesize = parseInt(this.req.body.pagesize);
          let skip = (page - 1) * pagesize;
          let sort = { createdAt: 1 };
          let filter = { is_delete: false };
          let app = await new Agreegate(App).getApp(
            skip,
            pagesize,
            sort,
            filter
          );
          console.log(app);
          if (app != null) {
            this.res.send({
              status: 1,
              message: "all app returned successfully",
              data: app,
            });
          }
        }
      } else if (this.req.body.app_id) {
        let appID = ObjectID(this.req.body.app_id);
        let sort = { createdAt: 1 };
        let filter = { _id: appID, is_delete: false };
        let app = await new Agreegate(App).getApp(0, 1, sort, filter);
        console.log(app);
        if (app != null) {
          this.res.send({
            status: 1,
            message: "single app returned successfully",
            data: app,
          });
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

  async DeleteApp() {
    try {
      let app = this.req.body.app_id;
      console.log("delete app body ", this.req.body);
      let deleteApp = await App.findByIdAndUpdate(app, {
        is_delete: true,
      });
      if (deleteApp != null) {
        this.res.send({
          status: 1,
          message: "single App deleted",
        });
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "delete app api",
        function_name: "DeleteApp()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = AppController;
