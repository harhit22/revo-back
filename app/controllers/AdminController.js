const Controller = require("../controllers");
const Globals = require("../../configs/globals");
const Admin = require("../models/AdminSchema").Admin;
const Model = require("../models/model");

class AdminController extends Controller {
  constructor() {
    super();
  }

  async AdminRegister() {
    let adminData = this.req.body;
  }
}
