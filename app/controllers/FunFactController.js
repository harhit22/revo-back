const Funfact = require("../models/FunFactSchema").Funfact;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class FunfactController extends Controller {
  constructor() {
    super();
  }

  async AddFunfact() {
    try {
      let bodyData = this.req.body;
      let addFunfact = new Model(Funfact).store(bodyData);
      if (addFunfact != null) {
        this.res.send({
          status: 1,
          message: "Funfact data added successfully",
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
        api_name: "add Add Funfact api",
        function_name: "AddFunfact()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetFunfact() {
    try {
      let allFunfact = await Funfact.find({});
      if (allFunfact != null) {
        this.res.send({
          status: 1,
          message: "all Funfact retuned successfully",
          data: allFunfact,
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
        api_name: "get Funfact api",
        function_name: "GetFunfact()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateFunfact() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_Funfact = await Funfact.findByIdAndUpdate(
          ObjectID(this.req.body.funfact_id),
          updateData
        );
        if (update_Funfact != null) {
          this.res.send({
            status: 1,
            message: "Funfact updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delFunfact = await Funfact.findByIdAndRemove(
          ObjectID(this.req.body.funfact_id),
          dData
        );
        console.log(delFunfact);
        if (delFunfact != null) {
          this.res.send({
            status: 1,
            message: "Funfact deleted successfully",
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
        api_name: "update Funfact api",
        function_name: "UpdateFunfact()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = FunfactController;
