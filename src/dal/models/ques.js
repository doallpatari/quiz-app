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
      required: true
    },
    category:{
        type:String
    },
    options: [optionSchema],
    image:[imageSchema],
    
  },
  {
    timestamps: true
  })

const ques = mongoose.model('Questions', quesSchema)
module.exports = ques;