module.exports = (app, express) => {
  const router = express.Router();
  const Globals = require("../../configs/globals");
  const UserController = require("../controllers/UserController");
  // const SupportController = require('../controllers/SupportController');
  // const WalletController = require('../controllers/WalletController');

  //   user routes
  router.post("/register", (req, res) => {
    const userObj = new UserController().boot(req, res);
    return userObj.RegisterUser();
  });

  router.post("/login", (req, res) => {
    const userObj = new UserController().boot(req, res);
    return userObj.LoginUser();
  });

  router.post("/update_profile", (req, res) => {
    const userObj = new UserController().boot(req, res);
    return userObj.UpdateProfileUser();
  });

  app.use(config.baseApiUrl, router);
};
