module.exports = (app, express) => {
  const router = express.Router();
  const BlogController = require("../controllers/BlogController");

  //   blog routes

  router.post("/addBlog", (req, res) => {
    const blogObj = new BlogController().boot(req, res);
    return blogObj.AddBlog();
  });

  router.post("/getBlog", (req, res) => {
    const blogObj = new BlogController().boot(req, res);
    return blogObj.GetBlog();
  });

  router.post("/updateBlog", (req, res) => {
    const blogObj = new BlogController().boot(req, res);
    return blogObj.UpdateBlog();
  });

  app.use(config.baseApiUrl, router);
};
