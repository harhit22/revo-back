const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;
const VideoCourses = require("../models/VideoCoursesSchema").VideoCourses;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Agreegate = require("../models/Aggregations");
const Transaction = require("../models/TransactionSchema").Transactions;
const PackageProgress = require("../models/PackageProgressSchema").Progress;

class VideoCoursesController extends Controller {
  constructor() {
    super();
  }

  async AddVideoCourse() {
    try {
      let data = this.req.body;
      let addVideo = await new Model(VideoCourses).store(data);
      if (addVideo != null) {
        this.res.send({
          status: 1,
          message: "Video course added successfully",
        });
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
        api_name: "add video course api",
        function_name: "AddVideoCourse()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetVideoCourse() {
    try {
      if (this.req.body.videoes_id) {
        let videoID = ObjectID(this.req.body.videoes_id);
        let GetVideoes = await VideoCourses.findOne({
          _id: ObjectID(videoID),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (GetVideoes != null) {
          this.res.send({
            status: 1,
            message: "return single video course",
            data: GetVideoes,
          });
        }
      } else {
        const filter = {
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        };
        let videoes = await new Agreegate(VideoCourses).getVideoCourses(filter);
        console.log(videoes);
        if (videoes != null) {
          this.res.send({
            status: 1,
            message: "all videoes returned successfully",
            data: videoes,
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message:
          "some error occoured on server....please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get course api",
        function_name: "GetCourses()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateVideoCourse() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_video = await VideoCourses.findByIdAndUpdate(
          ObjectID(this.req.body.videoCourse_id),
          updateData
        );
        if (update_video != null) {
          this.res.send({
            status: 1,
            message: "video course updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let deleteVideo = await VideoCourses.findByIdAndUpdate(
          ObjectID(this.req.body.videoCourse_id),
          dData
        );
        console.log(deleteVideo);
        if (deleteVideo != null) {
          this.res.send({
            status: 1,
            message: "video course  deleted successfully",
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update video course api",
        function_name: "UpdateVideoCourse()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetMyCourses() {
    try {
      let filter = {
        user_id: ObjectID(this.req.body.user_id),
        app_id: ObjectID(this.req.body.app_id),
        transaction_type: "video",
      };
      // let progress = await VideoCourses.find({
      //   package_id: this.req.body.package_id,
      // }).count();

      let gpackage = await new Agreegate(Transaction).getMycourse(filter);
      if (gpackage != null) {
        if (gpackage.length != 0) {
          gpackage.forEach(async (element, index) => {
            let totalVideos = await VideoCourses.find({
              package_id: element.package_data._id,
            }).count();

            let totalProgressVideoCount = await PackageProgress.find({
              user_id: this.req.body.user_id,
              app_id: this.req.body.app_id,
              package_id: element.package_data._id,
            }).count();

            console.log("total videos ", totalVideos);
            console.log("total progress videos ", totalProgressVideoCount);

            let percentage =
              (parseInt(totalProgressVideoCount) * 100) / totalVideos;
            element.package_data["progress_percentage"] = percentage;

            if (index == gpackage.length - 1) {
              this.res.send({
                status: 1,
                message: "course return successfully successfully",
                data: gpackage,
              });
            }
          });
        } else {
          this.res.send({
            status: 1,
            message: "no courses found",
            data: [],
          });
        }
      }
    } catch (error) {
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get my course api",
        function_name: "GetMyCourse()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = VideoCoursesController;
