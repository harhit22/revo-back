const Globals = require("../../configs/globals");
const Controller = require("./Controller");
const Model = require("../models/model");
const Content = require("../models/CourseContent").Content;

class CourseContentController extends Controller {
  constructor() {
    super();
  }

  async AddContent() {
    try {
      let bodyData = this.req.body;
      let addContent = new Model(Content).store(bodyData);
      if (addContent != null) {
        this.res.send({
          status: 1,
          message: "course content added successfully",
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
        api_name: "add content api",
        function_name: "AddContent()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateContent() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_content = await Content.findByIdAndUpdate(
          this.req.body.content_id,
          updateData
        );
        if (update_content != null) {
          this.res.send({
            status: 1,
            message: "course content updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let deleteContent = await Content.findByIdAndUpdate(
          this.req.body.content_id,
          dData
        );
        console.log(deleteContent);
        if (deleteContent != null) {
          this.res.send({
            status: 1,
            message: "course content deleted successfully",
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update course content api",
        function_name: "UpdateContent()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = CourseContentController;
