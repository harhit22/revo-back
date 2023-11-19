const FunfactText = require("../models/FunfactTextSchma").FunfactText;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class FunfactTextController extends Controller {
  constructor() {
    super();
  }

  async AddFunfactText() {
    try {
      let bodyData = this.req.body;
      let addFunfact = new Model(FunfactText).store(bodyData);
      if (addFunfact != null) {
        this.res.send({
          status: 1,
          message: "FunfactText data added successfully",
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
        function_name: "AddFunfactText()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetFunfactText() {
    try {
      if (!this.req.body.FunfactText_id) {
        let allFunfact = await FunfactText.find({});
        if (allFunfact != null) {
          this.res.send({
            status: 1,
            message: "all FunfactText retuned successfully",
            data: allFunfact,
          });
        }
      } else {
        let singleFunfactText = await FunfactText.findOne({
          _id: ObjectID(this.req.body.FunfactText_id),
        });
        if (singleFunfactText != null) {
          this.res.send({
            status: 1,
            message: "single Fanfact returned successfully",
            data: singleFunfactText,
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
        api_name: "get FunfactText api",
        function_name: "GetFunfactText()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateFunfactText() {
    try {
      if (!this.req.body.delete_status) {
        console.log("update FunfactText");
        let updateData = this.req.body;
        let update_FunfactText = await FunfactText.findByIdAndUpdate(
          ObjectID(this.req.body.blog_id),
          updateData
        );
        if (update_FunfactText != null) {
          this.res.send({
            status: 1,
            message: "FunfactText updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delFunfactText = await FunfactText.findByIdAndRemove(
          ObjectID(this.req.body.FunfactText_id),
          dData
        );
        console.log(delFunfactText);
        if (delBlog != null) {
          this.res.send({
            status: 1,
            message: "FunfactText deleted successfully",
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
        api_name: "update Blog api",
        function_name: "UpdateBlog()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = FunfactTextController;
