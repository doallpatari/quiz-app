const express = require('express');
const app = express();
const session = require('express-session');
const authRouter = require('./src/controllers/auth/google-auth');
const facebookRouter = require('./src/controllers/auth/facebook-auth');
const githubRouter = require('./src/controllers/auth/github-auth');
const localRouter = require('./src/controllers/auth/local-auth');
const admin = require("./src/controllers/admin")
const upload = require('./src/controllers/quizControllers/uploadQues')
const giveQuiz = require("./src/controllers/quizControllers/giveQuiz")
const passport = require('passport');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")
const { ensureLoggedIn } = require('connect-ensure-login');

app.set('view engine', 'ejs');
require('dotenv').config();
app.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
const connectToMongoDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDb..'))
    .catch((error) => {
      console.log('Error in connecting to mongoDB ' + error)
      throw error;
    });
};
connectToMongoDb();
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.get('/', (req, res) => {
  if(req.user){
    res.redirect('/auth/email/success')
    // res.render('fb-github-success', {user:userInfo})
  }
  res.render('home');
});
app.get('/register', (req, res)=>{
  res.render('register')
})
app.get('/login', (req, res)=>{
  res.render('login')
})


app.get('/user', (req, res)=>{
  if(req)
    {console.log(req)}
  else{
    console.log("logged out")
  }
  res.send("check console")
})
app.use('/auth/google', authRouter);
app.use('/auth/facebook', facebookRouter);
app.use('/auth/github', githubRouter);
app.use('/auth/email', localRouter);
app.use('/upload', upload)
app.use('/quiz', giveQuiz)
app.use('/admin', admin)

app.use("*", (req, res)=>{
  res.render("404")
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port http://localhost:${port}/`));
