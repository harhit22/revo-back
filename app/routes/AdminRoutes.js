const PackageCategoryController = require("../controllers/PackageCategoryController");

module.exports = (app, express) => {
  const router = express.Router();
  const AdminController = require("../controllers/AdminController");
  const SubAdminController = require("../controllers/SubAdminController");
  const AppController = require("../controllers/AppController");
  const PackageController = require("../controllers/PackagesController");

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

  router.post("/updateApp", (req, res) => {
    const appObj = new AppController().boot(req, res);
    return appObj.UpdateApp();
  });

  router.post("/verifySubDomain", (req, res) => {
    const appObj = new AppController().boot(req, res);
    return appObj.VerifySubDomain();
  });

  // package

  router.post("/add_package", (req, res) => {
    const packageObj = new PackageController().boot(req, res);
    return packageObj.AddPackage();
  });

  router.post("/get_package", (req, res) => {
    const packageObj = new PackageController().boot(req, res);
    return packageObj.GetPackage();
  });

  router.post("/add_ps", (req, res) => {
    const packageObj = new PackageController().boot(req, res);
    return packageObj.AddSubjectPackage();
  });

  router.post("/get_package_structure", (req, res) => {
    const packageObj = new PackageController().boot(req, res);
    return packageObj.GetPackageStructure();
  });

  app.use(config.baseApiUrl, router);
};
