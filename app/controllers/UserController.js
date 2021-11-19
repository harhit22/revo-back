const Controller = require("./Controller");
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const User = require("../models/UserSchema").User;
const ObjectID = require("mongodb").ObjectId;
const Agreegate = require("../models/Aggregations");

class UserController extends Controller {
  constructor() {
    super();
  }

  async RegisterUser() {
    try {
      let userData = this.req.body;
      let userinfovalidation = validateUserInfo(userData);
      if (this.req.body.check_user) {
        let check = await User.find({
          mobile: userData.mobile,
          app_id: ObjectID(userData.app_id),
        });
        if (check.length == 1) {
          return this.res.send({
            status: 0,
            message: "user already registered",
          });
        } else {
          return this.res.send({ status: 1, message: "user not found" });
        }
      } else if (userinfovalidation.is_valid) {
        let alreadyUser = await User.find({
          mobile: userData.mobile,
          app_id: ObjectID(userData.app_id),
          delete_status: false,
        });
        if (alreadyUser.length == 1) {
          this.res.send({
            status: 0,
            message: "user already registered....please login",
          });
        } else {
          let regUser = await new Model(User).store(userData);
          if (regUser != null) {
            this.res.send({ status: 1, message: "user registered" });
          } else {
            this.res.send({
              status: 0,
              message: "some error occoured...please try after some time",
            });
          }
        }
      } else {
        this.res.send({ status: 0, message: userinfovalidation.message });
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
        api_name: "Register user api",
        function_name: "UserRegister",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async LoginUser() {
    try {
      let mobile = this.req.body.mobile;
      let filter = {
        mobile: mobile,
        app_id: ObjectID(this.req.body.app_id),
        delete_status: false,
      };

      let user = await new Agreegate(User).getLoginData(filter);
      console.log(user);
      if (user != null && user.length == 1) {
        this.res.send({ status: 1, message: "user logged in successfully" });
      } else {
        this.res.send({
          status: 0,
          message: "account not found...please register first",
        });
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message:
          "Some error occoured on server. Please try again after some time",
      });

      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "User Route Api",
        finction_name: "loginUser",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
function validateUserInfo(data) {
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
  } else if (data.mobile == null) {
    validation.message = "mobile no. is null";
  } else {
    validation.is_valid = true;
    validation.message = "valid";
  }
  return validation;
}
module.exports = UserController;
