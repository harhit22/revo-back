const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Wishlist = require("../models/WishlistSchema").Wishlist;
const ObjectId = require("mongodb").ObjectId;
const Controller = require("../controllers/Controller");
const Agreegate = require("../models/Aggregations");

class WishlistController extends Controller {
  constructor() {
    super();
  }

  async AddWishlist() {
    try {
      let bodyData = this.req.body;

      let existing = await Wishlist.find({
        user_id: ObjectId(this.req.body.user_id),
        product_id: ObjectId(this.req.body.product_id),
      });

      if (existing.length > 0) {
        this.res.send({
          status: 1,
          message: "the product is already exist in the wishlist",
        });
      } else {
        let wishlist = await new Model(Wishlist).store(bodyData);
        console.log(wishlist);
        if (wishlist != null) {
          this.res.send({ status: 1, message: "wishlist added" });
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
        api_name: "add wishlist api",
        function_name: "Addwishlist()",
        error_title: " error.name",
        descriprion: " error.message",
      };
    }
  }

  async GetWishlist() {
    try {
      let bodyData = this.req.body;
      let userID = bodyData.user_id;

      let sort = { createdAt: 1 };

      let filter = {
        user_id: ObjectId(userID),
      };

      let wishlist = await new Agreegate(Wishlist).getWishlist(sort, filter);

      if (wishlist != null) {
        this.res.send({
          status: 1,
          message: "Wishlist returned!!",
          data: wishlist,
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
        api_name: "wishlist Api",
        finction_name: "GetWishlist()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateWishlist() {
    try {
      let bodyData = this.req.body;

      if (bodyData.is_delete) {
        let wishID = bodyData.wish_id;

        let deleteResponse = await Wishlist.findByIdAndRemove(wishID);

        if (deleteResponse != null) {
          return this.res.send({ status: 1, message: "deleted!!" });
        }
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
        api_name: "Order Place Api",
        finction_name: "PlaceOrder()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = WishlistController;
