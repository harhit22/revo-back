const Controller = require("./Controller");
const Recommedation =
  require("../models/RecommededCoursesSchema").Recommedation;
const Model = require("../models/model");
const Globals = require("../../configs/globals");
const ObjectID = require("mongodb").ObjectId;

class CoursesRecommedationController extends Controller {
  constructor() {
    super();
  }

  async AddRecommedation() {
    try {
      let addData = this.req.body;
      let recommedation = await new Model(Recommedation).store(addData);

      if (recommedation != null) {
        this.res.send({ status: 1, message: "data added successfully!!" });
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

  async GetCoursesRecommedation() {
    try {
      let recommedation = await Recommedation.find({
        app_id: ObjectID(this.req.body.app_id),
      });
      if (recommedation != null) {
        this.res.send({
          status: 1,
          message: "all courses recommeded returned successfully",
          data: recommedation,
        });
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

  //   async UpdateState() {
  //     try {
  //       if (!this.req.body.delete_status) {
  //         let updateData = this.req.body;
  //         let update_state = await State.findByIdAndUpdate(
  //           this.req.body.state_id,
  //           updateData
  //         );
  //         if (update_state != null) {
  //           this.res.send({ status: 1, message: "state updated successfully" });
  //         }
  //       } else {
  //         let dData = this.req.body;
  //         let deletStates = await State.findByIdAndUpdate(
  //           this.req.body.state_id,
  //           dData
  //         );

  //         console.log(deletStates);
  //         if (deletStates != null) {
  //           this.res.send({ status: 1, message: "states deleted successfully" });
  //         }
  //       }
  //     } catch (error) {
  //       let globalObj = new Globals();
  //       let dataErrorObj = {
  //         is_from: "API Error",
  //         api_name: "update state api",
  //         function_name: "UpdateState()",
  //         error_title: " error.name",
  //         descriprion: " error.message",
  //       };
  //       globalObj.addErrorLogInDB(dataErrorObj);
  //     }
  //   }
}
module.exports = CoursesRecommedationController;
