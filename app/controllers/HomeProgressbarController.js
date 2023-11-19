const HomeProgressbar = require("../models/HomeProgressbarSchema").HomeProgressbar;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HomeProgressbarController extends Controller {
  constructor() {
    super();
  }

  async AddHomeProgressBar() {
    try {
      let bodyData = this.req.body;
      let addHomeProgressbar = new Model(HomeProgressbar).store(bodyData);
      if (addHomeProgressbar != null) {
        this.res.send({
          status: 1,
          message: "HomeProgressbar data added successfully",
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
        api_name: "add HomeProgressbar api",
        function_name: "HomeProgressbar()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetHomeProgressbar() {
    try {
      let allHomeProgressbar = await HomeProgressbar.find({});
      if (allHomeProgressbar != null) {
        this.res.send({
          status: 1,
          message: "all HomeProgressbar retuned successfully",
          data: allHomeProgressbar,
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
        api_name: "get HomeProgressbar api",
        function_name: "getHomeProgressbar()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateHomeProgressbar() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_HomeProgressbar = await HomeProgressbar.findByIdAndUpdate(
          ObjectID(this.req.body.homeprogressbar_id),
          updateData
        );
        if (update_HomeProgressbar != null) {
          this.res.send({
            status: 1,
            message: "HomeProgressbar updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delHomeProgressbar = await HomeProgressbar.findByIdAndRemove(
          ObjectID(this.req.body.homeprogressbar_id),
          dData
        );
        console.log(delHomeProgressbar);
        if (delHomeProgressbar != null) {
          this.res.send({
            status: 1,
            message: "HomeProgressbar deleted successfully",
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
        api_name: "update HomeProgressbar api",
        function_name: "UpdateHomeProgressbar()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports =HomeProgressbarController;