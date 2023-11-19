const AnyProject = require("../models/AnyProjectSchema").AnyProject;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class AnyProjectController extends Controller {
  constructor() {
    super();
  }

  async AddAnyProject() {
    try {
      let bodyData = this.req.body;
      console.log("bodyData", bodyData);
      let addAnyProject = new Model(AnyProject).store(bodyData);
      if (addAnyProject != null) {
        this.res.send({
          status: 1,
          message: "AnyProject data added successfully",
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
        api_name: "add Add AnyProject api",
        function_name: "AnyProject()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetAnyProject() {
    try {
      let allAnyProject = await AnyProject.find({});
      if (allAnyProject != null) {
        this.res.send({
          status: 1,
          message: "all AnyProject retuned successfully",
          data: allAnyProject,
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
        api_name: "get AnyProject api",
        function_name: "GetAnyProject()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateAnyProject() {
    try {
      if (!this.req.body.delete_status) {
        console.log("in update");
        let updateData = this.req.body;
        let update_AnyProject = await AnyProject.findByIdAndUpdate(
          ObjectID(this.req.body.testimonial_id),
          updateData
        );
        if (update_AnyProject != null) {
          this.res.send({
            status: 1,
            message: "AnyProject updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delAnyProject = await AnyProject.findByIdAndRemove(
          ObjectID(this.req.body.AnyProject_id),
          dData
        );
        console.log(delAnyProject);
        if (delAnyProject != null) {
          this.res.send({
            status: 1,
            message: "AnyProject deleted successfully",
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
        api_name: "update AnyProject api",
        function_name: "UpdateAnyProject()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = AnyProjectController;
