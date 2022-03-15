const HomePortfolio = require("../models/HomePortfolioSchema").HomePortfolio;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HomePortfolioController extends Controller {
  constructor() {
    super();
  }

  async AddHomePortfolio() {
    try {
      let bodyData = this.req.body;
      let addHomePortfolio = new Model(HomePortfolio).store(bodyData);
      if (addHomePortfolio != null) {
        this.res.send({
          status: 1,
          message: "Home Portfolio data added successfully",
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
        api_name: "add Portfolio api",
        function_name: "AddHomePortfolio()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetHomePortfolio() {
    try {
      let allHomePortfolio = await HomePortfolio.find({});
      if (allHomePortfolio != null) {
        this.res.send({
          status: 1,
          message: "all HomePortfolio retuned successfully",
          data: allHomePortfolio,
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
        api_name: "get HomePortfolio api",
        function_name: "getHomePortfolio()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateHomePortfolio() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_HomePortfolio = await HomePortfolio.findByIdAndUpdate(
          ObjectID(this.req.body.homeportfolio_id),
          updateData
        );
        if (update_HomePortfolio != null) {
          this.res.send({
            status: 1,
            message: "HomePortfolio updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delHomePortfolio = await HomePortfolio.findByIdAndRemove(
          ObjectID(this.req.body.homeportfolio_id),
          dData
        );
        console.log(delHomePortfolio);
        if (delHomePortfolio != null) {
          this.res.send({
            status: 1,
            message: "HomePortfolio deleted successfully",
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
        api_name: "update HomePortfolio api",
        function_name: "UpdateHomePortfolio()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = HomePortfolioController;
