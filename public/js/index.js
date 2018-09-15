// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function (User) {
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/newuser",
      data: JSON.stringify(User)
    }).then(function (data) {
      location.href = "/finance";
    });
  },

  login: function(creds) {
    $.ajax({
      url: "/api/login",
      type: "POST",
      data: creds
    }).then(function(data){
      if(data.value===true){
      location.href="/dashboard"
      }
    });
  },
  
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleLogin = function (event) {
  
  var creds = {
    login: $("#emailLogin").val().trim(),
    password: $("#passwordLogin").val().trim()
  };
  sessionStorage.setItem("email", creds.login);
  API.login(creds);

}

var handleFormSubmit = function () {
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
  sessionStorage.setItem("email", User.email);
  API.saveUser(User)
};

// REGISTRATION PAGE STUFF
// -----------------------------------------
// Add event listener to the register button
// $('#modal-incorrectLogin').modal('show');
var loginBtn = $("#loginBtn");
loginBtn.on("click", handleLogin);

var registerBtn = $("#register");
registerBtn.on("click", handleFormSubmit);
// -----------------------------------------

// FINANCE STUFF
// ---------------------------------------------------
$(document).ready(function () {
  $("#submitFinance").on("click", function (event) {
    var scores = [];

    // eventually change j < 10
    for (let j = 0; j < 10; j++) {
      var name = "financeQuestion" + j;
      var radios = document.getElementsByName(name);

      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          // do whatever you want with the checked radio
          scores.push(parseInt(radios[i].value) + 1);

          // only one radio can be logically checked, don't check the rest
          break;
        }
      }
    }

    var sumOfScores = 0;
    for (let i = 0; i < scores.length; i++) {
      sumOfScores += scores[i];
    }
    var avgOfScores = sumOfScores / scores.length;
    alert("Your finance score is: " + avgOfScores);

    function updatePost(avgScore) {
      $.ajax({
        method: "PUT",
        url: "/api/finance",
        data: {
          financeScore: avgScore,
          email: sessionStorage.getItem("email")
        }
      })
        .then(function () {
          location.href = "/cleanliness";
        });
    };
    updatePost(avgOfScores);
  });
});
// -----------------------------------------------------------

// -----------------------------------------------------------
// CLEANLINESS STUFF
$(document).ready(function () {
  $("#submitCleanliness").on("click", function (event) {
    var scores = [];

    // eventually change j < 10
    for (let j = 0; j < 10; j++) {
      var name = "cleanlinessQuestion" + j;
      var radios = document.getElementsByName(name);

      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          // do whatever you want with the checked radio
          scores.push(parseInt(radios[i].value) + 1);

          // only one radio can be logically checked, don't check the rest
          break;
        }
      }
    }

    var sumOfScores = 0;
    for (let i = 0; i < scores.length; i++) {
      sumOfScores += scores[i];
    }
    var avgOfScores = sumOfScores / scores.length;
    alert("Your cleanliness score is: " + avgOfScores);

    function updatePost(avgScore) {
      $.ajax({
        method: "PUT",
        url: "/api/cleanliness",
        data: {
          cleanScore: avgScore,
          email: sessionStorage.getItem("email")
        }
      })
        .then(function () {
          location.href = "/personality";
        });
    };

    updatePost(avgOfScores);
  });
});
// -------------------------------------------

// PERSONALITY PAGE STUFF
// -------------------------------------------
$("#submitPersonality").on("click", function (event) {
    var MBTI = $("#mbti").val().trim();

    function updatePost(mbti) {
        $.ajax({
            method: "PUT",
            url: "/api/personality",
            data: { 
                personalityScore: mbti,
                email: sessionStorage.getItem("email")
            }
        })
            .then(function () {
                location.href = "/matches";
            });
    };

    updatePost(MBTI);
});
// --------------------------------------------
