const ques = require("../dal/models/ques")
const router = require("express").Router()
const activeQuiz = require("../dal/models/active.quiz")

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
router.post('/', async (req, res, next)=>{
  if(activeQuiz.findOne({
    user: req.user.email
  }).then((data)=>res.render('displayQuiz', {ques:data.ques[data.currQues]}))
  )
  await ques.find()
  .then((data)=>{
    let arr = []
    for(let i=0;i<data.length;i++){
      arr.push(i)
    }
    shuffleArray(arr)
    question = []
    for(let i=0;i<req.body.noQues;i++){
      question.push(data[arr[i]])
    }
    const quiz = new activeQuiz({
      user: req.user.email,
      quiz: question,
    })
    quiz.save()
    .then(res.render('displayQues', {ques:quiz.quiz[0]}))
  })
  .catch(err=>console.log(err))
  next()
})

router.post('/next', (req, res)=>{
  const curr = activeQuiz.findOne({email:req.user.email}).currQues
  activeQuiz.findOneAndUpdate({
    email:req.user.email
  }, {
    currQues:curr+1
  }).then((data)=>res.render('displayQues', {ques:data.ques[data.currQues]}))
})

module.exports = router
