const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    //accountId can be google Id, facebook Id, github Id etc.
    accountId: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
    },
    photoURL: {
      type: String,
    },
    provider: {
      type: String,
      default: "Email"
    },
    password:{
      type:String
    },
    isAdmin:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('trying_new', userSchema);
module.exports = User;
