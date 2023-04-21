const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: {
      type: String, 
      required: true,
    },
    lname: {
      type: String, 
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    }
},
{ timestamps: true }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;