const TestimonialHead =
  require("../models/AboutTestimonialSchema").TestimonialHead;
const TestimonialCrousal =
  require("../models/AboutTestimonialSchema").TestimonialCrousal;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class AboutTestimonialController extends Controller {
  constructor() {
    super();
  }

  async AddTestimonialHead() {
    try {
      let bodyData = this.req.body;
      let addTestimonialHead = new Model(TestimonialHead).store(bodyData);
      if (addTestimonialHead != null) {
        this.res.send({
          status: 1,
          message: "TestimonialHead data added successfully",
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
        api_name: "add Add TestimonialHead api",
        function_name: "AddTestimonialHead()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetTestimonialHead() {
    try {
      let allTestimonialHead = await TestimonialHead.find({});
      if (allTestimonialHead != null) {
        this.res.send({
          status: 1,
          message: "all TestimonialHead retuned successfully",
          data: allTestimonialHead,
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
        api_name: "get TestimonialHead api",
        function_name: "GetTestimonialHead()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateTestimonialHead() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_TestimonialHead = await TestimonialHead.findByIdAndUpdate(
          ObjectID(this.req.body.testimonialhead_id),
          updateData
        );
        if (update_TestimonialHead != null) {
          this.res.send({
            status: 1,
            message: "TestimonialHead updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delTestimonialHead = await TestimonialHead.findByIdAndRemove(
          ObjectID(this.req.body.testimonialhead_id),
          dData
        );
        console.log(delTestimonialHead);
        if (delAboutHead != null) {
          this.res.send({
            status: 1,
            message: "TestimonialHead deleted successfully",
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
        api_name: "update TestimonialHead api",
        function_name: "UpdateTestimonialHead()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async AddTestimonialCrousal() {
    try {
      let bodyData = this.req.body;
      let addTestimonialCrousal = new Model(TestimonialCrousal).store(bodyData);
      if (addTestimonialCrousal != null) {
        this.res.send({
          status: 1,
          message: "TestimonialCrousal data added successfully",
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
        api_name: "add Add TestimonialCrousal api",
        function_name: "AddTestimonialCrousal()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetTestimonialCrousal() {
    try {
      let allTestimonialCrousal = await TestimonialCrousal.find({});
      if (allTestimonialCrousal != null) {
        this.res.send({
          status: 1,
          message: "all TestimonialCrousal retuned successfully",
          data: allTestimonialCrousal,
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
        api_name: "get TestimonialCrousal api",
        function_name: "GetTestimonialCrousal()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateTestimonialCrousal() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_TestimonialCrousal =
          await TestimonialCrousal.findByIdAndUpdate(
            ObjectID(this.req.body.testimonialcrousal_id),
            updateData
          );
        if (update_TestimonialCrousal != null) {
          this.res.send({
            status: 1,
            message: "TestimonialCrousal updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delTestimonialCrousal = await TestimonialCrousal.findByIdAndRemove(
          ObjectID(this.req.body.testimonialcrousal_id),
          dData
        );
        console.log(delTestimonialCrousal);
        if (delTestimonialCrousal != null) {
          this.res.send({
            status: 1,
            message: "TestimonialCrousal deleted successfully",
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
        api_name: "update TestimonialCrousal api",
        function_name: "UpdateTestimonialCrousal()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = AboutTestimonialController;
