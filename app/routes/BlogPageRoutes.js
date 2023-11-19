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


  // //BlogCommentController

  // router.post("/addblogcomment", (req, res) => {
  //   const blogObj = new BlogCommentController().boot(req, res);
  //   return blogObj.AddBlogComment();
  // });

  // router.post("/getblogcomment", (req, res) => {
  //   const blogObj = new BlogCommentController().boot(req, res);
  //   return blogObj.GetBlogComment();
  // });

  // router.post("/updateblogcomment", (req, res) => {
  //   const blogObj = new BlogCommentController().boot(req, res);
  //   return blogObj.UpdateBlogComment();
  // });


  
  
  

  app.use(config.baseApiUrl, router);
};
