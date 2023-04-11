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
  ques.findOne({approved:false})
  .then((data, err)=>{
    if(err){
      console.log(err)
    }
    if(data){
      sentObjsId.push(data.id)
    res.render('checkUnapp', {ques: data})
  }
    else{
      res.status(200).send("U R all caught up")
    }
  })
router.post('/approved', async (req, res)=>{
  if(req.body.approved=="1"){
    data = await ques.findById(sentObjsId[0])
    data.approved = true
    data.save() 
    sentObjsId.shift()
    res.send("approved")   
  }
  else{
    data = await ques.findById(sentObjsId[0])
    data.delete()
    sentObjsId.shift()
    res.send("deleted")
  }
})
})




module.exports = router