const Controller = require("../controllers/Controller");
const Transaction = require("../models/TransactionSchema").Transactions;
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectId;
const Package = require("../models/PackagesSchema").Package;

class TransactionController extends Controller {
  constructor() {
    super();
  }

  async MakeTranscation() {
    try {
      let bodyData = this.req.body;
      let packageID = ObjectID(bodyData.package_id);
      let packData = await Package.findOne({ _id: packageID });
      console.log(packData);
      bodyData["exam_id"] = packData.exam_id;
      bodyData["actual_amount"] = packData.price;
      let finalAmount =
        bodyData.actual_amount -
        (bodyData.actual_amount * bodyData.discount) / 100;
      console.log(finalAmount);
      bodyData["final_amount"] = finalAmount;
      let addTransaction = await new Model(Transaction).store(bodyData);
      if (addTransaction != null) {
        this.res.send({
          status: 1,
          messgae: "transaction data added successfull",
        });
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message:
          "Some error occoured on server. Please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "make transaction Api",
        finction_name: "MakeTransaction()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = TransactionController;
