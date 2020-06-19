require('dotenv').config()

const express = require("express");  
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Create a new instance of express 
const app = express();

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.json())


 //root route
app.get("/", (req, res) => {
    res.send("Welcome to LAMS APP");
  });

  //admin register 
  app.post("/admin/register", async (req, res)=>{ 
    try{
      //hash the password for safty before saving
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const adminUser = {name: req.body.name, email:req.body.email, password:hashedPassword} 
      //generate access token to identify user
      const accessToken =   jwt.sign(adminUser, process.env.ACCESS_TOKEN_SECRET)
      console.log(accessToken)
      //save to the db which we don't have yet so lets just log 
      console.log(adminUser)
      res.json({accessToken: accessToken})
    }catch{
      res.status(500).send('An error occoured')
    }
  }) 

  //middleware to authenticate token
 /*  function authenticateToken(req, res, next){
    const authHeader = req.headers['authourization']
    const token = authHeader && authHeader.split('')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, adminUser) =>{
      if(err) return res.sendStatus(403)
      req.adminUser = adminUser
      next()
    })
  } */

   //admin login
  app.post("/admin/login", async (req, res)=>{
    //find user from db and check if post coming in matches
    if(user == null){
      return res.status(400).send('User not found')
    }
    try{
      if(await bcrypt.compare(req.body.password, user.password)){
        res.send('You logged in as admin')
      }else{
        res.status(500).send('error occured')
      }
    }catch{
      res.status(500).send()
    }
  }) 

  //user login
  app.post("/login", (req, res)=>{
    const body = JSON.stringify(req.body);
    console.log(body)
  })



  app.listen(process.env.PORT || 8000, () => {
    console.log("LAMS app listening on port 8000! 🚀");
  });
  

