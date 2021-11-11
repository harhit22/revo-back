const Model = require("../models/model");
const _ = require("lodash");
let ObjectId = require("mongodb").ObjectID;
const configs = require("../../configs/configs");
class Agreegate {
  constructor(collection) {
    this.collection = collection;
  }

  getWishlist(sort, filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $sort: sort,
            },
            {
              $lookup: {
                from: "products",
                let: { prod: "$product_id" },
                pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$prod"] } } }],
                as: "product",
              },
            },
            {
              $unwind: {
                path: "$product",
              },
            },
            {
              $group: { _id: "$user_id", products: { $push: "$product" } },
            },
          ],
          (err, data) => {
            if (err) {
              reject(err);
            }
            if (!err) {
              resolve(data);
            }
          }
        );
      });
    } catch (error) {
      console.log("error is getWishlist() in aggregation!!");
    }
  }

  getCart(sort, filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $sort: sort,
            },
            {
              $lookup: {
                from: "products",
                let: { prod: "$product_id" },
                pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$prod"] } } }],
                as: "product",
              },
            },
            {
              $unwind: {
                path: "$product",
              },
            },
            {
              $group: {
                _id: "$user_id",
                products: { $push: "$product" },
                quantity: { $push: "$quantity" },
              },
            },
          ],
          (err, data) => {
            if (err) {
              reject(err);
            }
            if (!err) {
              resolve(data);
            }
          }
        );
      });
    } catch (error) {
      console.log("error is getCart() in aggregation!!");
    }
  }

  getOrderList(sort, filter) {
    return new Promise((resolve, reject) => {
      try {
        this.collection.aggregate(
          [
            {
              $sort: sort,
            },
            {
              $lookup: {
                from: "orders",
                let: { orderId: "$order_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [{ $eq: ["$_id", "$$orderId"] }],
                      },
                    },
                  },
                ],
                as: "orders",
              },
            },
            {
              $lookup: {
                from: "transactions",
                let: { txnId: "$transaction_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [{ $eq: ["$_id", "$$txnId"] }],
                      },
                    },
                  },
                ],
                as: "transaction",
              },
            },
            {
              $lookup: {
                from: "products",
                let: { prodId: "$product_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$_id", "$$prodId"] },
                          { $eq: ["$status", true] },
                        ],
                      },
                    },
                  },
                ],
                as: "productDetail",
              },
            },
            {
              $unwind: {
                path: "$productDetail",
              },
            },
            {
              $lookup: {
                from: "users",
                let: { usrId: "$user_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [{ $eq: ["$_id", "$$usrId"] }],
                      },
                    },
                  },
                ],
                as: "user",
              },
            },
            {
              $unwind: {
                path: "$user",
              },
            },
            {
              $match: filter,
            },
            {
              $group: {
                _id: "$order_id",
                user_details: { $first: "$user" },
                transaction_id: { $first: "$transaction_id" },
                order_id: { $first: "$order_id" },
                order_data: { $first: "$orders" },
                transaction_data: { $first: "$transaction" },
                products: {
                  $push: {
                    product_id: "$product_id",
                    order_price: "$order_price",
                    order_discount: "$order_discount",
                    quantity: "$quantity",
                    product_detail: "$productDetail",
                  },
                },
              },
            },
          ],
          (err, data) => {
            if (err) {
              reject(err);
            }
            if (!err) {
              resolve(data);
            }
          }
        );
      } catch (error) {
        this.res.send({
          status: 0,
          message: "some error occured in getting the data",
        });
      }
    });
  }

  getApp(sort) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $sort: sort,
            },
            {
              $lookup: {
                from: "subadmins",
                let: { appId: "$subadmin_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$appId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "subadmin_info",
              },
            },
            {
              $unwind: {
                path: "$subadmin_info",
              },
            },
            // {
            //   $group: {
            //     _id: "$subadmin_id",
            //     subadmin_info: { $first: "$subadmin_info" },
            //   },
            // },
          ],
          (err, data) => {
            if (err) {
              reject(err);
            }
            if (!err) {
              resolve(data);
            }
          }
        );
      });
    } catch (error) {
      console.log("error is getApp() in aggregation!!");
    }
  }
  //   GetQuestionByPaperId(filter) {
  //     return new promise((resolve, reject) => {
  //       this.collection.aggregate([
  //         {
  //           $match: filter,
  //         },
  //         {
  //           $lookup: {
  //             from: "paperquestions",
  //             pipeline: [
  //               {
  //                 $match: {},
  //               },
  //               { $project: { _id: 1 } },
  //             ],
  //             as: "transactions",
  //           },
  //         },
  //       ]);
  //     });
  //   }
  // }
  // // db.exams.aggregate([
  // //   {
  // //       $lookup:{
  // //           from:"paper",
  // //           let:{ examId:"$_id"},
  // //           pipeline:[{$match:{$expr:{$eq:["$exam_id","$$examId"]}}},
  // //           {$lookup:{
  // //               from:"subjects",
  // //               let:{paperId:"$_id"},
  // //               pipeline:[{$match:{$expr:{$eq:["$paper_id","$$paperId"]}}},
  // //               {$lookup:{
  // //               from:"question",
  // //               let:{subjectId:"$_id"},
  // //               pipeline:[{$match:{$expr:{$eq:["$subject_id","$$subjectId"]}}},
  // //               ],
  // //               as:"questions"}}

  // //   ],
  // //               as:"subjects"
  // //               }}
  // //           ],

  // //           as:"paper"

  // //           }}])
}
module.exports = Agreegate;
