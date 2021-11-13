const Controller = require("./Controller");
const State = require("../models/StateSchema").State;
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectId;

class StateController extends Controller {
  constructor() {
    super();
  }

  async AddState() {
    try {
      let stateData = this.req.body;
      let state = await new Model(State).store(stateData);

      if (state != null) {
        this.res.send({ status: 1, message: "State added successfully!!" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message:
          "some error occoured on server. Please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "Add State Api",
        function_name: "AddState()",
        error_title: error.name,
        descriprion: error.message,
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetState() {
    try {
      if (!this.req.state_id) {
        if (!this.req.app_id) {
          this.res.send({ status: 0, message: "please send app ID" });
        } else {
          let states = await State.find({
            delete_status: false,
            app_id: this.req.body.app_id,
          });
          if (states != null) {
            this.res.send({
              status: 1,
              message: "all states returned successfully",
              data: states,
            });
          }
        }
      } else {
        let stat = await State.findOne({
          _id: this.req.body.state_id,
          delete_status: false,
          app_id: this.req.body.app_id,
        });
        if (stat != null) {
          this.res.send({
            status: 1,
            message: "single state returned",
            data: stat,
          });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "get state api",
        function_name: "GetState()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateState() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let update_state = await State.findByIdAndUpdate(
          this.req.body.state_id,
          updateData
        );
        if (update_state != null) {
          this.res.send({ status: 1, message: "state updated successfully" });
        }
      } else {
        let dData = this.req.body;
        let deletStates = await State.findByIdAndUpdate(
          this.req.body.state_id,
          dData
        );
        console.log(deletStates);
        if (deletStates != null) {
          this.res.send({ status: 1, message: "states deleted successfully" });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update state api",
        function_name: "UpdateState()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = StateController;
