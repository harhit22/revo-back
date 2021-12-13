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

  getApp(skip, limit, sort, filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $sort: sort,
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
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

  getSubadmin(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "permissions",
                let: { subId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$subAdmin_id", "$$subId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "permissions",
              },
            },
            {
              $unwind: {
                path: "$permissions",
              },
            },
            {
              $group: {
                _id: "$_id",
                fname: { $first: "$fname" },
                lname: { $first: "$lname" },
                email: { $first: "$email" },
                phone_no: { $first: "$phone_no" },
                is_suspended: { $first: "$is_suspended" },
                is_delete: { $first: "$is_delete" },
                permissions: { $first: "$permissions" },
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
      console.log("error is getSubadmin() in aggregation!!");
    }
  }

  getCity(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "states",
                let: { stateId: "$state_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$stateId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "state_name",
              },
            },
            {
              $unwind: {
                path: "$state_name",
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
      console.log("error is getCity() in aggregation!!");
    }
  }

  getLesson(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "subjects",
                let: { subjectId: "$subject_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$subjectId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "subject_name",
              },
            },
            {
              $unwind: {
                path: "$subject_name",
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
      console.log("error is getCity() in aggregation!!");
    }
  }

  getExam(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "exam_categories",
                let: { catId: "$category_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$catId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "category_name",
              },
            },
            {
              $unwind: {
                path: "$category_name",
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
      console.log("error is getExam() in aggregation!!");
    }
  }

  getPaper(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "exams",
                let: { examId: "$exam_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$examId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "Exam",
              },
            },
            {
              $unwind: {
                path: "$Exam",
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
      console.log("error is getPaper() in aggregation!!");
    }
  }
  getLoginData(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "states",
                let: { stateId: "$state_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$stateId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "state_name",
              },
            },
            {
              $unwind: {
                path: "$state_name",
              },
            },
            {
              $lookup: {
                from: "cities",
                let: { cityId: "$city_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$cityId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "city_name",
              },
            },
            {
              $unwind: {
                path: "$city_name",
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
      console.log("error is getCity() in aggregation!!");
    }
  }

  getCourses(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "subjects",
                let: { subjectId: "$subject_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$subjectId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "subject_name",
              },
            },
            {
              $unwind: {
                path: "$subject_name",
              },
            },
            {
              $lookup: {
                from: "lessons",
                let: { lessonId: "$lesson_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$lessonId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "lesson_name",
              },
            },
            {
              $unwind: {
                path: "$lesson_name",
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
      console.log("error is getLesson() in aggregation!!");
    }
  }

  getPackage(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "package_categories",
                let: { packageId: "$package_category" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$packageId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "package_name",
              },
            },
            {
              $unwind: {
                path: "$package_name",
              },
            },
            // {
            //   $lookup: {
            //     from: "exams",
            //     let: { examId: "$exam_id" },
            //     pipeline: [
            //       {
            //         $match: {
            //           $expr: {
            //             $and: [
            //               {
            //                 $eq: ["$_id", "$$examId"],
            //               },
            //             ],
            //           },
            //         },
            //       },
            //     ],
            //     as: "exam_name",
            //   },
            // },
            // {
            //   $unwind: {
            //     path: "$exam_name",
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
      console.log("error is getLesson() in aggregation!!");
    }
  }

  getMycourse(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "packages",
                let: { packageId: "$package_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$packageId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "package_data",
              },
            },
            {
              $unwind: {
                path: "$package_data",
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
      console.log("error is getLesson() in aggregation!!");
    }
  }

  getVideoCourses(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "subjects",
                let: { subjectId: "$subject_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$subjectId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "subject_name",
              },
            },
            {
              $unwind: {
                path: "$subject_name",
              },
            },
            {
              $lookup: {
                from: "lessons",
                let: { lessonId: "$lesson_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$lessonId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "lesson_name",
              },
            },
            {
              $unwind: {
                path: "$lesson_name",
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
      console.log("error is getLesson() in aggregation!!");
    }
  }
  getQuestion(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "subjects",
                let: { subjectId: "$subject_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$subjectId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "subject_name",
              },
            },
            {
              $unwind: {
                path: "$subject_name",
              },
            },
            {
              $lookup: {
                from: "languages",
                let: { langId: "$lang_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$langId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "language_name",
              },
            },
            {
              $unwind: {
                path: "$language_name",
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
      console.log("error is getQuestion() in aggregation!!");
    }
  }

  getResult(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "users",
                let: { userId: "$user_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$userId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "user_name",
              },
            },
            {
              $unwind: {
                path: "$user_name",
              },
            },
            {
              $lookup: {
                from: "paper",
                let: { paperId: "$paper_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$paperId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "paper_name",
              },
            },
            {
              $unwind: {
                path: "$paper_name",
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
      console.log("error is getQuestion() in aggregation!!");
    }
  }

  getSubCategory(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "product_categories",
                let: { catId: "$cat_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$catId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "category_name",
              },
            },
            {
              $unwind: {
                path: "$category_name",
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
      console.log("error is getSubCategory() in aggregation!!");
    }
  }
  getProduct(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "product_categories",
                let: { catId: "$cat_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$catId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "category_name",
              },
            },
            {
              $unwind: {
                path: "$category_name",
              },
            },
            {
              $lookup: {
                from: "product_subcategories",
                let: { subcatId: "$subcat_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$subcatId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "subcategory_name",
              },
            },
            {
              $unwind: {
                path: "$subcategory_name",
              },
            },
            {
              $lookup: {
                from: "publishers",
                let: { publisherId: "$publisher_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$publisherId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "publisher_name",
              },
            },
            {
              $unwind: {
                path: "$publisher_name",
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
      console.log("error is getPublisher() in aggregation!!");
    }
  }

  getSubjectPackage(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "subjects",
                let: { subID: "$subject_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$_id", "$$subID"] },
                          { $eq: ["$delete_status", false] },
                        ],
                      },
                    },
                  },
                  // { $match: { $expr: { $eq: ["$_id", "$$subID"] }, } },
                  {
                    $lookup: {
                      from: "lessons",
                      let: { lesID: "$subject_id" },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $and: [
                                { $eq: ["$subject_id", "$$subID"] },
                                { $eq: ["$delete_status", false] },
                              ],
                            },
                          },
                        },
                        // {
                        //   $match: {
                        //     $expr: { $eq: ["$subject_id", "$$subID"] },
                        //   },
                        // },
                        {
                          $lookup: {
                            from: "videocourses",
                            let: { lesID: "$_id" },
                            pipeline: [
                              {
                                $match: {
                                  $expr: {
                                    $and: [
                                      { $eq: ["$lesson_id", "$$lesID"] },
                                      { $eq: ["$delete_status", false] },
                                    ],
                                  },
                                },
                              },
                              // {
                              //   $match: {
                              //     $expr: { $eq: ["$lesson_id", "$$lesID"] },
                              //   },
                              // },
                            ],
                            as: "video_data",
                          },
                        },
                      ],
                      as: "lesson_data",
                    },
                  },
                ],
                as: "subject_data",
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
      console.log("error is getPackSub() in aggregation!!");
    }
  }

  getSubjectbyPackage(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "subjects",
                let: { subID: "$subject_id" },
                pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$subID"] } } }],
                as: "subject_data",
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
      console.log("error is getPackSub() in aggregation!!");
    }
  }

  getBookmark(filter) {
    try {
      return new Promise((resolve, reject) => {
        this.collection.aggregate(
          [
            {
              $match: filter,
            },
            {
              $lookup: {
                from: "videocourses",
                let: { videoId: "$video_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$_id", "$$videoId"],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: "video_details",
              },
            },
            {
              $unwind: {
                path: "$video_details",
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
      console.log("error is getBookmark() in aggregation!!");
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
