const HomeAbout = require("../models/HomeAboutSchema").HomeAbout;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HomeAboutController extends Controller {
  constructor() {
    super();
  }

  async AddHomeAbout() {
    try {
      let bodyData = this.req.body;
      let addHomeAbout = new Model(HomeAbout).store(bodyData);
      if (addHomeAbout != null) {
        this.res.send({
          status: 1,
          message: "Home About data added successfully",
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
        api_name: "add AddHome About api",
        function_name: "AddHomeAbout()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetHomeAbout() {
    try {
      let allHomeAbout = await HomeAbout.find({});
      if (allHomeAbout != null) {
        this.res.send({
          status: 1,
          message: "all HomeAbout retuned successfully",
          data: allHomeAbout,
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
        api_name: "get HomeAbout api",
        function_name: "GetHomeAbout()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateHomeAbout() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_HomeAbout = await HomeAbout.findByIdAndUpdate(
          ObjectID(this.req.body.homeabout_id),
          updateData
        );
        if (update_HomeAbout != null) {
          this.res.send({
            status: 1,
            message: "HomeAbout updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delHomeAbout = await HomeAbout.findByIdAndRemove(
          ObjectID(this.req.body.homeabout_id),
          dData
        );
        console.log(delHomeAbout);
        if (delHomeAbout != null) {
          this.res.send({
            status: 1,
            message: "HomeAbout deleted successfully",
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
        api_name: "update HomeAbout api",
        function_name: "UpdateHomeAbout()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = HomeAboutController;
