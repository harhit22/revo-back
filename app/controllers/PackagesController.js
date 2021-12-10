const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;
const Package = require("../models/PackagesSchema").Package;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Agreegate = require("../models/Aggregations");
const Lesson = require("../models/LessonSchema").Lesson;
const Review = require("../models/ReviewSchema").Review;
const PackSub = require("../models/PackageSubjectSchema").PackSub;

class PackageController extends Controller {
  constructor() {
    super();
  }

  async AddPackage() {
    try {
      let data = this.req.body;
      let addPackage = await new Model(Package).store(data);
      if (addPackage != null) {
        this.res.send({ status: 1, message: "packages added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server...please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add package api",
        function_name: "AddPackage()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetPackage() {
    try {
      if (this.req.body.exam_id) {
        let examID = ObjectID(this.req.body.exam_id);
        let getPackage = await Package.find({
          exam_id: ObjectID(examID),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (getPackage != null) {
          this.res.send({
            status: 1,
            message: "return package by exam",
            data: getPackage,
          });
        }
      } else if (this.req.body.is_free) {
        let freePackage = await Package.find({
          is_free: true,
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (freePackage != null) {
          this.res.send({
            status: 1,
            message: "return free packages",
            data: freePackage,
          });
        }
        console.log(freePackage);
      } else if (this.req.body.packageCat_id) {
        let packageCat = await Package.find({
          package_category: ObjectID(this.req.body.packageCat_id),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (packageCat != null) {
          this.res.send({
            status: 1,
            message: "return package by category",
            data: packageCat,
          });
        }
      } else if (this.req.body.package_id) {
        let lessonCount = await Lesson.find({
          package_id: ObjectID(this.req.body.package_id),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        }).count();

        let newArr = [];
        let all_ratings = await Review.find(
          {
            package_id: ObjectID(this.req.body.package_id),
            delete_status: false,
            app_id: ObjectID(this.req.body.app_id),
          },
          { rating: 1, _id: 0 }
        );
        let all_review = all_ratings.length;
        all_ratings.forEach((element) => newArr.push(element.rating));
        let sum_rating = newArr.reduce((a, b) => a + b, 0);
        console.log("sum rating ", sum_rating);
        let average_rating = (sum_rating / all_review).toFixed(1);

        let packageid = await Package.findOne({
          _id: ObjectID(this.req.body.package_id),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        }).lean();
        packageid["total_lessons"] = lessonCount;
        packageid["average_rating"] = parseInt(average_rating)
          ? parseInt(average_rating)
          : 0;
        packageid["total_reviews"] = all_review;
        // console.log("package by id ", packageid);
        if (packageid != null) {
          this.res.send({
            status: 1,
            message: "single package return",
            data: packageid,
          });
        }
      } else {
        const filter = {
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        };
        let gpackage = await new Agreegate(Package).getPackage(filter);
        console.log(gpackage);
        if (gpackage != null) {
          this.res.send({
            status: 1,
            message: "all packages returned successfully",
            data: gpackage,
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
        api_name: "get package api",
        function_name: "GetPackage()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdatePackage() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_package = await Package.findByIdAndUpdate(
          ObjectID(this.req.body.package_id),
          updateData
        );
        if (update_package != null) {
          this.res.send({
            status: 1,
            message: "packages updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let deletePackage = await Package.findByIdAndUpdate(
          ObjectID(this.req.body.package_id),
          dData
        );
        console.log(deletePackage);
        if (deletePackage != null) {
          this.res.send({
            status: 1,
            message: "package deleted successfully",
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update package api",
        function_name: "UpdatePackage()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async AddSubjectPackage() {
    try {
      let addData = this.req.body;
      let packageData = await new Model(PackSub).store(addData);
      if (packageData != null) {
        this.res.send({ status: 1, message: "data added successfully" });
      }
    } catch (error) {
      this.res.send({ status: 1, message: "some error occured" });
    }
  }

  async GetPackageStructure() {
    try {
      let filter = {
        package_id: ObjectID(this.req.body.package_id),
        app_id: ObjectID(this.req.body.app_id),
      };
      let packageData = await new Agreegate(PackSub).getSubjectPackage(filter);
      // console.log(packageData[0].subject_data[0].lesson_data[0].video_data);
      if (packageData != null) {
        this.res.send({
          status: 1,
          message: "package with all data returned successfully",
          data: packageData,
        });
      }
    } catch (error) {
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update package api",
        function_name: "GetPackageStructure()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = PackageController;
