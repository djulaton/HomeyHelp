var db = require("../models");
var bcrypt = require('bcrypt')



module.exports = function (app) {

  //
  var userEmail;
  //



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

  // update user's db row with finance score
  app.put("/api/finance/", function (req, res) {
    db.user.update({
      financeScore: req.body.finance_score
    }, {
        where: { email: userEmail }
      }
    )
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // update user's db row with cleanliness score
  app.put("/api/cleanliness/", function (req, res) {
    db.user.update({
      cleanScore: req.body.cleanliness_score
    }, {
        where: { email: userEmail }
      }
    )
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // update user's db row with personality type
  app.put("/api/personality/", function (req, res) {
    db.user.update({
      personalityScore: req.body.personality_score
    }, {
        where: { email: userEmail }
      }
    )
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });


  // display all users
  app.get("/api/posts/", function (req, res) {
    db.user.findAll({})
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // add new user
  app.post("/api/newuser", function (req, res) {
    userEmail = req.body.email;
    var passHash = bcrypt.hash(req.body.password, 10, function (err, res) {
      if (err) throw err
      return passHash
    })
    db.user.create({ username: req.body.user, password: passHash, email: req.body.email, phone: req.body.phone, bio: req.body.bio, hobbies: req.body.hobbies, age: req.body.age, gender: req.body.gender, budget: req.body.budget, financeScore: req.body.finance_score, personalityScore: req.body.personality_score, cleanScore: req.body.clean_score, jobTitle: req.body.job_title, employed: req.body.employed, city: req.body.city, zip: req.body.zip }).then(function (dbUser) {
      res.json(dbUser);
    });

  });

};
