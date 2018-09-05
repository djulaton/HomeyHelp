module.exports = function(sequelize,User) {
  var newUser = sequelize.define("Homies", {
    user: User.STRING,
    password_hash: User.STRING,
    email: User.STRING,
    phone: User.INTEGER,
    bio: User.TEXT,
    hobbies: User.TEXT,
    age: User.INT,
    gender: User.STRING,
    budget: User.INT,
    finance_score: User.INT,
    personality_score: User.INT,
    clean_score: User.INT,
    job_title: User.STRING,
    employed: User.BOOLEAN,
    city: User.STRING,
    zip: User.INT
  });
  newUser.sync()
};