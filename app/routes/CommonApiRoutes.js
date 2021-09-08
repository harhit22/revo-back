const CityController = require("../controllers/CityConroller");
const ExamCategoryController = require("../controllers/ExamCategoryController");
const StateController = require("../controllers/StateController");
const ExamController = require("../controllers/ExamController");
const LanguageController = require("../controllers/LanguageController");
const PaperControlller = require("../controllers/PaperController");
// const PaperSubjectController = require("../controllers/PaperSubjectController");
// const QuestionController = require("../controllers/QuestionController");
module.exports = (app, express) => {
  const router = express.Router();
  const Globals = require("../../configs/Globals");

  //   states routes

  router.post("/add_state", (req, res) => {
    const stateObj = new StateController().boot(req, res);
    return stateObj.AddState();
  });

  router.post("/get_state", (req, res) => {
    const stateObj = new StateController().boot(req, res);
    return stateObj.GetState();
  });

  router.post("/update_state", (req, res) => {
    const stateObj = new StateController().boot(req, res);
    return stateObj.UpdateState();
  });

  //   city routes

  router.post("/add_city", (req, res) => {
    const cityObj = new CityController().boot(req, res);
    return cityObj.AddCity();
  });

  router.post("/get_city", (req, res) => {
    const cityObj = new CityController().boot(req, res);
    return cityObj.GetCity();
  });

  router.post("/update_city", (req, res) => {
    const cityObj = new CityController().boot(req, res);
    return cityObj.UpdateCity();
  });

  // examcategory routes

  router.post("/add_examCategory", (req, res) => {
    const catObj = new ExamCategoryController().boot(req, res);
    return catObj.AddExamCat();
  });

  router.post("/get_examCategory", (req, res) => {
    const catObj = new ExamCategoryController().boot(req, res);
    return catObj.GetExamCat();
  });

  router.post("/update_examCategory", (req, res) => {
    const catObj = new ExamCategoryController().boot(req, res);
    return catObj.UpdateExamCat();
  });

  // exam routes

  router.post("/add_exam", (req, res) => {
    const examObj = new ExamController().boot(req, res);
    return examObj.AddExam();
  });

  router.post("/get_exam", (req, res) => {
    const examObj = new ExamController().boot(req, res);
    return examObj.GetExam();
  });

  router.post("/update_exam", (req, res) => {
    const examObj = new ExamController().boot(req, res);
    return examObj.UpdateExam();
  });

  // language routes

  router.post("/add_lang", (req, res) => {
    const langObj = new LanguageController().boot(req, res);
    return langObj.AddLang();
  });

  router.post("/get_lang", (req, res) => {
    const langObj = new LanguageController().boot(req, res);
    return langObj.GetLang();
  });

  router.post("/update_lang", (req, res) => {
    const langObj = new LanguageController().boot(req, res);
    return langObj.UpdateLang();
  });

  // paper routes

  router.post("/add_paper", (req, res) => {
    const paperObj = new PaperControlller().boot(req, res);
    return paperObj.AddPaper();
  });

  router.post("/get_paper", (req, res) => {
    const paperObj = new PaperControlller().boot(req, res);
    return paperObj.GetPaper();
  });

  router.post("/update_paper", (req, res) => {
    const paperObj = new PaperControlller().boot(req, res);
    return paperObj.UpdatePaper();
  });

  app.use(config.baseApiUrl, router);
};
