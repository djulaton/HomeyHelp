var path = require("path");
var db = require("../models");
const financeQuestions = require("../public/js/financeQuestions");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
  });

  app.get("/registration", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/registration.html"));
  });

  // Load finance questions
  app.get("/finance", function(req, res) {
    const hbsObject = {
      questions: financeQuestions
    };
    res.render("finance", hbsObject);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
