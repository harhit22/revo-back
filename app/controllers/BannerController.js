const Banner = require("../models/BannerSchema").Banner;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("../controllers/Controller");
const ObjectID = require("mongodb").ObjectId;

class BannerController extends Controller {
  constructor() {
    super();
  }

  async AddBanner() {
    try {
      let bodyData = this.req.body;
      console.log("banner body data ", bodyData);
      let addBanner = new Model(Banner).store(bodyData);
      if (addBanner != null) {
        this.res.send({ status: 1, message: "Banner added successfully" });
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
        api_name: "add banner api",
        function_name: "AddBanner()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetBanner() {
    try {
      if (!this.req.body.banner_id) {
        let allBanner = await Banner.find({
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (allBanner != null) {
          this.res.send({
            status: 1,
            message: "all banner retuned successfully",
            data: allBanner,
          });
        }
      } else {
        let singleBanner = await Banner.find({
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
          _id: ObjectID(this.req.body.banner_id),
        });
        if (singleBanner != null) {
          this.res.send({
            status: 1,
            message: "single banner returned",
            data: singleBanner,
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
        api_name: "get banner api",
        function_name: "GetBanner()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateBanner() {
    try {
      if (!this.req.body.delete_status) {
        let dataForUpdate = this.req.body;
        let updateData = Banner.findByIdAndUpdate(
          {
            app_id: ObjectID(this.req.body.app_id),
            _id: this.req.body.banner_id,
          },
          dataForUpdate
        );
        if (updateData != null) {
          this.res.send({ status: 1, message: "banner updated successfully" });
        }
      } else {
        let deleteBanner = Banner.findByIdAndUpdate(
          {
            app_id: ObjectID(this.req.body.app_id),
            _id: ObjectID(this.req.body.banner_id),
          },
          { delete_status: true }
        );

        if (deleteBanner != null) {
          this.res.send({ status: 1, message: "banner deleted successfully" });
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
        api_name: "update banner api",
        function_name: "UpdateBanner()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = BannerController;
