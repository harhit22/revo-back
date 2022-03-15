module.exports = (app, express) => {
  const router = express.Router();
  const ContactUsController = require("../controllers/ContactUsController");
  const ContactUsFormController = require("../controllers/ContactUsFormController");

  //   contact us routes

  router.post("/addContactUs", (req, res) => {
    const contactUsObj = new ContactUsController().boot(req, res);
    return contactUsObj.AddContactUs();
  });

  router.post("/getContactUs", (req, res) => {
    const contactUsObj = new ContactUsController().boot(req, res);
    return contactUsObj.GetContactUs();
  });

  router.post("/updateContactUs", (req, res) => {
    const contactUsObj = new ContactUsController().boot(req, res);
    return contactUsObj.UpdateContactUs();
  });

  //   ---------contact us form api-------------

  router.post("/addContactUsForm", (req, res) => {
    const contactUsFormObj = new ContactUsFormController().boot(req, res);
    return contactUsFormObj.AddContactUsForm();
  });

  router.post("/getContactUsForm", (req, res) => {
    const contactUsFormObj = new ContactUsFormController().boot(req, res);
    return contactUsFormObj.GetContactUsForm();
  });

  router.post("/updateContactUsForm", (req, res) => {
    const contactUsFormObj = new ContactUsFormController().boot(req, res);
    return contactUsFormObj.UpdateContactUsForm();
  });

  app.use(config.baseApiUrl, router);
};
