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
            curr = await activeQuiz.findOne({user:email})
            currQ = await curr.currQues
            if(req.body.answer){    
                curr.quiz[currQ].chosenOption = req.body.answer
                curr.save()
            }
            if(currQ>0){
                currQ--
            }
            doc = await activeQuiz.findOneAndUpdate({user:email}, {currQues:currQ}, {new: true})
            res.render('displayQues', {ques: doc.quiz[doc.currQues]})
        }
    
    else{
        res.send("no active quiz")
    }
})










module.exports = router