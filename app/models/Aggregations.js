// const Model = require("../models/model");
// const _ = require("lodash");
// let ObjectId = require("mongodb").ObjectID;
// const configs = require("../../configs/configs");
// const { reject } = require("lodash");
// class agree {
//   constructor(collection) {
//     this.collection = collection;
//   }

//   GetQuestionByPaperId(filter) {
//     return new promise((resolve, reject) => {
//       this.collection.aggregate([
//         {
//           $match: filter,
//         },
//         {
//           $lookup: {
//             from: "paperquestions",
//             pipeline: [
//               {
//                 $match: {},
//               },
//               { $project: { _id: 1 } },
//             ],
//             as: "transactions",
//           },
//         },
//       ]);
//     });
//   }
// }
// // db.exams.aggregate([
// //   {
// //       $lookup:{
// //           from:"paper",
// //           let:{ examId:"$_id"},
// //           pipeline:[{$match:{$expr:{$eq:["$exam_id","$$examId"]}}},
// //           {$lookup:{
// //               from:"subjects",
// //               let:{paperId:"$_id"},
// //               pipeline:[{$match:{$expr:{$eq:["$paper_id","$$paperId"]}}},
// //               {$lookup:{
// //               from:"question",
// //               let:{subjectId:"$_id"},
// //               pipeline:[{$match:{$expr:{$eq:["$subject_id","$$subjectId"]}}},
// //               ],
// //               as:"questions"}}

// //   ],
// //               as:"subjects"
// //               }}
// //           ],

// //           as:"paper"

// //           }}])
