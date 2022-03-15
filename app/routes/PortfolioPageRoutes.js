module.exports = (app, express) => {
  const router = express.Router();
  const PortfolioController = require("../controllers/PortfolioController");

  //   portfolio routes

  router.post("/addPortfolio", (req, res) => {
    const portObj = new PortfolioController().boot(req, res);
    return portObj.AddPortfolio();
  });

  router.get("/getPortfolio", (req, res) => {
    const portObj = new PortfolioController().boot(req, res);
    return portObj.GetPortfolio();
  });

  router.post("/updatePortfolio", (req, res) => {
    const portObj = new PortfolioController().boot(req, res);
    return portObj.UpdatePortfolio();
  });

  app.use(config.baseApiUrl, router);
};
