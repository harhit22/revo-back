const Controller = require("../controllers/Controller");
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const Progress = require("../models/PackageProgressSchema").Progress;
const ObjectID = require("mongodb").ObjectId;

class PackageProgressController extends Controller {
  constructor() {
    super();
  }

  async AddProgress() {
    try {
      let bodyData = this.req.body;
      let addProgress = await new Model(Progress).store(bodyData);
      if (addProgress != null) {
        this.res.send({
          status: 1,
          message: "Progress data added successfully",
        });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server....please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "progress api",
        function_name: "AddProgress()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
