var db = require("../models/user.js");
var bcrypt = require('bcrypt');

module.exports = function(app) {
  // verify Login Credentials
  app.get("/api/login", function(req, res) {
    db.User.findAll({where: {email: login}}).then(function(dbUser) {
      res.json(dbUser);
        bcrypt.compare(password, dbUser.password, function (err, res){
          if (err) throw err

          console.log("password match")
        })
    });
  });
  //find matches to user
  app.get("api/match", function(req, res){
    db.User.findAll({where:{}})
  })

  // Create a new User
  app.post("/api/newuser", function(req, res) {
    
    /*
   var passHash = bcrypt.hash(req.body.password, 10, function(err, res){
      if (err) throw err;
      return res;
    });
    */ 
  
    console.log(db);

    db.User.create({
      /*
      username: req.body.user, 
      password: req.body.password, 
      email: req.body.email, 
      phone: req.body.phone, 
      bio: req.body.bio, 
      hobbies: req.body.hobbies, 
      age: req.body.age, 
      gender: req.body.gender, 
      budget: req.body.budget, 
      financeScore: req.body.finance_score, 
      personalityScore: req.body.personality_score, 
      cleanScore: req.body.clean_score, 
      jobTitle: req.body.job_title, 
      employed: req.body.employed, 
      city: req.body.city, 
      zip: req.body.zip
      */
     username: 0,
     password: 0,
     email: 0,
     phone: 0,
     bio: 0,
     hobbies: 0,
     age: 0,
     gender: 0,
     budget: 0,
     jobTitle: 0,
     employed: 0,
     city: 0,
     zip: 0,
     cleanScore: 0,
     financeScore: 0,
     personalityScore: 0
    })
      .then(function(dbUser) {
      res.json(dbUser);
    });
    
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
