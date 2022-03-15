const Quote = require("../models/QuoteSchema").Quote;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class QuoteController extends Controller {
  constructor() {
    super();
  }

  async AddQuote() {
    try {
      let bodyData = this.req.body;
      let addQuote = new Model(Quote).store(bodyData);
      if (addQuote != null) {
        this.res.send({
          status: 1,
          message: "Quote data added successfully",
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
        api_name: "add Add quote api",
        function_name: "AddQuote()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetQuote() {
    try {
      let allQuote = await Quote.find({});
      if (allQuote != null) {
        this.res.send({
          status: 1,
          message: "all Quote retuned successfully",
          data: allQuote,
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
        api_name: "get Quote api",
        function_name: "GetQuote()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateQuote() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_Quote = await Quote.findByIdAndUpdate(
          ObjectID(this.req.body.quote_id),
          updateData
        );
        if (update_Quote != null) {
          this.res.send({
            status: 1,
            message: "Quote updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delQuote = await Quote.findByIdAndRemove(
          ObjectID(this.req.body.quote_id),
          dData
        );
        console.log(delQuote);
        if (delQuote != null) {
          this.res.send({
            status: 1,
            message: "Quote deleted successfully",
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
        api_name: "update Quote api",
        function_name: "UpdateQuote()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = QuoteController;
