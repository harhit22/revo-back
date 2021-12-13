module.exports = (app, express) => {
  const router = express.Router();
  const Globals = require("../../configs/globals");
  const UserController = require("../controllers/UserController");
  const BookmarkController = require("../controllers/BookmarksController");
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

  //Bookmark
  router.post("/add_bookmark", (req, res) => {
    const bookObj = new BookmarkController().boot(req, res);
    return bookObj.AddBookmark();
  });

  router.post("/get_bookmark", (req, res) => {
    const bookObj = new BookmarkController().boot(req, res);
    return bookObj.GetBookmark();
  });

  router.post("/remove_bookmark", (req, res) => {
    const bookObj = new BookmarkController().boot(req, res);
    return bookObj.RemoveBookmark();
  });

  app.use(config.baseApiUrl, router);
};
