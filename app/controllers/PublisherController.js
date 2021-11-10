const Publisher = require("../models/publisherSchema").Publisher;
const Globals = require("../../configs/globals");
const Controller = require("./Controller");
const Model = require("../models/model");

class PublisherController extends Controller {
  constructor() {
    super();
  }

  async AddPublisher() {
    try {
      let publisher = this.req.body;
      let addPublisher = await new Model(Publisher).store(publisher);
      if (addPublisher != null) {
        this.res.send({ status: 1, message: "publisher added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occured...please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add publisher api",
        function_name: "AddPublisher()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetPublisher() {
    try {
      if (!this.req.body.publisher_id) {
        let getPublisher = await Publisher.find({
          status: true,
          app_id: this.req.body.app_id,
        });
        if (getPublisher != null) {
          this.res.send({
            status: 1,
            message: "return all Publisher",
            data: getPublisher,
          });
        }
      } else {
        let getSinglePublisher = await Publisher.findOne({
          _id: publisher_id,
          status: true,
          app_id: this.req.body.app_id,
        });
        if (getSinglePublisher != null) {
          this.res.send({
            status: 1,
            message: "single Publisher returned",
            data: getSinglePublisher,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occured...please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get Publisher api",
        function_name: "GetPublisher()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdatePublisher() {
    try {
      if (!this.req.body.status) {
        let upData = this.req.body;
        let updatePublisher = await Publisher.findByIdAndUpdate(
          this.req.body.publisher_id,
          upData
        );
        if (updatePublisher != null) {
          this.res.send({
            status: 1,
            message: "Publisher updated successfully",
          });
        }
      } else {
        let delData = this.req.body;
        let deleteData = await Publisher.findByIdAndUpdate(
          this.req.body.publisher_id,
          delData
        );
        if (deleteData != null) {
          this.res.send({
            status: 1,
            message: "Publisher deleted successfully",
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occurred ...please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      dataErrorObj = {
        is_from: "API Error",
        api_name: "update Publisher api",
        function_name: "UpdatePublisher()",
        error_title: "error.name",
        description: "error.message",
      };
    }
  }
}

module.exports = PublisherController;
