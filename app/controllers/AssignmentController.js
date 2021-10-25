const Globals = require("../../configs/globals");
const Controller = require("./Controller");
const Model = require("../models/model");
const Assignment = require("../models/AssignmentSchema").Assignment;

class AssignmentController extends Controller {
  constructor() {
    super();
  }

  async AddAssignment() {
    try {
      let bodyData = this.req.body;
      let addAssignment = new Model(Assignment).store(bodyData);
      if (addAssignment != null) {
        this.res.send({ status: 1, message: "assignment added successfully" });
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
        api_name: "add assignment api",
        function_name: "AddAssignment()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateAssignment() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_assignment = await Assignment.findByIdAndUpdate(
          this.req.body.assignment_id,
          updateData
        );
        if (update_assignment != null) {
          this.res.send({
            status: 1,
            message: "assignment updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let deleteAssignment = await Assignment.findByIdAndUpdate(
          this.req.body.assignment_id,
          dData
        );
        console.log(deleteAssignment);
        if (deleteAssignment != null) {
          this.res.send({
            status: 1,
            message: "assignment deleted successfully",
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update assignment api",
        function_name: "UpdateAssignment()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = AssignmentController;
