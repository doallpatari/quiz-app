const mongoose = require("mongoose")
const optionSchema = new mongoose.Schema({
    value: {
      type: String,
      required: true
    },
    isCorrect: {
      type: 'boolean',
      default: false,
      required: true
    }
  })
  const imageSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
  const quesSchema = new mongoose.Schema({
    question: {
      type: String,
      required: true
    },
    category:{
        type:Number
    },
    options: [optionSchema],
    image:[imageSchema],
    approved:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  })

const ques = mongoose.model('Questions', quesSchema)
module.exports = ques;