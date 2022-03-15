module.exports = (app, express) => {
  const router = express.Router();

  //   states routes

  app.use(config.baseApiUrl, router);
};
