const Controller = require("./Controller");
const Globals = require("../../configs/globals");
const Admin = require("../models/AdminSchema").Admin;
const Model = require("../models/model");
class AdminController extends Controller {
  constructor() {
    super();
  }

  async RegisterAdmin() {
    try {
      let adminData = this.req.body;
      let admininfovalidation = validateAdminInfo(adminData);
      if (admininfovalidation.is_valid) {
        let alreadyAdmin = await Admin.find({ email: adminData.email });
        if (alreadyAdmin.length == 1) {
          this.res.send({
            status: 0,
            message: "admin already registered....please login",
          });
        } else {
          let regAdmin = await new Model(Admin).store(adminData);
          if (regAdmin != null) {
            this.res.send({
              status: 1,
              message: "admin successfully registered",
            });
          } else {
            this.res.send({
              status: 0,
              message: "some error occoured...please try after some time",
            });
          }
        }
      } else {
        this.res.send({ status: 0, message: admininfovalidation.message });
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
        api_name: "Register admin api",
        function_name: "RegisterAdmin",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async LoginAdmin() {
    try {
      let email = this.req.body.email;

      let admin = await Admin.find({ email: email });
      if (admin != null && admin.length == 1) {
        this.res.send({ status: 1, message: "admin logged in successfully" });
      } else {
        this.res.send({
          status: 0,
          message: "account not found...please register first",
        });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "Some error occoured on server. Please try again after some time",
      });

      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "Admin Route Api",
        finction_name: "LoginAdmin",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
function validateAdminInfo(data) {
  let validation = {
    is_valid: false,
    message: "",
  };

  if (data.fname == null) {
    validation.message = "fname is null";
  } else if (data.lname == null) {
    validation.message = "lname is null";
  } else if (data.email == null) {
    validation.message = "email is null";
  } else if (data.password == null) {
    validation.message = "password no. is null";
  } else {
    validation.is_valid = true;
    validation.message = "valid";
  }
  return validation;
}
module.exports = AdminController;
