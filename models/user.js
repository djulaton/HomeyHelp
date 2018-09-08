
module.exports = function(sequelize,DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    bio: DataTypes.TEXT,
    hobbies: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    job_title: DataTypes.STRING,
    employed: DataTypes.BOOLEAN,
    city: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    clean_score: DataTypes.INTEGER,
    finance_score: DataTypes.INTEGER,
    personality_score: DataTypes.STRING,
  });
};