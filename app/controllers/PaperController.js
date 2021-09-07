const Paper = require("../models/PaperSchema").Paper;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const ObjectID = require("mongodb").ObjectId;

class PaperControlller extends Controller {
  constructor() {
    super();
  }

  async AddPaper() {
    try {
      let data = this.req.body;
      let addPaper = await new Model(Paper).store(data);
      if (addPaper != null) {
        this.res.send({ status: 1, message: "papers added successfully" });
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
        api_name: "add paper api",
        function_name: "AddPaper()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetPaper() {
    try {
      if (!this.req.body.exam_id) {
        let gPaper = await Paper.find({ delete_status: false });
        if (gPaper != null) {
          this.res.send({ status: 1, message: "return all papers" });
        }
      } else if (this.req.body.is_free) {
        let freePaper = await Paper.find({
          is_free: true,
          delete_status: false,
        });
      } else {
        let examID = ObjectID(this.req.body.exam_id);
        let GetPaper = await Paper.find({
          exam_id: ObjectID(examID),
          delete_status: false,
          is_free: false,
        });
        if (GetPaper != null) {
          this.res.send({ status: 1, message: "return paper by exam" });
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
        api_name: "get paper api",
        function_name: "GetPaper()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdatePaper() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_paper = await Paper.findByIdAndUpdate(
          this.req.body.paper_id,
          updateData
        );
        if (update_paper != null) {
          this.res.send({ status: 1, message: "paper updated successfully" });
        }
      } else {
        let dData = this.req.body;
        let deletPaper = await Paper.findByIdAndUpdate(
          this.req.body.paper_id,
          dData
        );
        console.log(deletPaper);
        if (deletPaper != null) {
          this.res.send({ status: 1, message: "paper deleted successfully" });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update paper api",
        function_name: "UpdatePpaper()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = PaperControlller;
