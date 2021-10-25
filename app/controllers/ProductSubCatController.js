const productSubcategory =
  require("../models/ProductSubCatSchema").productSubcategory;
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectID;
const Controller = require("../controllers/Controller");

class SubCatController extends Controller {
  constructor() {
    super();
  }

  async AddSubCat() {
    try {
      let addData = this.req.body;
      let adData = await new Model(productSubcategory).store(addData);
      if (adData != null) {
        this.res.send({ status: 1, message: "subcategory added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured...please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add subcategory api",
        function_name: "AddSubCat()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
  async GetSubCat() {
    try {
      if (!this.req.body.cat_id) {
        let gsub = await productSubcategory.find({ is_delete: false });
        if (gsub != null) {
          this.res.send({
            status: 1,
            message: "return all subcategory",
            data: gsub,
          });
        }
      } else {
        let catID = ObjectID(this.req.body.cat_id);
        let getsub = await productSubcategory.find({
          cat_id: ObjectID(catID),
          is_delete: false,
        });
        if (getsub != null) {
          this.res.send({
            status: 1,
            message: "return subcategory by category",
            data: getsub,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server....please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get subcategory api",
        function_name: "GetSubCat()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateSubCat() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_subcat = await productSubcategory.findByIdAndUpdate(
          this.req.body.subCat_id,
          updateData
        );
        if (update_subcat != null) {
          this.res.send({
            status: 1,
            message: "subcategory updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let deletesubcat = await productSubcategory.findByIdAndUpdate(
          this.req.body.subcat_id,
          dData
        );
        console.log(deletesubcat);
        if (deletesubcat != null) {
          this.res.send({
            status: 1,
            message: "subcategory deleted successfully",
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update subcategory api",
        function_name: "UpdateSubCat()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = SubCatController;