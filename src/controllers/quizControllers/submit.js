const router = require("express").Router()
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn
const activeQuiz = require("../../dal/models/active.quiz")
const ques = require("../../dal/models/ques")
const scores = require("../../dal/models/scores.users")

router.all('/', ensureLoggedIn('/login'), async (req, res)=>{
    try{
        var email = req.user.email
}
catch(err){
    console.log(err)
}

    const active = await activeQuiz.findOne({user:email})
    if(req.body.answer){
        active.quiz[quiz.currQues].chosenOption = req.body.answer
    }

    var totalAttempted=0, totalCorrect=0
    const questions = active.quiz
    for(let i=0;i<questions.length;i++){
        quest = questions[i]
        totalAttempted = quest.chosenOption==-1?totalAttempted:++totalAttempted
        totalCorrect = quest.options[quest.chosenOption-1].isCorrect==true?++totalCorrect:totalCorrect 
    }
    console.log(totalAttempted, totalCorrect)
})









module.exports = router