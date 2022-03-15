module.exports = (app, express) => {
  const router = express.Router();
  const PageBanner = require("../controllers/PageBannerController");
  const AboutGetToKnowController = require("../controllers/AboutGetToKnowController");
  const AboutTestimonialController = require("../controllers/AboutTestimonialController");
  const AboutWhyUsController = require("../controllers/AboutWhyUsController");

  //   about head section routes
  router.post("/addPageBanner", (req, res) => {
    const addBannerObj = new PageBanner().boot(req, res);
    return addBannerObj.AddPageBanner();
  });

  router.post("/getPageBanner", (req, res) => {
    const addBannerObj = new PageBanner().boot(req, res);
    return addBannerObj.GetPageBanner();
  });

  router.post("/updatePageBanner", (req, res) => {
    const addBannerObj = new PageBanner().boot(req, res);
    return addBannerObj.UpdatePageBanner();
  });

  //   ---------Get to know api-------------

  router.post("/addGetToKnow", (req, res) => {
    const getToKnowObj = new AboutGetToKnowController().boot(req, res);
    return getToKnowObj.AddAboutGetToKnow();
  });

  router.post("/getGetToKnow", (req, res) => {
    const getToKnowObj = new AboutGetToKnowController().boot(req, res);
    return getToKnowObj.GetAboutGetToKnow();
  });

  router.post("/updateGetToKnow", (req, res) => {
    const getToKnowObj = new AboutGetToKnowController().boot(req, res);
    return getToKnowObj.UpdateAboutGetToKnow();
  });

  //   ---------Testimonial Api-------------

  router.post("/addTestimonialHead", (req, res) => {
    const testimonialObj = new AboutTestimonialController().boot(req, res);
    return testimonialObj.AddTestimonialHead();
  });

  router.post("/getTestimonialHead", (req, res) => {
    const testimonialObj = new AboutTestimonialController().boot(req, res);
    return testimonialObj.GetTestimonialHead();
  });

  router.post("/updateTestimonialHead", (req, res) => {
    const testimonialObj = new AboutTestimonialController().boot(req, res);
    return testimonialObj.UpdateTestimonialHead();
  });

  router.post("/addTestimonialCrousal", (req, res) => {
    const testimonialObj = new AboutTestimonialController().boot(req, res);
    return testimonialObj.AddTestimonialCrousal();
  });

  router.post("/getTestimonialCrousal", (req, res) => {
    const testimonialObj = new AboutTestimonialController().boot(req, res);
    return testimonialObj.GetTestimonialCrousal();
  });

  router.post("/updateTestimonialCrousal", (req, res) => {
    const testimonialObj = new AboutTestimonialController().boot(req, res);
    return testimonialObj.UpdateTestimonialCrousal();
  });

  // -------------------Why Us api----------------------

  router.post("/addWhyUs", (req, res) => {
    const whyUsObj = new AboutWhyUsController().boot(req, res);
    return whyUsObj.AddAboutWhyUs();
  });

  router.post("/getWhyUs", (req, res) => {
    const whyUsObj = new AboutWhyUsController().boot(req, res);
    return whyUsObj.GetAboutWhyUs();
  });

  router.post("/updateWhyUs", (req, res) => {
    const whyUsObj = new AboutWhyUsController().boot(req, res);
    return whyUsObj.UpdateAboutWhyUs();
  });

  app.use(config.baseApiUrl, router);
};
