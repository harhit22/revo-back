const Controller = require("../controllers/Controller");
const Paper = require("../models/PaperSchema").Paper;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const ObjectID = require("mongodb").ObjectId;
const Agreegate = require("../models/Aggregations");

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
      if (this.req.body.exam_id) {
        let examID = ObjectID(this.req.body.exam_id);
        let GetPaper = await Paper.find({
          exam_id: ObjectID(examID),
          delete_status: false,
          is_free: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (GetPaper != null) {
          this.res.send({
            status: 1,
            message: "return paper by exam",
            data: GetPaper,
          });
        }
      } else if (this.req.body.paper_id) {
        let singlePaper = await Paper.findOne({
          delete_status: false,
          _id: ObjectID(this.req.body.paper_id),
        });
        console.log("singe paper", singlePaper);
        if (singlePaper != null) {
          this.res.send({
            status: 1,
            message: "return single paper",
            data: singlePaper,
          });
        }
      } else if (this.req.body.is_free) {
        let freePaper = await Paper.find({
          is_free: true,
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (freePaper != null) {
          this.res.send({
            status: 1,
            message: "return free paper",
            data: freePaper,
          });
        }
        console.log(freePaper);
      } else {
        const filter = {
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        };
        let paper = await new Agreegate(Paper).getPaper(filter);
        console.log(paper);
        if (paper != null) {
          this.res.send({
            status: 1,
            message: "all paper returned successfully",
            data: paper,
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
          ObjectID(this.req.body.paper_id),
          updateData
        );
        if (update_paper != null) {
          this.res.send({ status: 1, message: "paper updated successfully" });
        }
      } else {
        let dData = this.req.body;
        let deletPaper = await Paper.findByIdAndUpdate(
          ObjectID(this.req.body.paper_id),
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
