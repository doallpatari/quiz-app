const router = require("express").Router()
const getRand = require("./produceRandom")
const score = require("../../dal/models/scores.users")
const ques = require("../../dal/models/ques")
const activeQuiz = require("../../dal/models/active.quiz")
const ensureLoggedIn  = require("connect-ensure-login").ensureLoggedIn
const next = require("./nextQues")
const prev = require("./prevQues")
const submit = require("./submit")


router.get('/', ensureLoggedIn('/login'), (req, res, next)=>{
    if(req.user){
    const email = req.user.email
    score.findOne({email: email})
    .then(user =>{
        if(user){
            next()
        }
        else{
            const newUser = new score({
                email : req.user.email,
                name : req.user.name,
                category: [{totalAttempted:0, totalCorrect:0},
                    {totalAttempted:0, totalCorrect:0},
                    {totalAttempted:0, totalCorrect:0}]

            })
            newUser.save()
            .then(next())
            
        }
    })
    .catch(err=> console.log(err))
    
}
} ,async (req, res)=>{
    if(await activeQuiz.exists({user:req.user.email}))
    {
        console.log("already active quiz")
        res.redirect('/quiz/next')
    }
    else{
    ques.find({})
    .then((data)=>{
        res.render('quizCreator', {max: data.length})
    })
} 
})

router.post('/', getRand)

router.use('/next', next)
router.use('/prev', prev)
router.use('/submit', submit)



module.exports = router