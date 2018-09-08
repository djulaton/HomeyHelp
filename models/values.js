var User = require("User")

module.exports = function(sequelize,User) {
  var newUser = sequelize.define("Homies", {
    user: User.user.STRING,
    password_hash: User.passHash.STRING,
    email: User.email.STRING,
    phone: User.phone.INTEGER,
    bio: User.bio.TEXT,
    hobbies: User.hobbies.TEXT,
    age: User.age.INTEGER,
    gender: User.gender.STRING,
    budget: User.budget.INTEGER,
    job_title: User.job.STRING,
    employed: User.employed.BOOLEAN,
    city: User.city.STRING,
    zip: User.zip.INTEGER,
    clean_score: User.cleanScore.INTEGER,
    finance_score: User.financeScore.INTEGER,
    personality_score: User.personalityScore.STRING,
  });
  newUser.sync()
};