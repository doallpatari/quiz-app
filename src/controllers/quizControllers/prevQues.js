const router = require("express").Router()
const activeQuiz = require("../../dal/models/active.quiz")
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn

router.all('/', ensureLoggedIn('/login'), async (req, res)=>{
    var user , email
    try{
        user = req.user
        email = user.email
    }
    catch(err){
        console.log(err)
    }
    
        if( await activeQuiz.exists({user:email})){
            console.log(email)
            curr = await activeQuiz.findOne({user:email})
            console.log(typeof(curr))
            curr = await curr.currQues
            console.log(curr)
            doc = await activeQuiz.findOneAndUpdate({user:email}, {currQues:--curr}, {new: true})
            res.render('displayQues', {ques: doc.quiz[doc.currQues]})
        }
    
    else{
        res.send("no active quiz")
    }
    // res.send("adfads")
})










module.exports = router