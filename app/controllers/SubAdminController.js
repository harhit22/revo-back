const Controller = require("./Controller");
const Globals = require("../../configs/globals");
const Permission = require("../models/SubAdminSchema").Permission;
const SubAdmin = require("../models/SubAdminSchema").SubAdmin;

const Model = require("../models/model");
const bcrypt = require("bcrypt");

class SubAdminController extends Controller {
  constructor() {
    super();
  }

  async RegisterSubAdmin() {
    try {
      let subAdminData = this.req.body;
      subAdminData["password"] = await hashPassword(subAdminData.password);

      let subAdminInfoValidation = validateSubAdminInfo(subAdminData);
      if (subAdminInfoValidation.is_valid) {
        let alreadySubAdmin = await SubAdmin.find({
          email: subAdminData.email,
        });
        if (alreadySubAdmin.length == 1) {
          this.res.send({
            status: 0,
            message: "sub admin already registered....please login",
          });
        } else {
          let regSubAdmin = await new Model(SubAdmin).store(subAdminData);
          let subAdminId = regSubAdmin._id;
          subAdminData["subAdmin_id"] = subAdminId;
          let permission = await new Model(Permission).store(subAdminData);
          // console.log(subAdminId);

          if (regSubAdmin != null && permission != null) {
            this.res.send({
              status: 1,
              message: "sub admin successfully registered",
            });
          } else {
            this.res.send({
              status: 0,
              message: "some error occoured...please try after some time",
            });
          }
        }
      } else {
        this.res.send({ status: 0, message: subAdmininfovalidation.message });
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
        api_name: "Register subAdmin api",
        function_name: "RegisterSubAdmin",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async LoginSubAdmin() {
    try {
      let email = this.req.body.email;
      let password = this.req.body.password;

      let subAdmin = await SubAdmin.find({ email: email });
      if (subAdmin != null && subAdmin.length == 1) {
        if (await bcrypt.compare(password, subAdmin[0].password)) {
          this.res.send({
            status: 1,
            message: "sub admin logged in successfully",
            data: subAdmin[0],
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

  async ChangePasswordSubAdmin() {
    try {
      let newPassword = this.req.body.newpassword;
      let subAdmin_id = this.req.body.subadmin_id;

      let hashedPassword = await hashPassword(newPassword);

      let passwordChangedAdmin = await SubAdmin.findByIdAndUpdate(subAdmin_id, {
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
        api_name: "subAdmin routes Api",
        function_name: "changePasswordSubAdmin()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateProfileSubAdmin() {
    try {
      let newData = this.req.body;
      let subAdmin_id = this.req.body.subadmin_id;

      let updateSubAdmin = await SubAdmin.findByIdAndUpdate(
        subAdmin_id,
        newData
      );

      if (updateSubAdmin != null) {
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
        api_name: "sub Admin routes Api",
        function_name: "UpdateProfileSubAdmin()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetSubAdmin() {
    try {
      if (!this.req.body.subadmin_id) {
        let getSubAdmin = await SubAdmin.find({ app_id: this.req.body.app_id });
        if (getSubAdmin != null) {
          this.res.send({
            status: 1,
            message: "return all sub admin",
            data: getSubAdmin,
          });
        }
      } else {
        let getSingleSubAdmin = await SubAdmin.find({
          _id: subadmin_id,
          app_id: this.req.body.app_id,
        });
        if (getSingleSubAdmin != null) {
          this.res.send({
            status: 1,
            message: "single SubAdmin returned",
            data: getSingleSubAdmin,
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
        api_name: "get subadmin api",
        function_name: "GetSubAdmin()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

function validateSubAdminInfo(data) {
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
  } else if (data.phone_no == null) {
    validation.message = "phone number  is null";
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

module.exports = SubAdminController;
