const Portfolio = require("../models/PortfolioSchema").Portfolio;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class PortfolioController extends Controller {
  constructor() {
    super();
  }

  async AddPortfolio() {
    try {
      let bodyData = this.req.body;
      let addPortfolio = new Model(Portfolio).store(bodyData);
      if (addPortfolio != null) {
        this.res.send({
          status: 1,
          message: "Portfolio data added successfully",
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
        api_name: "add Add Portfolio api",
        function_name: "AddPortfolio()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetPortfolio() {
    try {
      if (!this.req.body.Portfolio_id) {
        let allPortfolio = await Portfolio.find({});
        if (allPortfolio != null) {
          this.res.send({
            status: 1,
            message: "all Portfolio retuned successfully",
            data: allPortfolio,
          });
        }
      } else {
        let singlePortfolio = await Portfolio.findOne({
          _id: ObjectID(this.req.body.portfolio_id),
        });
        if (singlePortfolio != null) {
          this.res.send({
            status: 1,
            message: "single Portfolio returned successfully",
            data: singlePortfolio,
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get Portfolio api",
        function_name: "GetPortfolio()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdatePortfolio() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_Portfolio = await Portfolio.findByIdAndUpdate(
          ObjectID(this.req.body.portfolio_id),
          updateData
        );
        if (update_Portfolio != null) {
          this.res.send({
            status: 1,
            message: "Portfolio updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delPortfolio = await Portfolio.findByIdAndRemove(
          ObjectID(this.req.body.portfolio_id),
          dData
        );
        console.log(delPortfolio);
        if (delPortfolio != null) {
          this.res.send({
            status: 1,
            message: "Portfolio deleted successfully",
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });

      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update Portfolio api",
        function_name: "UpdatePortfolio()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = PortfolioController;
