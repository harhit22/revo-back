const Bookmarks = require("../models/BookmarkSchema").Bookmarks;
const Model = require("../models/model");
const Controller = require("../controllers/Controller");
const ObjectID = require("mongodb").ObjectId;
const Globals = require("../../configs/globals");
const Aggregate = require("../models/Aggregations");

class BookmarkController extends Controller {
  constructor() {
    super();
  }

  async AddBookmark() {
    try {
      let bodyData = this.req.body;
      let addBookmark = await new Model(Bookmarks).store(bodyData);
      if (addBookmark != null) {
        this.res.send({
          status: 1,
          message: "Information Bookmarkrd Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occured..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "bookmark api",
        function_name: "AddBookmark()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetBookmark() {
    try {
      let filter = {
        app_id: ObjectID(this.req.body.app_id),
        user_id: ObjectID(this.req.body.user_id),
      };
      let getBookmark = await new Aggregate(Bookmarks).getBookmark(filter);
      if (getBookmark != null) {
        this.res.send({
          status: 1,
          message: "bookmark returned",
          data: getBookmark,
        });
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occured..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "bookmark api",
        function_name: "GetBookmark()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async RemoveBookmark() {
    try {
      let delBookmark = await Bookmarks.findByIdAndRemove({
        _id: ObjectID(this.req.body.bookmark_id),
      });
      if (delBookmark != null) {
        this.res.send({ status: 1, message: "bookmark removed" });
      }
    } catch (error) {
      console.log(error);
      this.res.send({
        status: 0,
        message: "some error occured..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "bookmark api",
        function_name: "RemoveBookmark()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = BookmarkController;
