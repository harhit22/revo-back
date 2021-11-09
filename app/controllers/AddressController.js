const Controller = require("./Controller");
const Address = require("../models/AddressSchema").Address;
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectId;

class AddressController extends Controller {
  constructor() {
    super();
  }

  async AddAddress() {
    try {
      let addressData = this.req.body;
      let address = await new Model(Address).store(addressData);

      if (address != null) {
        this.res.send({ status: 1, message: "address added successfully!!" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server. Please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "Add address Api",
        function_name: "AddAddress()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetAddress() {
    try {
      if (!this.req.user_id) {
        this.res.send({
          status: 0,
          message: "user ID missing",
          data: states,
        });
      } else {
        let userId = ObjectID(this.req.body.user_id);
        let address = await Address.find({
          user_id: userId,
          app_id: this.req.body.app_id,
        });
        if (address != null) {
          this.res.send({
            status: 1,
            message: "address returned",
            data: address,
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get address api",
        function_name: "GetAddress()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateAddress() {
    try {
      if (!this.req.body.delete_status) {
        let bodyData = this.req.body;
        let updateData = bodyData;
        let userId = ObjectID(bodyData.user_id);

        let updatedAddress = await Address.findByIdAndUpdate(
          { user_id: userId },
          updateData
        );
        if (updatedAddress != null) {
          this.res.send({ status: 1, message: "address updated successfully" });
        }
      } else {
        let bodyData = this.req.body;
        let userId = ObjectID(bodyData.user_id);

        let deleteAddress = await Address.findByIdAndRemove({
          user_id: userId,
        });
        if (deleteAddress != null) {
          this.res.send({ status: 1, message: "address deleted successfully" });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update address api",
        function_name: "UpdateAddress()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = AddressController;
