const Model = require("../models/model");
const Result = require("../models/ResultSchema").Result;
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectID;
const Controller = require("../controllers/Controller");
const percentile = require("percentile");
class ResultController extends Controller {
  constructor() {
    super();
  }

  async AddResult() {
    try {
      let addResult = this.req.body;
      let NewArr = [];
      let per_arr = await Result.find({}, { total_marks: 1, _id: 0 });
      per_arr.forEach((element) => NewArr.push(element.total_marks));
      let perctile = percentile(addResult.total_marks, NewArr);
      addResult.percentiles = perctile;

      let storeResult = await new Model(Result).store(addResult);
      if (storeResult != null) {
        this.res.send({ status: 1, message: "result added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add result api",
        function_name: "AddResult()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetResult() {
    try {
      if (this.req.body.paper_id) {
        let paperID = ObjectID(this.req.body.paper_id);
        let getResult = await Result.find({ paper_id: ObjectID(paperID) });
        if (getResult != null) {
          this.res.send({
            status: 1,
            message: "get result by paperid",
            data: getResult,
          });
          //sss
        }
      } else if (this.req.body.user_id) {
        let userID = ObjectID(this.req.body.user_id);
        let getResults = await Result.find({ user_id: ObjectID(userID) });
        if (getResults != null) {
          this.res.send({
            status: 1,
            message: "get result by userid",
            data: getResults,
          });
        }
      } else {
        let allResults = await Result.find({});
        if (allResults != null) {
          this.res.send({
            status: 1,
            message: "all results returned",
            data: allResults,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get result api",
        function_name: "GetResult()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateResult() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let UpdateResult = await Result.findByIdAndUpdate(
          this.req.body.result_id,
          updateData
        );
        if (UpdateResult != null) {
          this.res.send({
            status: 1,
            message: "result updated successfully",
          });
        }
      } else {
        let delResult = await Result.findByIdAndUpdate(
          this.req.body.result_id,
          {
            delete_status: true,
          }
        );
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update result api",
        function_name: "UpdateResult()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = ResultController;
