var db = require("../models");
var bcrypt = require('bcrypt')
module.exports = function (app) {
  // verify Login Credentials
  app.get("/api/login", function (req, res) {
    db.user.findAll({ where: { email: login } }).then(function (dbUser) {
      res.json(dbUser);
      bcrypt.compare(password, dbUser.password, function (err, res) {
        if (err) {
          console.log("ERROR:\n--------" + err + "\n--------")
          res.render("there was an issue logging in, please make sure you entered your email and password correctly")
          res.render("../public/html/login.html")
        }
        else {
          console.log("password match")
          res.render("../public/html/carousel.html")
        }
      })
    });
  });

  // display all users
  app.get("/api/posts/", function(req, res) {
    db.user.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });


  app.post("/api/newuser", function (req, res) {
    var passHash = bcrypt.hash(req.body.password, 10, function (err, res) {
      if (err) throw err
      return passHash
    })
    db.user.create({ username: req.body.user, password: passHash, email: req.body.email, phone: req.body.phone, bio: req.body.bio, hobbies: req.body.hobbies, age: req.body.age, gender: req.body.gender, budget: req.body.budget, financeScore: req.body.finance_score, personalityScore: req.body.personality_score, cleanScore: req.body.clean_score, jobTitle: req.body.job_title, employed: req.body.employed, city: req.body.city, zip: req.body.zip }).then(function (dbUser) {
      res.json(dbUser);
    });

  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
