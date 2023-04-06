const mongoose = require("mongoose")
const optionSchema = mongoose.Schema({
    value: {
      type: String
    },
    isCorrect: {
      type: 'boolean',
      select: false
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

  const quiz = mongoose.Schema({
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

const ques = mongoose.model('activeQuiz', quiz)
module.exports = ques;