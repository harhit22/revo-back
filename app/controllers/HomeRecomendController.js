const HomeRecommend = require('../models/HomeRecommendSchema').HomeRecommend
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HomeRecommendController extends Controller {
  constructor() {
    super();
  }

  async AddHomeRecommend() {
    try {
      let bodyData = this.req.body;
      let addHomeRecommend = new Model(HomeRecommend).store(bodyData);
      if (addHomeRecommend != null) {
        this.res.send({
          status: 1,
          message: "Home Recommend added successfully",
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
        api_name: "add Add HomeRecommend api",
        function_name: "AddRecommend()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetHomeRecommend() {
    try {
      if (!this.req.body.homerecommend_id) {
        let allhomerecommend = await HomeRecommend.find({});
        if (allhomerecommend != null) {
          this.res.send({
            status: 1,
            message: "all HomeRecommend retuned successfully",
            data: allhomerecommend,
          });
        }
      } else {
        let singlehomerecommend = await HomeRecommend.findOne({
          _id: ObjectID(this.req.body.homerecommend_id),
        });
        if (singlehomerecommend != null) {
          this.res.send({
            status: 1,
            message: "single homerecommend returned successfully",
            data: singlehomerecommend,
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
        api_name: "get HomeRecommend api",
        function_name: "GetHomeRecommend()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateHomeRecommend() {
    try {
      if (!this.req.body.delete_status) {
        console.log("update HomeRecommend");
        let updateData = this.req.body;
        let update_HomeRecommend = await HomeRecommend.findByIdAndUpdate(
          ObjectID(this.req.body.homerecommend_id),
          updateData
        );
        if (update_HomeRecommend != null) {
          this.res.send({
            status: 1,
            message: "HomeRecommend updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delhomerecommend = await HomeRecommend.findByIdAndRemove(
          ObjectID(this.req.body.homerecommend_id),
          dData
        );
        console.log(delhomerecommend);
        if (delhomerecommend != null) {
          this.res.send({
            status: 1,
            message: "HomeRecommend deleted successfully",
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

module.exports = HomeRecommendController;
