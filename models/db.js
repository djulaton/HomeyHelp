module.exports = function(sequelize,User) {
  var newUser = sequelize.define("Homies", {
    user: User.STRING,
    password_hash: User.STRING,
    email: User.STRING,
    phone: User.INTEGER,
    bio: User.TEXT,
    hobbies: User.TEXT,
    age: User.INTEGER,
    gender: User.STRING,
    budget: User.INTEGER,
    finance_score: User.INTEGER,
    personality_score: User.INTEGER,
    clean_score: User.INTEGER,
    job_title: User.STRING,
    employed: User.BOOLEAN,
    city: User.STRING,
    zip: User.INTEGER
  });
  newUser.sync()
};