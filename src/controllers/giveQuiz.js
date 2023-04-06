const router = require("express").Router()
const getRand = require("../controllers/produceRandom")
const score = require("../dal/models/scores.users")
const ques = require("../dal/models/ques")
const  ensureLoggedIn  = require("connect-ensure-login").ensureLoggedIn


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

            })
            newUser.save()
            .then(next())
            
        }
    })
    .catch(err=> console.log(err))
    
}
else {
    res.redirect('/login')
}
} ,(req, res)=>{
    ques.find({})
    .then((data)=>{
        res.render('quizCreator', {max: data.length})
    })
})

router.post('/', (req, res, next)=>{
    const number = req.body.noQues
    next()
},getRand)

router.use('/next', getRand)



module.exports = router