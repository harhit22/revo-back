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
const LessonController = require("../controllers/LessonController");
const CourseContentController = require("../controllers/CourseContentController");
const HomeBannerController = require("../controllers/HomeBannerController");
const PackageCategoryController = require("../controllers/PackageCategoryController");
const VideoCoursesController = require("../controllers/VideoCourseController");
const CoursesRecommedationController = require("../controllers/CoursesRecommedationController");

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

  router.post("/get_resultCount", (req, res) => {
    const resultObj = new ResultController().boot(req, res);
    return resultObj.GetResultCount();
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

  //Lesson routes

  router.post("/add_lesson", (req, res) => {
    const lessonObj = new LessonController().boot(req, res);
    return lessonObj.AddLesson();
  });

  router.post("/get_lesson", (req, res) => {
    const lessonObj = new LessonController().boot(req, res);
    return lessonObj.GetLesson();
  });

  router.post("/update_lesson", (req, res) => {
    const lessonObj = new LessonController().boot(req, res);
    return lessonObj.UpdateLesson();
  });

  //courses

  router.post("/add_courses", (req, res) => {
    const coursesObj = new CourseContentController().boot(req, res);
    return coursesObj.AddContent();
  });

  router.post("/get_courses", (req, res) => {
    const coursesObj = new CourseContentController().boot(req, res);
    return coursesObj.GetCourses();
  });

  router.post("/update_courses", (req, res) => {
    const courseObj = new CourseContentController().boot(req, res);
    return courseObj.UpdateContent();
  });

  // home Banner

  router.post("/add_homeBanner", (req, res) => {
    const homeBannerObj = new HomeBannerController().boot(req, res);
    return homeBannerObj.AddHomeBanner();
  });

  router.post("/get_homeBanner", (req, res) => {
    const homeBannerObj = new HomeBannerController().boot(req, res);
    return homeBannerObj.GetHomeBanner();
  });

  router.post("/update_homeBanner", (req, res) => {
    const homeBannerObj = new HomeBannerController().boot(req, res);
    return homeBannerObj.UpdateHomeBanner();
  });

  // package category

  router.post("/add_packagecat", (req, res) => {
    const packageCatObj = new PackageCategoryController().boot(req, res);
    return packageCatObj.AddPackageCat();
  });

  router.post("/get_packagecat", (req, res) => {
    const packageCatObj = new PackageCategoryController().boot(req, res);
    return packageCatObj.GetPackageCat();
  });

  router.post("/update_packagecat", (req, res) => {
    const packageCatObj = new PackageCategoryController().boot(req, res);
    return packageCatObj.UpdatePackageCat();
  });

  // video courses

  router.post("/add_videoes", (req, res) => {
    const videoObj = new VideoCoursesController().boot(req, res);
    return videoObj.AddVideoCourse();
  });

  router.post("/get_videoes", (req, res) => {
    const videoObj = new VideoCoursesController().boot(req, res);
    return videoObj.GetVideoCourse();
  });

  router.post("/update_videoes", (req, res) => {
    const videoObj = new VideoCoursesController().boot(req, res);
    return videoObj.UpdateVideoCourse();
  });

  // recommmedation

  router.post("/get_recommededCourses", (req, res) => {
    const recObj = new CoursesRecommedationController().boot(req, res);
    return recObj.GetCoursesRecommedation();
  });

  app.use(config.baseApiUrl, router);
};
