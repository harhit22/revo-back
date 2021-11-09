const Controlle = require("./Controller");
const ObjectID = require("mongodb").ObjectID;
const Support = require("../models/SupportSchema").Support;
const Model = require("../models/model");
const Globals = require("../../configs/globals");

class SupportController extends Controlle {
  constructor() {
    super();
  }

  async AddSupport() {
    try {
      let bodyData = this.req.body;

      if (!bodyData.user_id) {
        return this.res.send({ status: 0, message: "send user_id!!" });
      }

      let ticketData = bodyData;

      ticketData.user_id = ObjectID(bodyData.user_id);

      let ticket = await new Model(Support).store(ticketData);

      if (ticket != null) {
        return this.res.send({
          status: 1,
          message: "support ticked created!!",
        });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "Some error occoured on server. Please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "support Api",
        finction_name: "AddSupport()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetSupport() {
    try {
      let bodyData = this.req.body;

      if (bodyData.hasOwnProperty("ticket_id")) {
        let tickets = await Support.findById(bodyData.ticket_id);

        console.log(tickets);

        if (tickets != null) {
          return this.res.send({
            status: 1,
            message: "single support ticket returned!!",
            data: tickets,
          });
        }
      } else {
        if (bodyData.hasOwnProperty("user_id")) {
          userID = ObjectID(bodyData.user_id);
        }

        let tickets = await Support.find({
          _id: userID,
          app_id: this.req.body.app_id,
        });

        if (tickets != null) {
          return this.res.send({
            status: 1,
            message: "support tickets returned!!",
            data: tickets,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "Some error occoured on server. Please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "support Api",
        function_name: "GetSupport()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateSupport() {
    try {
      let bodyData = this.req.body;

      if (!bodyData.ticket_id) {
        return this.res.send({ status: 0, message: "send ticket_id!!" });
      } else {
        let updateData = await Support.findByIdAndUpdate(
          bodyData.ticket_id,
          bodyData
        );

        if (updateData != null) {
          return this.res.send({ status: 1, message: "ticket updated!!" });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "Some error occoured on server. Please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "support Api",
        finction_name: "UpdateSupport()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = SupportController;
