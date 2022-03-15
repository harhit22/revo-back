const HomeExperience = require("../models/HomeExperienceSchema").HomeExperience;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HomeExperienceController extends Controller {
  constructor() {
    super();
  }

  async AddHomeExperience() {
    try {
      let bodyData = this.req.body;
      let addHomeExperience = new Model(HomeExperience).store(bodyData);
      if (addHomeExperience != null) {
        this.res.send({
          status: 1,
          message: "Home Experience data added successfully",
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
        api_name: "add HomeExperience api",
        function_name: "AddHomeExperiences()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetHomeExperience() {
    try {
      let allHomeExperience = await HomeExperience.find({});
      if (allHomeExperience != null) {
        this.res.send({
          status: 1,
          message: "all Home Experience retuned successfully",
          data: allHomeExperience,
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
        api_name: "get Home Experience api",
        function_name: "getHomeExperience()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateHomeExperience() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_HomeExperience = await HomeExperience.findByIdAndUpdate(
          ObjectID(this.req.body.homeexperience_id),
          updateData
        );
        if (update_HomeExperience != null) {
          this.res.send({
            status: 1,
            message: " HomeExperience updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delHomeExperience = await HomeExperience.findByIdAndRemove(
          ObjectID(this.req.body.homeexperience_id),
          dData
        );
        console.log(delHomeExperience);
        if (delHomeExperience != null) {
          this.res.send({
            status: 1,
            message: "HomeExperience deleted successfully",
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
        api_name: "update HomeExperience api",
        function_name: "UpdateHomeExperience()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = HomeExperienceController;
