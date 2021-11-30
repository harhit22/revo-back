const Controller = require("./Controller");
const Review = require("../models/ReviewSchema").Review;
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectId;

class ReviewController extends Controller {
  constructor() {
    super();
  }

  async AddReview() {
    try {
      let reviewData = this.req.body;
      let review = await new Model(Review).store(reviewData);

      if (review != null) {
        this.res.send({ status: 1, message: "Review added successfully!!" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server. Please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "Add review Api",
        function_name: "AddReview()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetReview() {
    try {
      if (this.req.body.review_id) {
        let reviewID = ObjectID(this.req.body.review_id);
        let Getreview = await Review.find({
          _id: ObjectID(reviewID),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (Getreview != null) {
          this.res.send({
            status: 1,
            message: "return single review",
            data: Getreview,
          });
        }
      } else {
        let Getreviews = await Review.find({
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (Getreviews != null) {
          this.res.send({
            status: 1,
            message: "return all reviews",
            data: Getreviews,
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
        api_name: "get review api",
        function_name: "GetReview()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateReview() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_review = await Review.findByIdAndUpdate(
          this.req.body.review_id,
          updateData
        );
        if (update_review != null) {
          this.res.send({ status: 1, message: "reviews updated successfully" });
        }
      } else {
        let dData = this.req.body;
        let deletReview = await Review.findByIdAndUpdate(
          this.req.body.review_id,
          dData
        );

        console.log(deletReview);
        if (deletReview != null) {
          this.res.send({ status: 1, message: "review deleted successfully" });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update review api",
        function_name: "UpdateReview()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = ReviewController;
