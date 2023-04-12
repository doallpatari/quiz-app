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
        active.quiz[active.quiz.currQues].chosenOption = req.body.answer
    }

    var totalAttempted=0, totalCorrect=0
    var categoryAttempted=Array(3).fill(0), categoryCorrect=Array(3).fill(0)
    const questions = await active.quiz
    for(let i=0;i<questions.length;i++){
        quest = questions[i]
        var isCorrect
        if(quest.chosenOption!=-1){
            isCorrect = await quest.options[quest.chosenOption].isCorrect
        }
        else{
            isCorrect=false
        }

        totalAttempted = quest.chosenOption==-1?totalAttempted:++totalAttempted
        totalCorrect = isCorrect==true?++totalCorrect:totalCorrect
        categoryAttempted[quest.category]++
        categoryCorrect[quest.category]=isCorrect==true?++categoryCorrect[quest.category]:categoryCorrect[quest.category]

    }
    let category = []
    for(let j=0;j<3;j++){
        let cat1={
            totalAttempted:categoryAttempted[j], 
            totalCorrect:categoryCorrect[j]
        }
        category.push(cat1)
    }
    active.category = category
    active.totalAttempted = totalAttempted
    active.totalCorrect = totalCorrect
    active.save()
    if(await scores.exists({email:email})){
        data = await scores.findOne({email:email})
            data.totalQuizes.push(active)
            data.totalAttempted += totalAttempted
            data.totalCorrect +=totalCorrect
            for(let i=0;i<3;i++){
                data.category[i].totalAttempted+=categoryAttempted[i]
                data.category[i].totalCorrect+=categoryCorrect[i]
            }
            data.save()
            active.delete()
        }
    else{

    }
})









module.exports = router