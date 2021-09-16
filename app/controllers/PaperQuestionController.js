const Controller = require("../controllers/Controller");
const Globals = require("../../configs/globals");
const PaperQuestion = require("../models/PaperQuestionSchema").PaperQuestion;
const Model = require("../models/model");

class PaperQuestionController extends Controller {
  constructor() {
    super();
  }

  async AddPaperQuestion() {
    try {
      let addPaperQues = this.req.body;
      let addPaperQuestion = await new Model(PaperQuestion).store(addPaperQues);
      if (addPaperQuestion != null) {
        this.res.send({ status: 1, message: "data added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server....please again try after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add paper question api",
        function_name: "AddPaperQuestion()",
        error_title: error.name,
        description: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = PaperQuestionController;
