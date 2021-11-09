const Controller = require("../controllers/Controller");
const Globals = require("../../configs/globals");
const Language = require("../models/LanguageSchema").Language;
const Model = require("../models/model");

class LanguageController extends Controller {
  constructor() {
    super();
  }

  async AddLang() {
    try {
      let lang = this.req.body;
      let language = await new Model(Language).store(lang);
      if (language != null) {
        this.res.send({ status: 1, message: "language added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add language api",
        function_name: "AddLang()",
        error_title: error.name,
        desctription: error.message,
      };
    }
  }

  async GetLang() {
    try {
      if (!this.req.body.lang_id) {
        let getLang = await Language.find({
          delete_status: false,
          app_id: this.req.body.app_id,
        });
        if (getLang != null) {
          this.res.send({
            status: 1,
            message: "return all language",
            data: getLang,
          });
        }
      } else {
        let singleLang = await Language.find({
          _id: this.req.body.lang_id,
          delete_status: false,
          app_id: this.req.body.app_id,
        });
        if (singleLang != null) {
          this.res.send({
            status: 1,
            message: "return single language",
            data: singleLang,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get language api",
        function_name: "GetLang()",
        error_title: error.name,
        desctription: error.message,
      };
    }
  }

  async UpdateLang() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_lang = await Language.findByIdAndUpdate(
          this.req.body.lang_id,
          updateData
        );
        if (update_lang != null) {
          this.res.send({
            status: 1,
            message: "language updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delLang = await Language.findByIdAndUpdate(
          this.req.body.lang_id,
          dData
        );
        console.log(delLang);
        if (delLang != null) {
          this.res.send({
            status: 1,
            message: "language deleted successfully",
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update language api",
        function_name: "UpdateLang()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = LanguageController;
