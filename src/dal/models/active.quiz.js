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
  
  const quesSchema = new mongoose.Schema({
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
    },
    chosenOption:{
      type:Number,
      default:-1
    }
  })

  const quiz = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    quiz: [quesSchema],
    currQues: {
        type:Number,
        default:0
    },
    time:{
        type: Number,
        default: 30
    }
  },
  {
    timestamps: true
  }
  )

const activeQuiz = mongoose.model('activeQuiz', quiz)
module.exports = activeQuiz;