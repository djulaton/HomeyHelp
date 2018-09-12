// Get references to page elements

var registerBtn = $("#register");
var loginBtn = $("#loginBtn")
// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function (User) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/newuser",
      data: JSON.stringify(User)
    });
  },

  login: function() {
    return $.ajax({
      url: "api/login",
      type: "GET",
      data:login, password
    });
  },
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleLogin = function (event) {
  event.preventDefault();
  var login = $("#emailLogin").val().trim()
  var password = $("#passwordLogin").val().trim()

  API.login(login, password)
}

var handleFormSubmit = function (event) {
  event.preventDefault()
  var User = {
    user: $("#name").val().trim(),
    password: $("#password").val().trim(),
    email: $("#email").val().trim(),
    phone: $("#phoneNumber").val().trim(),
    bio: $("#bio").val().trim(),
    hobbies: $("#hobbies").val().trim(),
    age: parseInt($("#age").val().trim()),
    gender: $("#gender").val().trim(),
    budget: parseFloat($("#budget").val().trim()),
    finance_score: 0,
    personality_score: 0,
    clean_score: 0,
    job_title: $("#jobTitle").val().trim(),
    employed: 0,
    city: $("#city").val().trim(),
    zip: parseInt($("#zip").val().trim()),
  };

  console.log(User);
  API.saveUser(User)
  //create new api route for new user, create ajax to call body of user
};

// Add event listeners to the submit and delete buttons
registerBtn.on("click", handleFormSubmit);
loginBtn.on("click", handleLogin)