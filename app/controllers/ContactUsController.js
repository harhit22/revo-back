const ContactUs = require("../models/ContactUsSchema").ContactUs;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class ContactUsController extends Controller {
  constructor() {
    super();
  }

  async AddContactUs() {
    try {
      let bodyData = this.req.body;
      let addContactUs = new Model(ContactUs).store(bodyData);
      if (addContactUs != null) {
        this.res.send({
          status: 1,
          message: "ContactUs data added successfully",
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
        api_name: "add Add ContactUs api",
        function_name: "AddContactUs()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetContactUs() {
    try {
      let allContactUs = await ContactUs.find({});
      if (allContactUs != null) {
        this.res.send({
          status: 1,
          message: "all ContactUs retuned successfully",
          data: allContactUs,
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
        api_name: "get ContactUs api",
        function_name: "GetContactUs()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateContactUs() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_ContactUs = await ContactUs.findByIdAndUpdate(
          ObjectID(this.req.body.contactus_id),
          updateData
        );
        if (update_ContactUs != null) {
          this.res.send({
            status: 1,
            message: "ContactUs updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delContactUs = await ContactUs.findByIdAndRemove(
          ObjectID(this.req.body.contactus_id),
          dData
        );
        console.log(delContactUs);
        if (delContactUs != null) {
          this.res.send({
            status: 1,
            message: "ContactUs deleted successfully",
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
        api_name: "update ContactUs api",
        function_name: "UpdateContactUs()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = ContactUsController;
