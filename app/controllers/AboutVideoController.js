const AboutVideo = require("../models/AboutVideoSchema").AboutVideo;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class AboutVideoController extends Controller {
  constructor() {
    super();
  }


async AddAboutVideo (){
    try {
        let bodyData = this.req.body;
        let Aboutvideo= new Model(AboutVideo).store(bodyData);
        if (Aboutvideo != null) {
          this.res.send({
            status: 1,
            message: "AboutVideo data added successfully",
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
          api_name: "add Add AboutVideo api",
          function_name: "AboutVideo()",
          error_title: error.name,
          description: error.message,
        };
        globalObj.addErrorLogInDB(dataErrorObj);
      }

}

async GetAboutVideo() {
    try {
      let allAboutvideo = await AboutVideo.find({});
      if (allAboutvideo != null) {
        this.res.send({
          status: 1,
          message: "all AboutVideo retuned successfully",
          data: allAboutvideo,
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
        api_name: "get AboutVideo api",
        function_name: "GetaboutVideo()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }



  async UpdateAboutVideo() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_AboutVideo = await AboutVideo.findByIdAndUpdate(
          ObjectID(this.req.body.aboutvideo_id),
          updateData
        );
        if (update_AboutVideo != null) {
          this.res.send({
            status: 1,
            message: "AboutVideo updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delAboutVideo = await AboutVideo.findByIdAndRemove(
          ObjectID(this.req.body.aboutvideo_id),
          dData
        );
        console.log(delAboutVideo);
        if (delAboutVideo != null) {
          this.res.send({
            status: 1,
            message: "AboutVideo deleted successfully",
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
        api_name: "update AboutVideo api",
        function_name: "UpdateAboutVideo()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }


}


module.exports = AboutVideoController