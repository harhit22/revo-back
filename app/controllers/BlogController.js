const Blog = require("../models/BlogSchema").Blog;
const Globals = require("../../configs/globals");
const Model = require("../models/model");
const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectId;

class BlogController extends Controller {
  constructor() {
    super();
  }

  async AddBlog() {
    try {
      let bodyData = this.req.body;
      let addBlog = new Model(Blog).store(bodyData);
      if (addBlog != null) {
        this.res.send({
          status: 1,
          message: "Blog data added successfully",
        });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add Add Blog api",
        function_name: "AddBlog()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetBlog() {
    try {
      if (!this.req.body.blog_id) {
        let allBlog = await Blog.find({});
        if (allBlog != null) {
          this.res.send({
            status: 1,
            message: "all Blog retuned successfully",
            data: allBlog,
          });
        }
      } else {
        let singleBlog = await Blog.findOne({
          _id: ObjectID(this.req.body.blog_id),
        });
        if (singleBlog != null) {
          this.res.send({
            status: 1,
            message: "single blog returned successfully",
            data: singleBlog,
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get Blog api",
        function_name: "GetBlog()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateBlog() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_Blog = await Blog.findByIdAndUpdate(
          ObjectID(this.req.body.blog_id),
          updateData
        );
        if (update_Blog != null) {
          this.res.send({
            status: 1,
            message: "Blog updated successfully",
          });
        }
      } else {
        let dData = this.req.body;
        let delBlog = await Blog.findByIdAndRemove(
          ObjectID(this.req.body.blog_id),
          dData
        );
        console.log(delBlog);
        if (delBlog != null) {
          this.res.send({
            status: 1,
            message: "Blog deleted successfully",
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occoured on server ....please try after some time",
      });

      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update Blog api",
        function_name: "UpdateBlog()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = BlogController;
