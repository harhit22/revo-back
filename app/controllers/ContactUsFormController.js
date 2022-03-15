const ContactUsForm = require("../models/ContactUsFormSchema").ContactUsForm;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class ContactUsFormController extends Controller {
  constructor() {
    super();
  }

  async AddContactUsForm() {
    try {
      let bodyData = this.req.body;
      console.log(bodyData);
      let addContactUsForm = new Model(ContactUsForm).store(bodyData);
      console.log(addContactUsForm);
      if (addContactUsForm != null) {
        this.res.send({
          status: 1,
          message: "ContactUsForm data added successfully",
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
        api_name: "add Add ContactUsForm api",
        function_name: "AddContactUsForm()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetContactUsForm() {
    try {
      let allContactUsForm = await ContactUsForm.find({});
      if (allContactUsForm != null) {
        this.res.send({
          status: 1,
          message: "all ContactUsForm retuned successfully",
          data: allContactUsForm,
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
        api_name: "get ContactUsForm api",
        function_name: "GetContactUsForm()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateContactUsForm() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        console.log(updateData);
        let update_ContactUsForm = await ContactUsForm.findByIdAndUpdate(
          ObjectID(this.req.body.contactusform_id),
          updateData
        );
        if (update_ContactUsForm != null) {
          this.res.send({
            status: 1,
            message: "ContactUsForm updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delContactUsForm = await ContactUsForm.findByIdAndRemove(
          ObjectID(this.req.body.contactusform_id),
          dData
        );
        console.log(delContactUsForm);
        if (delContactUsForm != null) {
          this.res.send({
            status: 1,
            message: "ContactUsForm deleted successfully",
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
        api_name: "update ContactUsForm api",
        function_name: "UpdateContactUsForm()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = ContactUsFormController;
