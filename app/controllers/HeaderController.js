const Logo = require("../models/HeaderSchema").Logo;
const Menu = require("../models/HeaderSchema").Menu;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class HeaderController extends Controller {
  constructor() {
    super();
  }

  async AddLogo() {
    try {
      let bodyData = this.req.body;
      let addLogo = new Model(Logo).store(bodyData);
      if (addLogo != null) {
        this.res.send({
          status: 1,
          message: "Logo data added successfully",
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
        api_name: "add Add Logo api",
        function_name: "AddLogo()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetLogo() {
    try {
      let allLogo = await Logo.find({});
      if (allLogo != null) {
        this.res.send({
          status: 1,
          message: "all Logo retuned successfully",
          data: allLogo,
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
        api_name: "get Logo api",
        function_name: "GetLogo()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateLogo() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_Logo = await Logo.findByIdAndUpdate(
          ObjectID(this.req.body.logo_id),
          updateData
        );
        if (update_Logo != null) {
          this.res.send({
            status: 1,
            message: "Logo updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delLogo = await Logo.findByIdAndRemove(
          ObjectID(this.req.body.logo_id),
          dData
        );
        console.log(delLogo);
        if (delLogo != null) {
          this.res.send({
            status: 1,
            message: "Logo deleted successfully",
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
        api_name: "update Logo api",
        function_name: "UpdateLogo()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async AddMenu() {
    try {
      let bodyData = this.req.body;
      let addMenu = new Model(Menu).store(bodyData);
      if (addMenu != null) {
        this.res.send({
          status: 1,
          message: "Menu data added successfully",
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
        api_name: "add Add Menu api",
        function_name: "AddMenu()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetMenu() {
    try {
      let allMenu = await Menu.find({});
      if (allMenu != null) {
        this.res.send({
          status: 1,
          message: "all Menu retuned successfully",
          data: allMenu,
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
        api_name: "get Menu api",
        function_name: "GetMenu()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateMenu() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_Menu = await Menu.findByIdAndUpdate(
          ObjectID(this.req.body.menu_id),
          updateData
        );
        if (update_Menu != null) {
          this.res.send({
            status: 1,
            message: "Menu updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delMenu = await Menu.findByIdAndRemove(
          ObjectID(this.req.body.menu_id),
          dData
        );
        console.log(delMenu);
        if (delMenu != null) {
          this.res.send({
            status: 1,
            message: "Menu deleted successfully",
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
        api_name: "update Logo api",
        function_name: "UpdateLogo()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = HeaderController;
