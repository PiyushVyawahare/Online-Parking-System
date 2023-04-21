const dotenv = require("dotenv");
dotenv.config();

module.exports.init = function(){
  const mongoose = require("mongoose");
  mongoose.connect("mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASS+"@cluster0.tt9fs.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority")
  .then(function(){
      console.log("db is live");
  })
  .catch(function(){
      console.log("error");
  })
}