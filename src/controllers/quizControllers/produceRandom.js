const router = require("express").Router()
const ques = require("../../dal/models/ques")
const activeQuiz = require("../../dal/models/active.quiz")

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
router.post('/', async (req, res, next)=>{
  if(await activeQuiz.exists({user:req.user.email})){
    await activeQuiz.findOne({
    user: await req.user.email
  }).then((data)=>{
    res.render('displayQues', {ques:data.quiz[data.currQues]})
  })
}
else{
  await ques.find({})
  .then((data)=>{
    let maths= physics=chemistry=-1
    maths = req.body.maths?req.body.maths:maths
    physics = req.body.physics?req.body.physics:physics
    chemistry = req.body.chemistry?req.body.chemistry:chemistry
    let time = parseInt(req.body.time)
    let curr = new Date()
    let reqTime = new Date(curr.getTime() + time*60000);
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
      expiresAt: reqTime
    })
    quiz.save()
    .then(res.render('displayQues', {ques:quiz.quiz[0]}))
  })
  .catch(err=>console.log(err))
  next()
}
})

module.exports = router
