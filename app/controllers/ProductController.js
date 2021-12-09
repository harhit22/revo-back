const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Product = require("../models/ProductSchema").Product;
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;
const Aggregate = require("../models/Aggregations");

class ProductController extends Controller {
  constructor() {
    super();
  }

  async AddProduct() {
    try {
      let productData = this.req.body;

      let mrp_num = parseInt(productData.mrp);
      console.log("mrp", mrp_num);

      let dis = parseInt(productData.discount);
      console.log("discount", dis);

      let dis_num = (mrp_num * dis) / 100;
      console.log("dis number", dis_num);
      let sp = mrp_num - dis_num;
      console.log("selling price", sp);

      let taxx = parseInt(productData.tax);
      let tax_num = (sp * taxx) / 100;
      console.log("tax price", tax_num);

      let with_tax = sp + tax_num;
      console.log("with tax sp", with_tax);

      productData.selling_price = sp;
      productData.price_with_tax = with_tax;

      let addProduct = await new Model(Product).store(productData);
      console.log(addProduct);

      if (addProduct != null) {
        this.res.send({ status: 1, message: "product added successfully" });
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
        api_name: "add product api",
        function_name: "AddProduct()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetProduct() {
    try {
      if (this.req.body.product_id) {
        let single_product = await Product.findOne({
          _id: ObjectID(this.req.body.product_id),
          app_id: ObjectID(this.req.body.app_id),
        });
        if (single_product != null) {
          this.res.send({
            status: 1,
            message: "single product return",
            data: single_product,
          });
        }
      } else if (this.req.body.subcat_id) {
        let prod_subcat = await Product.find({
          subcategory_id: ObjectID(this.req.body.subcat_id),
          app_id: ObjectID(this.req.body.app_id),
        });
        if (prod_subcat != null) {
          this.res.send({
            status: 1,
            message: "product return by subcategory ID",
            data: prod_subcat,
          });
        }
      } else if (this.req.body.publishr_id) {
        let prod_publisher = await Product.find({
          publisher_id: ObjectID(this.req.body.publishr_id),
          app_id: ObjectID(this.req.body.app_id),
        });
        if (prod_publisher != null) {
          this.res.send({
            status: 1,
            message: "product return by publisher id",
            data: prod_publisher,
          });
        }
      } else {
        const filter = {
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        };
        let prod = await new Aggregate(Product).getProduct(filter);
        console.log(prod);
        if (prod != null) {
          this.res.send({
            status: 1,
            message: "all product returned successfully",
            data: prod,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occured....please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get product api",
        function_name: "GetProduct()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateProduct() {
    try {
      if (!this.req.body.status) {
        let upData = this.req.body;
        let updateProduct = await Product.findByIdAndUpdate(
          ObjectID(this.req.body.product_id),
          upData
        );
        if (updateProduct != null) {
          this.res.send({
            status: 1,
            message: "Product  updated successfully",
          });
        }
      } else {
        let delData = this.req.body;
        let deleteData = await Product.findByIdAndRemove(
          ObjectID(this.req.body.product_id),
          delData
        );
        if (deleteData != null) {
          this.res.send({
            status: 1,
            message: "Product deleted successfully",
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occurred ...please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      dataErrorObj = {
        is_from: "API Error",
        api_name: "update Product api",
        function_name: "UpdateProduct()",
        error_title: "error.name",
        description: "error.message",
      };
    }
  }
}
module.exports = ProductController;
