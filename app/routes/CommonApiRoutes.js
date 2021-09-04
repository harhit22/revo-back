const CityController = require("../controllers/CityConroller");
const StateController = require("../controllers/StateController");

module.exports = (app, express) => {
  const router = express.Router();
  const Globals = require("../../configs/Globals");
  const DeliveryBoysController = require("../controllers/StateController");
  const AddressController = require("../controllers/CityConroller");

  //   states routes

  router.post("/add_state", (req, res) => {
    const stateObj = new StateController().boot(req, res);
    return stateObj.AddState();
  });

  router.post("/get_state", (req, res) => {
    const stateObj = new StateController().boot(req, res);
    return stateObj.GetState();
  });

  router.post("/update_state", (req, res) => {
    const stateObj = new StateController().boot(req, res);
    return stateObj.UpdateState();
  });

  //   city routes

  router.post("/add_city", (req, res) => {
    const cityObj = new CityController().boot(req, res);
    return cityObj.AddCity();
  });

  router.post("/get_city", (req, res) => {
    const cityObj = new CityController().boot(req, res);
    return cityObj.GetCity();
  });

  router.post("/update_city", (req, res) => {
    const cityObj = new CityController().boot(req, res);
    return cityObj.UpdateCity();
  });

  app.use(config.baseApiUrl, router);
};
