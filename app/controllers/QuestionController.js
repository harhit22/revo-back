const Controller = require("../controllers/Controller");
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const Question = require("../models/QuestionSchema").Question;
const ObjectID = require("mongodb").ObjectID;

class QuestionController extends Controller {
  constructor() {
    super();
  }

  async AddQuestion() {
    try {
      let addQ = this.req.body;
      let addQuestion = await new Model(Question).store(addQ);
      if (addQuestion != null) {
        this.res.send({ status: 1, message: "question added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured..please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add question api",
        function_name: "AddQuestion()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetQuestion() {
    try {
      if (this.req.body.lang_id) {
        let langID = ObjectID(this.req.body.lang_id);
        let byLang = await Question.find({
          lang_id: ObjectID(langID),
          is_delete: false,
        });
        if (byLang != null) {
          this.res.send({
            status: 1,
            message: "question returned by language",
            data: byLang,
          });
        }
      } else if (this.req.body.subject_id) {
        let subID = ObjectID(this.req.body.subject_id);
        let bySub = await Question.find({
          subject_id: ObjectID(subID),
          is_delete: false,
        });
        if (bySub != null) {
          this.res.send({
            status: 1,
            message: "questions returned by subject",
            data: bySub,
          });
        }
      } else if (this.req.body.difficulty) {
        let diff = this.req.body.difficulty;
        let byDif = await Question.find({ difficulty: diff, is_delete: false });
        if (byDif != null) {
          this.res.send({
            status: 1,
            message: "question returned by difficulty level",
            data: byDif,
          });
        }
      } else if (this.req.body.question_id) {
        let Q = ObjectID(this.req.body.question_id);
        let byQID = await Question.find({ _id: ObjectID(Q), is_delete: false });
        if (byQID != null) {
          this.res.send({
            status: 1,
            message: "single question returned",
            data: byQID,
          });
        }
      } else {
        let getAll = await Question.find({});
        if (getAll != null) {
          this.res.send({
            status: 1,
            message: "all questions returned",
            data: getAll,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occoured..please try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get question api",
        function_name: "GetQuestion()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateQuestion() {
    try {
      if (!this.req.body.is_delete) {
        let updateData = this.req.body;
        let UpdateQues = await Question.findByIdAndUpdate(
          this.req.body.question_id,
          updateData
        );
        if (UpdateQues != null) {
          this.res.send({
            status: 1,
            message: "question updated successfully",
          });
        }
      } else {
        let delQues = await Question.findByIdAndUpdate(
          this.req.body.question_id,
          {
            is_delete: true,
          }
        );
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update question api",
        function_name: "UpdateQuestion()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}

module.exports = QuestionController;
