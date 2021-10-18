const Cart = require("../models/CartSchema").Cart;
const Order = require("../models/OrderSchema").Orders;
const Transactions = require("../models/TransactionSchema").Transactions;
const ObjectId = require("mongodb").ObjectID;
const OrderItem = require("../models/OrderItemSchema").OrderItem;
const Product = require("../models/ProductSchema").Product;
const Model = require("../models/Model");
const Controller = require("./Controller");
const Globals = require("../../configs/Globals");
const Agreegate = require("../models/Aggregations");
const WalletController = require("./WalletController");
const _ = require("lodash");

class OrderController extends Controller {
  constructor() {
    super();
  }

  async PlaceOrder() {
    try {
      let bodyData = this.req.body;

      let orderItems = bodyData.order_items;

      bodyData["order_status"] = "pending";

      let orderData = await new Model(Order).store(bodyData);

      orderItems.forEach((val) => {
        val["transaction_id"] = bodyData.transaction_id;
        val["order_id"] = orderData.id;
        val["user_id"] = bodyData.user_id;
      });

      if (orderData != null) {
        let updateTransaction = await Transactions.findByIdAndUpdate(
          bodyData.transaction_id,
          { order_id: orderData.id }
        );

        if (updateTransaction != null) {
          let order_Items = await OrderItem.insertMany(orderItems);

          if (order_Items != null) {
            let clearCart = await Cart.deleteMany({
              user_id: ObjectId(bodyData.user_id),
            });
            let page = 0;
            let pagesize = 0;
            let skip = (page - 1) * pagesize;

            let filter = { order_id: ObjectId(orderData.id) };
            let sort = { createdAt: 1 };

            let finalOrderDetails = await new Agreegate(
              orderItems
            ).getOrderList(skip, pagesize, sort, filter);

            if (clearCart != null) {
              return finalOrderDetails;
            }
          }
        }
      }
    } catch (error) {
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
      return false;
    }
  }

  async GetOrders() {
    try {
      let filter = {};
      let bodyData = this.req.body;
      let sort = { createdAt: 1 };

      if (bodyData.from_admin) {
        if (bodyData.hasOwnProperty("orderid")) {
          console.log("has order id value!!");
          filter["order_id"] = ObjectId(bodyData.orderid);
        }

        if (bodyData.return_orders) {
          filter["orders.order_status"] = "return";
        }
        let orderList = await new Agreegate(OrderItem).getOrderList(
          sort,
          filter
        );

        if (orderList != null) {
          return this.res.send({
            status: 1,
            message: "return order returned!!",
            data: orderList,
          });
        }
      } else {
        if (bodyData.hasOwnProperty("order_id")) {
          filter["order_id"] = ObjectId(bodyData.order_id);
        }
        if (bodyData.hasOwnProperty("user_id")) {
          filter["user_id"] = ObjectId(bodyData.user_id);
        }

        let orderData = await new Agreegate(OrderItem).getOrderList(
          sort,
          filter
        );

        let total = await Order.find(filter).count();

        this.res.send({
          status: 1,
          message: "returned!!",
          data: orderData,
          total: total,
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
        api_name: "Order Place Api",
        finction_name: "GetOrder()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateOrder() {
    try {
      let filter = { status: true, is_delete: false };
      let bodyData = this.req.body;
      let sort = { createdAt: 1 };

      if (bodyData.isDelete) {
        let deleteResponse = await Order.updateMany(
          { order_id: ObjectId(bodyData.order_id) },
          { is_delete: true }
        );

        if (deleteResponse != null) {
          this.res.send({ status: 1, message: "deleted" });
        }
      } else if (bodyData.is_return) {
        let orderID = bodyData.order_id;

        let orderUpdate = await Order.findByIdAndUpdate(orderID, {
          order_status: "return",
        });

        let orderItemUpdate = await OrderItem.updateMany(
          { id: ObjectId(orderID) },
          { current_status: "return" }
        );

        if (orderUpdate != null && orderItemUpdate != null) {
          return this.res.send({ status: 1, message: "order returned!!" });
        }
      } else if (bodyData.is_cancel) {
        console.log("in cancel order");
        let orderID = bodyData.order_id;
        let orderUpdate = await Order.findByIdAndUpdate(orderID, {
          order_status: "cancel",
        });

        console.log("order status updated!!");

        let OrderItemUpdate = await OrderItem.updateMany(
          { id: ObjectId(orderID) },
          { current_status: "cancel" }
        );

        console.log("order item status updated!!");

        let orderItems = await OrderItem.find({
          order_id: ObjectId(orderID),
        });

        orderItems.forEach(async (element) => {
          await Product.findByIdAndUpdate(ObjectId(element.product_id), {
            $inc: { quantity: element.quantity },
          });
        });

        console.log("item quantity updated!!");

        if (orderUpdate != null && OrderItemUpdate != null) {
          console.log("sending successfull order cancel response!!");
          return this.res.send({ status: 1, message: "order cancelled!!" });
        }
      } else if (bodyData.accept_refund) {
        let orderID = bodyData.order_id;
        let orderUpdate = await Order.findByIdAndUpdate(orderID, {
          order_status: "return_accept",
        });

        if (orderUpdate != null) {
          return this.res.send({
            status: 1,
            message: "order return accepted!!",
          });
        }
      } else if (bodyData.reject_refund) {
        let orderID = bodyData.order_id;

        let orderUpdate = await Order.findByIdAndUpdate(orderID, {
          order_status: "return_reject",
        });

        if (orderUpdate != null) {
          return this.res.send({ status: 1, message: "return rejected!!" });
        }
      } else if (bodyData.update_status) {
        let orderID = bodyData.order_id;
        let orderStatus = bodyData.order_status;

        let orderUpdate = await Order.findByIdAndUpdate(orderID, {
          order_status: orderStatus,
        });

        if (orderUpdate != null) {
          return this.res.send({
            status: 1,
            message: "Order status updated!!",
          });
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
        finction_name: "UpdateOrder()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = OrderController;
