const mongoose = require("mongoose")
const optionSchema = new mongoose.Schema({
    value: {
      type: String
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
  
  const quesSchema = mongoose.Schema({
    question: {
      type: String,
      required: 'true'
    },
    category:{
        type:String
    },
    options: [optionSchema],
    image:[imageSchema],
    approved:{
      type:Boolean,
      default: false
    },
    difficulty:{
      type: Number,
      default : 2
    }
  })

const ques = mongoose.model('AppQuestions', quesSchema)
module.exports = ques;