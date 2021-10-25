module.exports = (app, express) => {
  const router = express.Router();
  const AdminController = require("../controllers/AdminController");

  //   Admin routes
  router.post("/registerAdmin", (req, res) => {
    const adminObj = new AdminController().boot(req, res);
    return adminObj.RegisterAdmin();
  });

  router.post("/loginAdmin", (req, res) => {
    const adminObj = new AdminController().boot(req, res);
    return adminObj.LoginAdmin();
  });

  app.use(config.baseApiUrl, router);
};
