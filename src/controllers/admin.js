const express = require("express")
const router = express.Router()
const ques = require("../dal/models/ques")

var sentObjsId=[];
var requiresAdmin = function() {
    return [
      function(req, res, next) {
        if (req.user && req.user.isAdmin === true)
          next();
        else
          res.send(401, 'Unauthorized');
      }
    ]
  };

router.all('/*', requiresAdmin())
router.get('/', (req, res)=>{
    res.send("admin panel")
})
router.get('/unapproved', (req, res)=>{
  ques.findOne({})
  .then((data, err)=>{
    if(err){
      console.log(err)
    }
    if(data){
      sentObjsId.push(data)
    res.render('checkUnapp', {ques: data})
  }
    else{
      res.status(200).send("U R all caught up")
    }
  })
router.post('/approved', (req, res)=>{
  res.json(sentObjsId[0])
})
})




module.exports = router