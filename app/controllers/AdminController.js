const Controller = require("./Controller");
const Globals = require("../../configs/globals");
const Admin = require("../models/AdminSchema").Admin;
const ObjectID = require("mongodb").ObjectID;

const Model = require("../models/model");
const bcrypt = require("bcrypt");

class AdminController extends Controller {
  constructor() {
    super();
  }

  async RegisterAdmin() {
    try {
      let adminData = this.req.body;
      adminData["password"] = await hashPassword(adminData.password);

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
      let password = this.req.body.password;

      let admin = await Admin.find({ email: email });
      if (admin != null && admin.length == 1) {
        if (await bcrypt.compare(password, admin[0].password)) {
          this.res.send({
            status: 1,
            message: "admin logged in successfully",
            data: admin[0],
          });
        } else {
          this.res.send({ status: 0, message: "incorrect password" });
        }
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
        function_name: "LoginAdmin",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async ChangePasswordAdmin() {
    try {
      let newPassword = this.req.body.newpassword;
      let admin_id = this.req.body.admin_id;

      let hashedPassword = await hashPassword(newPassword);

      let passwordChangedAdmin = await Admin.findByIdAndUpdate(admin_id, {
        password: hashedPassword,
      });

      if (passwordChangedAdmin != null) {
        this.res.send({ status: 1, message: "password changed!!" });
      } else {
        this.res.send({
          status: 0,
          message:
            "Some error occoured on server. Please try again after some time",
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
        api_name: "Admin routes Api",
        function_name: "changePasswordAdmin()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateProfileAdmin() {
    try {
      let newData = this.req.body;
      let admin_id = this.req.body.admin_id;

      let updateAdmin = await Admin.findByIdAndUpdate(admin_id, newData);

      if (updateAdmin != null) {
        this.res.send({ status: 1, message: "profile updated!!" });
      } else {
        this.res.send({
          status: 0,
          message:
            "Some error occoured on server. Please try again after some time",
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
        api_name: "Admin routes Api",
        function_name: "UpdateProfileAdmin()",
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
    validation.message = "password  is null";
  } else {
    validation.is_valid = true;
    validation.message = "valid";
  }
  return validation;
}

async function hashPassword(password) {
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

module.exports = AdminController;
