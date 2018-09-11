var db = require("../models");
var bcrypt = require('bcrypt')
module.exports = function(app) {
  // verify Login Credentials
  app.get("/api/login", function(req, res) {
    db.User.findAll({where: {email: login}}).then(function(dbUser) {
      res.json(dbUser);
        bcrypt.compare(password, dbUser.password, function (err, res){
          if (err) {
            console.log("ERROR:\n--------"+err+"\n--------")
            res.render("there was an issue logging in, please make sure you entered your email and password correctly")
            res.render("../public/html/login.html")}
            else{
          console.log("password match")
              res.render("../public/html/carousel.html")
        }
        })
    });
  });
  //find matches to user

  // Create a new User
  app.post("/api/newuser", function(req, res) {
   var passHash = bcrypt.hash(req.body.password, 10, function(err, res){
      if (err) throw err
      return passHash
    })
    db.User.create(req.body.user, passHash, req.body.email, req.body.phone, req.body.bio, req.body.hobbies, req.body.age, req.body.gender, req.body.budget, req.body.finance_score, req.body.personality_score, req.body.clean_score, req.body.job_title, req.body.employed, req.body.city, req.body.zip).then(function(dbUser) {
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
