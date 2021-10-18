const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Cart = require("../models/CartSchema").Cart;
const ObjectId = require("mongodb").ObjectId;
const Controller = require("../controllers/Controller");
const Agreegate = require("../models/Aggregations");
const _ = require("lodash");

class CartController extends Controller {
  constructor() {
    super();
  }

  async AddCart() {
    try {
      let bodyData = this.req.body;

      let existing = await Cart.find({
        user_id: ObjectId(this.req.body.user_id),
        product_id: ObjectId(this.req.body.product_id),
      });

      if (existing.length > 0) {
        this.res.send({
          status: 1,
          message: "the product is already exist in the cart",
        });
      } else {
        let cart = await new Model(Cart).store(bodyData);
        console.log(cart);
        if (cart != null) {
          this.res.send({ status: 1, message: "product added in the cart" });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occured .....please try after some time",
      });
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add cart api",
        function_name: "AddCart()",
        error_title: " error.name",
        descriprion: " error.message",
      };
    }
  }

  async GetCart() {
    try {
      let bodyData = this.req.body;
      let userID = bodyData.user_id;

      let sort = { createdAt: -1 };

      let filter = {
        user_id: ObjectId(userID),
      };

      let cart = await new Agreegate(Cart).getCart(sort, filter);

      if (Cart != null) {
        this.res.send({
          status: 1,
          message: "cart returned!!",
          data: cart,
        });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "Some error occoured on server. Please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "cart Api",
        finction_name: "GetCart()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async SyncCartData() {
    try {
      let bodyData = this.req.body;
      if (_.isEmpty(bodyData)) {
        this.res.send({ status: 0, message: "null array recieved" });
      }
      bodyData.forEach(async (item) => {
        if (item.hasOwnProperty("is_delete")) {
          await Cart.deleteOne({
            user_id: ObjectId(item.user_id),
            product_id: ObjectId(item.product_id),
          });
        } else {
          let exist = await Cart.find({
            user_id: ObjectId(item.user_id),
            product_id: ObjectId(item.product_id),
          });

          if (_.isArray(exist) && exist.length > 0) {
            await Cart.findByIdAndUpdate(exist[0].id, {
              $inc: { quantity: 1 },
            });
          }
        }
      });

      return this.res.send({ status: 1, message: "Cart data synced!!" });
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "Some error occoured on server. Please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "Order Place Api",
        finction_name: "PlaceOrder()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = CartController;
