const CityController = require("../controllers/CityConroller");
const ExamCategoryController = require("../controllers/ExamCategoryController");
const StateController = require("../controllers/StateController");
const ExamController = require("../controllers/ExamController");
const LanguageController = require("../controllers/LanguageController");
const PaperControlller = require("../controllers/PaperController");
const SubjectController = require("../controllers/SubjectsController");
const QuestionController = require("../controllers/QuestionController");
const ResultController = require("../controllers/ResultController");
const BannerController = require("../controllers/BannerController");
module.exports = (app, express) => {
  const router = express.Router();
  const Globals = require("../../configs/globals");

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

  //  subject routes

  router.post("/add_subject", (req, res) => {
    const subjectObj = new SubjectController().boot(req, res);
    return subjectObj.AddSubject();
  });

  router.post("/get_subject", (req, res) => {
    const subjectObj = new SubjectController().boot(req, res);
    return subjectObj.GetSubject();
  });

  router.post("/update_subject", (req, res) => {
    const subjectObj = new SubjectController().boot(req, res);
    return subjectObj.UpdateSubject();
  });

  // question paper routes

  router.post("/add_question", (req, res) => {
    const questionObj = new QuestionController().boot(req, res);
    return questionObj.AddQuestion();
  });

  router.post("/get_question", (req, res) => {
    const questionObj = new QuestionController().boot(req, res);
    return questionObj.GetQuestion();
  });

  router.post("/update_question", (req, res) => {
    const questionObj = new QuestionController().boot(req, res);
    return questionObj.UpdateQuestion();
  });

  // results routes

  router.post("/add_result", (req, res) => {
    const resultObj = new ResultController().boot(req, res);
    return resultObj.AddResult();
  });

  router.post("/get_result", (req, res) => {
    const resultObj = new ResultController().boot(req, res);
    return resultObj.GetResult();
  });

  router.post("/update_result", (req, res) => {
    const resultObj = new ResultController().boot(req, res);
    return resultObj.UpdateResult();
  });

  //banner routes

  router.post("/add_banner", (req, res) => {
    const bannerObj = new BannerController().boot(req, res);
    return bannerObj.AddBanner();
  });

  router.post("/get_banner", (req, res) => {
    const bannerObj = new BannerController().boot(req, res);
    return bannerObj.GetBanner();
  });

  router.post("/update_banner", (req, res) => {
    const bannerObj = new BannerController().boot(req, res);
    return bannerObj.UpdateBanner();
  });

  app.use(config.baseApiUrl, router);
};
