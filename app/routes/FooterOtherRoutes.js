module.exports = (app, express) => {
    const router = express.Router();

    const FAQController=require("../controllers/FAQController")
    const PrivacyPollicyController=require("../controllers/PrivacyPollicesController")
    const TermAndConditionController=require("../controllers/TermAndConditionController")


    //footerFAQ

    router.post("/addfaq", (req, res) => {
        const FAQObj = new FAQController().boot(req, res);
        return FAQObj.AddFAQ();
      });
      router.post("/getfaq", (req, res) => {
        const FAQObj = new FAQController().boot(req, res);
        return FAQObj.GetFAQ();
      });

      router.post("/updatefaq", (req, res) => {
        const FAQObj = new FAQController().boot(req, res);
        return FAQObj.UpdateFAQ();
      });

      //Privacy Pollices

      router.post("/addprivacypolicy", (req, res) => {
        const PrivacyPolliceObj = new PrivacyPollicyController().boot(req, res);
        return PrivacyPolliceObj.AddPrivacyPollice();
      });
      router.post("/getprivacypolicy", (req, res) => {
        const PrivacyPollicyObj = new PrivacyPollicyController().boot(req, res);
        return PrivacyPollicyObj.GetPrivacyPollice();
      });

      router.post("/updateprivacypolicy", (req, res) => {
        const PrivacyPolliceObj = new PrivacyPollicyController().boot(req, res);
        return PrivacyPolliceObj.UpdatePrivatePollice();
      });
// Term and Condition

router.post("/addtermcondition", (req, res) => {
  const TermConditionObj = new TermAndConditionController().boot(req, res);
  return TermConditionObj.AddTermCondition();
});

router.post("/gettermcondition", (req, res) => {
  const TermConditionObj = new TermAndConditionController().boot(req, res);
  return TermConditionObj.GetTermAndCondition();
});

router.post("/upadatetermcondition", (req, res) => {
  const TermConditionObj = new TermAndConditionController().boot(req, res);
  return TermConditionObj.UpdateTermAndCondition();
});







    app.use(config.baseApiUrl, router);
}