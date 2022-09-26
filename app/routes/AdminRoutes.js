module.exports = (app, express) => {
  const router = express.Router();
  const AdminController = require("../controllers/AdminController");
  const HeroSliderController = require("../controllers/HeroSliderController");
  const HomeServicesController = require("../controllers/HomeServicesController");
  const HomeAboutController = require("../controllers/HomeAboutController");
  const HomeExperienceController = require("../controllers/HomeExperinceController");
  const HomePortfolioController = require("../controllers/HomePortfolioController");
  const HomeTustedClient = require("../controllers/HomeTrustedClient");
  const HomeTeamController = require("../controllers/HomeTeamController");
  const QuoteController = require("../controllers/QuoteController");
  const HomeBlogController = require("../controllers/HomeBlogController");
  const FunfactController = require("../controllers/FunFactController");
  const HeaderController = require("../controllers/HeaderController");
  const HomeClientController = require("../controllers/HomeClientController");
  const FooterController = require("../controllers/FooterController");
  const TeamListController = require("../controllers/TeamListController");

  //   Admin routes
  router.post("/registerAdmin", (req, res) => {
    const adminObj = new AdminController().boot(req, res);
    return adminObj.RegisterAdmin();
  });

  router.post("/loginAdmin", (req, res) => {
    const adminObj = new AdminController().boot(req, res);
    return adminObj.LoginAdmin();
  });

  router.post("/changePasswordAdmin", (req, res) => {
    const adminObj = new AdminController().boot(req, res);
    return adminObj.ChangePasswordAdmin();
  });

  router.post("/updateProfileAdmin", (req, res) => {
    const adminObj = new AdminController().boot(req, res);
    return adminObj.UpdateProfileAdmin();
  });

  // ------------Header Api--------------------------------

  router.post("/addLogo", (req, res) => {
    const headerObj = new HeaderController().boot(req, res);
    return headerObj.AddLogo();
  });

  router.post("/getLogo", (req, res) => {
    const headerObj = new HeaderController().boot(req, res);
    return headerObj.GetLogo();
  });

  router.post("/updateLogo", (req, res) => {
    const headerObj = new HeaderController().boot(req, res);
    return headerObj.UpdateLogo();
  });

  router.post("/addMenu", (req, res) => {
    const headerObj = new HeaderController().boot(req, res);
    return headerObj.AddMenu();
  });

  router.post("/getMenu", (req, res) => {
    const headerObj = new HeaderController().boot(req, res);
    return headerObj.GetMenu();
  });

  router.post("/updateMenu", (req, res) => {
    const headerObj = new HeaderController().boot(req, res);
    return headerObj.UpdateMenu();
  });

  // ------------Hero Sliders Api--------------------------------

  router.post("/addHeroSlider", (req, res) => {
    const sliderObj = new HeroSliderController().boot(req, res);
    return sliderObj.AddSlider();
  });

  router.post("/getHeroSlider", (req, res) => {
    const sliderObj = new HeroSliderController().boot(req, res);
    return sliderObj.GetSlider();
  });

  router.post("/updateHeroSlider", (req, res) => {
    const sliderObj = new HeroSliderController().boot(req, res);
    return sliderObj.UpdateSlider();
  });

  // -----------------------Home Services Api -----------------

  router.post("/addHomeServices", (req, res) => {
    const HomeServicesObj = new HomeServicesController().boot(req, res);
    return HomeServicesObj.AddHomeServices();
  });

  router.post("/getHomeServices", (req, res) => {
    const HomeServicesObj = new HomeServicesController().boot(req, res);
    return HomeServicesObj.GetHomeServices();
  });

  router.post("/updateHomeServices", (req, res) => {
    const HomeServicesObj = new HomeServicesController().boot(req, res);
    return HomeServicesObj.UpdateHomeServices();
  });

  // -----------------------Home About Api -----------------

  router.post("/addHomeAbout", (req, res) => {
    const HomeAboutObj = new HomeAboutController().boot(req, res);
    return HomeAboutObj.AddHomeAbout();
  });

  router.post("/getHomeAbout", (req, res) => {
    const HomeAboutObj = new HomeAboutController().boot(req, res);
    return HomeAboutObj.GetHomeAbout();
  });

  router.post("/updateHomeAbout", (req, res) => {
    const HomeAboutObj = new HomeAboutController().boot(req, res);
    return HomeAboutObj.UpdateHomeAbout();
  });

  // -----------------------Home Experience Api -----------------

  router.post("/addHomeExp", (req, res) => {
    const HomeExpObj = new HomeExperienceController().boot(req, res);
    return HomeExpObj.AddHomeExperience();
  });

  router.post("/getHomeExp", (req, res) => {
    const HomeExpObj = new HomeExperienceController().boot(req, res);
    return HomeExpObj.GetHomeExperience();
  });

  router.post("/updateHomeExp", (req, res) => {
    const HomeExpObj = new HomeExperienceController().boot(req, res);
    return HomeExpObj.UpdateHomeExperience();
  });

  // --------------------------Home portfolio api---------------

  router.post("/addHomePortfolio", (req, res) => {
    const HomePortObj = new HomePortfolioController().boot(req, res);
    return HomePortObj.AddHomePortfolio();
  });

  router.post("/getHomePortfolio", (req, res) => {
    const HomePortObj = new HomePortfolioController().boot(req, res);
    return HomePortObj.GetHomePortfolio();
  });

  router.post("/updateHomePortfolio", (req, res) => {
    const HomePortObj = new HomePortfolioController().boot(req, res);
    return HomePortObj.UpdateHomePortfolio();
  });

  // --------------------------Home Funfact  api---------------

  router.post("/addFunfact", (req, res) => {
    const FunfactObj = new FunfactController().boot(req, res);
    return FunfactObj.AddFunfact();
  });

  router.post("/getFunfact", (req, res) => {
    const FunfactObj = new FunfactController().boot(req, res);
    return FunfactObj.GetFunfact();
  });

  router.post("/updateFunfact", (req, res) => {
    const FunfactObj = new FunfactController().boot(req, res);
    return FunfactObj.UpdateFunfact();
  });

  // --------------------------Home Trusted client  api---------------

  router.post("/addHomeTrustedClient", (req, res) => {
    const HomeTrustedClientObj = new HomeTustedClient().boot(req, res);
    return HomeTrustedClientObj.AddHomeTrustedClient();
  });

  router.post("/getHomeTrustedClient", (req, res) => {
    const HomeTrustedClientObj = new HomeTustedClient().boot(req, res);
    return HomeTrustedClientObj.GetHomeTrustedClient();
  });

  router.post("/updateHomeTrustedClient", (req, res) => {
    const HomeTrustedClientObj = new HomeTustedClient().boot(req, res);
    return HomeTrustedClientObj.UpdateHomeTrustedClient();
  });

  // --------------------------Home team  api---------------

  router.post("/addHomeTeam", (req, res) => {
    const HomeTeamObj = new HomeTeamController().boot(req, res);
    return HomeTeamObj.AddHomeTeam();
  });

  router.post("/getHomeTeam", (req, res) => {
    const HomeTeamObj = new HomeTeamController().boot(req, res);
    return HomeTeamObj.GetHomeTeam();
  });

  router.post("/updateHomeTeam", (req, res) => {
    const HomeTeamObj = new HomeTeamController().boot(req, res);
    return HomeTeamObj.UpdateHomeTeam();
  });

  // --------------------------Home quote  api---------------

  router.post("/addQuote", (req, res) => {
    const QuoteObj = new QuoteController().boot(req, res);
    return QuoteObj.AddQuote();
  });

  router.post("/getQuote", (req, res) => {
    const QuoteObj = new QuoteController().boot(req, res);
    return QuoteObj.GetQuote();
  });

  router.post("/updateQuote", (req, res) => {
    const QuoteObj = new QuoteController().boot(req, res);
    return QuoteObj.UpdateQuote();
  });

  // --------------------------Home Blog  api---------------

  router.post("/addHomeBlog", (req, res) => {
    const HomeBlogObj = new HomeBlogController().boot(req, res);
    return HomeBlogObj.AddHomeBlog();
  });

  router.post("/getHomeBlog", (req, res) => {
    const HomeBlogObj = new HomeBlogController().boot(req, res);
    return HomeBlogObj.GetHomeBlog();
  });

  router.post("/updateHomeBlog", (req, res) => {
    const HomeBlogObj = new HomeBlogController().boot(req, res);
    return HomeBlogObj.UpdateHomeBlog();
  });

  // --------------------------Home client  api---------------

  router.post("/addHomeClient", (req, res) => {
    const HomeClientObj = new HomeClientController().boot(req, res);
    return HomeClientObj.AddHomeClient();
  });

  router.post("/getHomeClient", (req, res) => {
    const HomeClientObj = new HomeClientController().boot(req, res);
    return HomeClientObj.GetHomeClient();
  });

  router.post("/updateHomeClient", (req, res) => {
    const HomeClientObj = new HomeClientController().boot(req, res);
    return HomeClientObj.UpdateHomeClient();
  });

  router.post("/addClientCrousal", (req, res) => {
    const HomeClientObj = new HomeClientController().boot(req, res);
    return HomeClientObj.AddClientCrousal();
  });

  router.post("/getClientCrousal", (req, res) => {
    const HomeClientObj = new HomeClientController().boot(req, res);
    return HomeClientObj.GetClientCrousal();
  });

  router.post("/updateClientCrousal", (req, res) => {
    const HomeClientObj = new HomeClientController().boot(req, res);
    return HomeClientObj.UpdateClientCrousal();
  });

  // --------------------------Footer  api---------------

  router.post("/addFooter", (req, res) => {
    const footerObj = new FooterController().boot(req, res);
    return footerObj.AddFooter();
  });

  router.post("/getFooter", (req, res) => {
    const footerObj = new FooterController().boot(req, res);
    return footerObj.GetFooter();
  });

  router.post("/updateFooter", (req, res) => {
    const footerObj = new FooterController().boot(req, res);
    return footerObj.UpdateFooter();
  });

  // --------------------------Team list  api---------------

  router.post("/addTeamList", (req, res) => {
    const teamListObj = new TeamListController().boot(req, res);
    return teamListObj.AddTeamList();
  });

  router.post("/getTeamList", (req, res) => {
    const teamListObj = new TeamListController().boot(req, res);
    return teamListObj.GetTeamList();
  });

  router.post("/updateTeamList", (req, res) => {
    const teamListObj = new TeamListController().boot(req, res);
    return teamListObj.UpdateTeamList();
  });

  // router.get("/", (req, res) => {
  //   res.send({ status: 1, message: "this is home route!!" });
  // });

  app.use(config.baseApiUrl, router);
};
