const Aboutaboutsection = require("../models/AboutaboutusSection").Aboutaboutsection;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class AboutaboutsctionsController extends Controller {
  constructor() {
    super();
  }


async Aboutaboutsections (){
    try {
        let bodyData = this.req.body;
        let Aboutaboutsections= new Model(Aboutaboutsection).store(bodyData);
        if (Aboutaboutsections != null) {
          this.res.send({
            status: 1,
            message: "AboutaboutSection data added successfully",
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
          api_name: "add Add AboutaboutSection api",
          function_name: "AboutaboutSection()",
          error_title: error.name,
          description: error.message,
        };
        globalObj.addErrorLogInDB(dataErrorObj);
      }

}

async GetAboutaboutSection() {
    try {
      let allAboutaboutSection = await Aboutaboutsection.find({});
      if (allAboutaboutSection != null) {
        this.res.send({
          status: 1,
          message: "all AboutaboutSection retuned successfully",
          data: allAboutaboutSection,
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
        api_name: "get Aboutaboutsection api",
        function_name: "Getaboutsection()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }



  async UpdateAboutaboutSection() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_AboutaboutSection = await Aboutaboutsection.findByIdAndUpdate(
          ObjectID(this.req.body.aboutaboutsection_id),
          updateData
        );
        if (update_AboutaboutSection != null) {
          this.res.send({
            status: 1,
            message: "Aboutaboutsection updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delAboutaboutsection = await Aboutaboutsection.findByIdAndRemove(
          ObjectID(this.req.body.aboutaboutsection_id),
          dData
        );
        console.log(delAboutaboutsection);
        if (delAboutaboutsection != null) {
          this.res.send({
            status: 1,
            message: "AboutaboutSection deleted successfully",
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
        api_name: "update AboutaboutSection api",
        function_name: "UpdateAboutaboutSection()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }


}


module.exports = AboutaboutsctionsController