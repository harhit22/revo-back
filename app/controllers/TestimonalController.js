const Testimonial = require("../models/TestimonialsSchema").Testimonial;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class TestimonalController extends Controller {
  constructor() {
    super();
  }

  async AddTestimonial() {
    try {
      let bodyData = this.req.body;
      console.log("bodyData", bodyData);
      let addTestimonial = new Model(Testimonial).store(bodyData);
      if (addTestimonial != null) {
        this.res.send({
          status: 1,
          message: "Testimonals data added successfully",
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
        api_name: "add Add Testimonals api",
        function_name: "AddTestimonal()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetTestimonial() {
    try {
      let allTestimonal = await Testimonial.find({});
      if (allTestimonal != null) {
        this.res.send({
          status: 1,
          message: "all Testimoninal retuned successfully",
          data: allTestimonal,
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
        api_name: "get Testimonal api",
        function_name: "GetTestimonal()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateTestimonial() {
    try {
      if (!this.req.body.delete_status) {
        console.log("in update");
        let updateData = this.req.body;
        let update_Testimonals = await Testimonial.findByIdAndUpdate(
          ObjectID(this.req.body.testimonial_id),
          updateData
        );
        if (update_Testimonals != null) {
          this.res.send({
            status: 1,
            message: "Testimonial updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delTestimonal = await Testimonial.findByIdAndRemove(
          ObjectID(this.req.body.testimonial_id),
          dData
        );
        console.log(delTestimonal);
        if (delTestimonal != null) {
          this.res.send({
            status: 1,
            message: "Testimonals deleted successfully",
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
        api_name: "update Testimonal api",
        function_name: "UpdateTestimonal()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = TestimonalController;
