const router = require("express").Router()
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn

router.all('/', ensureLoggedIn('/login'), (req, res)=>{
    
})









module.exports = router