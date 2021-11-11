module.exports = (app, express) => {
  const router = express.Router();
  const AdminController = require("../controllers/AdminController");
  const SubAdminController = require("../controllers/SubAdminController");
  const AppController = require("../controllers/AppController");

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

  // subadmin routes

  router.post("/registerSubAdmin", (req, res) => {
    const subAdminObj = new SubAdminController().boot(req, res);
    return subAdminObj.RegisterSubAdmin();
  });

  router.post("/loginSubAdmin", (req, res) => {
    const subAdminObj = new SubAdminController().boot(req, res);
    return subAdminObj.LoginSubAdmin();
  });

  router.post("/changePasswordSubAdmin", (req, res) => {
    const subAdminObj = new SubAdminController().boot(req, res);
    return subAdminObj.ChangePasswordSubAdmin();
  });

  router.post("/updateProfileSubAdmin", (req, res) => {
    const subAdminObj = new SubAdminController().boot(req, res);
    return subAdminObj.UpdateProfileSubAdmin();
  });

  router.post("/getSubAdmin", (req, res) => {
    const subAdminObj = new SubAdminController().boot(req, res);
    return subAdminObj.GetSubAdmin();
  });

  router.post("/deleteSubAdmin", (req, res) => {
    const subAdminObj = new SubAdminController().boot(req, res);
    return subAdminObj.DeleteSubAdmin();
  });

  router.post("/addApp", (req, res) => {
    const appObj = new AppController().boot(req, res);
    return appObj.AddApp();
  });

  router.post("/getApp", (req, res) => {
    const appObj = new AppController().boot(req, res);
    return appObj.GetApp();
  });

  router.post("/deleteApp", (req, res) => {
    const appObj = new AppController().boot(req, res);
    return appObj.DeleteApp();
  });

  app.use(config.baseApiUrl, router);
};
