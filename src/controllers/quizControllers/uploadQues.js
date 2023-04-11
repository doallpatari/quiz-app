const express = require("express")
const Ques = require("../../dal/models/ques")
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn
const router = express.Router()
const fs = require('fs');
const path = require('path');
const multer = require("multer")


require('dotenv').config

router.all('/*', ensureLoggedIn('/login'), (req, res, next)=>{
    next()
})
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
    
// });
// const upload = multer({ storage: storage });
// upload.single('image'),
router.post("/", (req, res)=>{
    // if(req.file){
    //     console.log(req.file)
    // }
    // console.log(fs.readFileSync(path.join(__dirname + '../../../uploads/' + req.file.filename)))
    // const obj = {
    //     img:{
    //         data: fs.readFileSync(path.join(__dirname + '../../../uploads/' + req.file.filename)),
    //         contentType: 'image/png'
    //     }   
    //     }
    // console.log(obj)
    const newQues = new Ques({
        question: req.body.ques,
        category:parseInt(req.body.category),
        options:[
            {
                value:String(req.body.opt1),
                isCorrect:(req.body.correctOption=='1'?true:false)
            },
            {
                value:String(req.body.opt2),
                isCorrect:(req.body.correctOption=='2'?true:false)
            },
            {
                value:String(req.body.opt3),
                isCorrect:(req.body.correctOption=='3'?true:false)
            },
            {
                value:String(req.body.opt4),
                isCorrect:(req.body.correctOption=='4'?true:false)
            },
            
        ],
        // image:[obj],
        approved:req.user.isAdmin ===true?true:false
    })
    // console.log(newQues.image)
    newQues.save()
        .then(res.send("done"))
        .catch(err => console.log(err));
    // res.send("yello")    
})
router.get('/', (req, res)=>{
    res.render("upl-ques")
})


module.exports = router
