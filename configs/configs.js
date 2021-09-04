module.exports = {
  db: "mongodb://DBUser:DBUSERpassword@cluster0-shard-00-00.5tqct.mongodb.net:27017,cluster0-shard-00-01.5tqct.mongodb.net:27017,cluster0-shard-00-02.5tqct.mongodb.net:27017/learniphy?ssl=true&replicaSet=atlas-f4kqo6-shard-0&authSource=admin&retryWrites=true&w=majority", // Local

  mongoDBOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    //authSource: 'admin',
    //user: 'indianic',
    //pass: 'indianic@123'
  },
  sessionSecret: "indNIC2305",
  securityToken: "indNIC2305",
  baseApiUrl: "/api",
  normalUrl: "",
  serverPort: "8000",
  tokenExpiry: 864000, //(10 days) //259200 Note: in seconds! (3 day)
  perPage: 20,
  adPerPage: 4,
  newArrivalDays: 2,
  emailStatus: true,
  is_live: false,
};
