const HomeBlog = require("../models/HomeBlogSchema").HomeBlog;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HomeBlogController extends Controller {
  constructor() {
    super();
  }

  async AddHomeBlog() {
    try {
      let bodyData = this.req.body;
      let addHomeBlog = new Model(HomeBlog).store(bodyData);
      if (addHomeBlog != null) {
        this.res.send({
          status: 1,
          message: "HomeBlog data added successfully",
        });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add Add HomeBlog api",
        function_name: "AddHomeBlog()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetHomeBlog() {
    try {
      let allHomeBlog = await HomeBlog.find({});
      if (allHomeBlog != null) {
        this.res.send({
          status: 1,
          message: "all HomeBlog retuned successfully",
          data: allHomeBlog,
        });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get HomeBlog api",
        function_name: "GetHomeBlog()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateHomeBlog() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        console.log("cono", updateData);
        let update_HomeBlog = await HomeBlog.findByIdAndUpdate(
          ObjectID(this.req.body.homeblog_id),
          updateData
        );
        console.log("jjj", update_HomeBlog);
        if (update_HomeBlog != null) {
          this.res.send({
            status: 1,
            message: "HomeBlog updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delHomeBlog = await HomeBlog.findByIdAndRemove(
          ObjectID(this.req.body.homeblog_id),
          dData
        );
        console.log(delHomeBlog);
        if (delHomeBlog != null) {
          this.res.send({
            status: 1,
            message: "HomeBlog deleted successfully",
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update HomeBlog api",
        function_name: "UpdateHomeBlog()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = HomeBlogController;
