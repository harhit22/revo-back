module.exports = {
  db: "mongodb://DBUser:DBUSERpassword@cluster0-shard-00-00.5tqct.mongodb.net:27017,cluster0-shard-00-01.5tqct.mongodb.net:27017,cluster0-shard-00-02.5tqct.mongodb.net:27017/revolution?ssl=true&replicaSet=atlas-f4kqo6-shard-0&authSource=admin&retryWrites=true&w=majority", // Local

  mongoDBOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },

  baseApiUrl: "/api",

  serverPort: "7200",
};
