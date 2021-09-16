let config = require("./configs");
let Users = require("../app/models/UserSchema").Users;
let Model = require("../app/models/model");
const Errorlogs = require("../app/models/errorSchema").Errorlogs;

class Globals {
  constructor() {}

  async addErrorLogInDB(dataObj) {
    try {
      const errData = await new Model(Errorlogs).store(dataObj);
      if (_.isEmpty(errData)) return "Error Not Save";
      return "Error Saved";
    } catch (error) {
      return "Error in save log error";
    }
  }
}

module.exports = Globals;
