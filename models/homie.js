/*
module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
*/

// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Homie" model that matches up with DB
var Homie = sequelize.define("homie", {

  user: Sequelize.STRING,
  password_hash: Sequelize.BINARY,
  email: Sequelize.STRING,
  phone: Sequelize.INTEGER,
  bio: Sequelize.STRING,
  hobbies: Sequelize.STRING,
  age: Sequelize.INTEGER,
  gender: Sequelize.STRING,
  budget: Sequelize.INTEGER,
  finance_score: Sequelize.INTEGER,
  clean_score: Sequelize.INTEGER,
  personality_type: Sequelize.STRING,
  job_title: Sequelize.STRING,
  employed: Sequelize.BOOLEAN,
  city: Sequelize.STRING,
  zip_code: Sequelize.INTEGER

});

// Syncs with DB
Homie.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = Homie;

