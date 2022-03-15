const TeamList = require("../models/TeamListSchema").TeamList;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class TeamListController extends Controller {
  constructor() {
    super();
  }

  async AddTeamList() {
    try {
      let bodyData = this.req.body;
      let addTeamList = new Model(TeamList).store(bodyData);
      if (addTeamList != null) {
        this.res.send({
          status: 1,
          message: "TeamList data added successfully",
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
        api_name: "add Add TeamList api",
        function_name: "AddTeamList()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetTeamList() {
    try {
      let allTeamList = await TeamList.find({});
      if (allTeamList != null) {
        this.res.send({
          status: 1,
          message: "all TeamList retuned successfully",
          data: allTeamList,
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
        api_name: "get TeamList api",
        function_name: "GetTeamList()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateTeamList() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_TeamList = await TeamList.findByIdAndUpdate(
          ObjectID(this.req.body.teamlist_id),
          updateData
        );
        if (update_TeamList != null) {
          this.res.send({
            status: 1,
            message: "TeamList updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delTeamList = await TeamList.findByIdAndRemove(
          ObjectID(this.req.body.teamlist_id),
          dData
        );
        console.log(delTeamList);
        if (delTeamList != null) {
          this.res.send({
            status: 1,
            message: "TeamList deleted successfully",
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
        api_name: "update TeamList api",
        function_name: "UpdateTeamList()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = TeamListController;
