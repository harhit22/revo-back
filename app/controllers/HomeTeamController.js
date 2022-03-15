const HomeTeam = require("../models/HomeTeamSchema").HomeTeam;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HomeTeamController extends Controller {
  constructor() {
    super();
  }

  async AddHomeTeam() {
    try {
      let bodyData = this.req.body;
      let addHomeTeam = new Model(HomeTeam).store(bodyData);
      if (addHomeTeam != null) {
        this.res.send({
          status: 1,
          message: "Home Team data added successfully",
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
        api_name: "add Team api",
        function_name: "AddHomeTeam()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetHomeTeam() {
    try {
      let allHomeTeam = await HomeTeam.find({});
      if (allHomeTeam != null) {
        this.res.send({
          status: 1,
          message: "all HomeTeam retuned successfully",
          data: allHomeTeam,
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
        api_name: "get HomeTeam api",
        function_name: "getHomeTeam()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateHomeTeam() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_HomeTeam = await HomeTeam.findByIdAndUpdate(
          ObjectID(this.req.body.hometeam_id),
          updateData
        );
        if (update_HomeTeam != null) {
          this.res.send({
            status: 1,
            message: "HomeTeam updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delHomeTeam = await HomeTeam.findByIdAndRemove(
          ObjectID(this.req.body.hometeam_id),
          dData
        );
        console.log(delHomeTeam);
        if (delHomeTeam != null) {
          this.res.send({
            status: 1,
            message: "HomeTeam deleted successfully",
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
        api_name: "update HomeTeam api",
        function_name: "UpdateHomeTeam()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = HomeTeamController;
