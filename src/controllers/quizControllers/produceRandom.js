const ques = require("../../dal/models/ques")
const router = require("express").Router()
const activeQuiz = require("../../dal/models/active.quiz")

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
router.post('/', async (req, res, next)=>{
  if(await activeQuiz.exists({user:req.user.email})){
    activeQuiz.findOne({
    user: await req.user.email
  }).then((data)=>{
    res.render('displayQues', {ques:data.quiz[data.currQues]})
  })
}
else{
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
}
})

module.exports = router
