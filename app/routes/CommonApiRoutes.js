const CityController = require("../controllers/CityConroller");
const ExamCategoryController = require("../controllers/ExamCategoryController");
const StateController = require("../controllers/StateController");
const ExamController = require("../controllers/ExamController");
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

  app.use(config.baseApiUrl, router);
};
