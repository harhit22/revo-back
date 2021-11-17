const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;
const Previous = require("../models/PreviousYearPaperSchema").Previous;
const Globals = require("../../configs/globals");
const Model = require("../models/model");

class PreviousYearController extends Controller {
  constructor() {
    super();
  }

  async AddPreviousYear() {
    try {
      let data = this.req.body;
      let addPaper = await new Model(Previous).store(data);
      if (addPaper != null) {
        this.res.send({
          status: 1,
          message: "previous year paper added successfully",
        });
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
        api_name: "add previous year api",
        function_name: "AddPreviousYear()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdatePreviousYear() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_previous = await Previous.findByIdAndUpdate(
          ObjectID(this.req.body.previous_id),
          updateData
        );
        if (update_previous != null) {
          this.res.send({
            status: 1,
            message: "previous year paper  updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let deletePrevious = await Previous.findByIdAndUpdate(
          ObjectID(this.req.body.previous_id),
          dData
        );
        console.log(deletePrevious);
        if (deletePrevious != null) {
          this.res.send({
            status: 1,
            message: "previous year paper deleted successfully",
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update previous year paper api",
        function_name: "UpdatePreviousYear()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = PreviousYearController;
