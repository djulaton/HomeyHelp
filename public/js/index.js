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

// MATCHES PAGE STUFF
// --------------------------------------------

    // CODE FOR FILTERING BY LOCATION 
    // -----------------------------------------------
    $(".zip").on("click", function () {
      var radius = $("#locationFilter").val();
      radius = radius[0];
      var zip = sessionStorage.getItem("zip");

      var queryURL = "https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=" + zip + "&minimumradius=0&maximumradius=" + radius + "&key=Y23J3P9U38KMS91SX4TK";
      // Creating an AJAX call to find array of all zip codes within the radius specified
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (resObj) {
          var zipCodeArray = resObj.DataList.map(a => a.Code);

          $.ajax({
              url: "/api/users/zip",
              type: "POST",
              data: { zipCodeArray }
          }).then(function (data) {
              if (!data || !data.length) {
                  displayEmpty();
              }
              else {
                  initializeRows(data);
              }
          });
      });
  });
  // ----------------------------------------------

  // CODE FOR FILTERING BY MBTI COMPATIBILITY
  // ----------------------------------------------
  $(".mbti").on("click", function () {
      var compLevel = $("#mbtiFilter").val();
      compLevel = compLevel[0];

      var compArray = ["Low compatibility", "Possible compatibility", "Moderate compatibility", "Good compatibility", "Ideal compatibility"];
      var compLevel_num = compArray.indexOf(compLevel) + 1;

      var userMBTI = sessionStorage.getItem("MBTI"); // This is user's mbti, assume known
      var typeArray = ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP", "ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"];
      var userMBTI_num = typeArray.indexOf(userMBTI);

      const compTable = [
          [4, 4, 4, 5, 4, 5, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1],
          [4, 4, 5, 4, 5, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1],
          [4, 5, 4, 4, 4, 4, 4, 5, 1, 1, 1, 1, 1, 1, 1, 1],
          [5, 4, 4, 4, 4, 4, 4, 4, 5, 1, 1, 1, 1, 1, 1, 1],
          [4, 5, 4, 4, 4, 4, 4, 5, 3, 3, 3, 3, 2, 2, 2, 2],
          [5, 4, 4, 4, 4, 4, 5, 4, 3, 3, 3, 3, 3, 3, 3, 3],
          [4, 4, 4, 4, 4, 5, 4, 4, 3, 3, 3, 3, 2, 2, 2, 5],
          [4, 4, 5, 4, 5, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2],
          [1, 1, 1, 5, 3, 3, 3, 3, 2, 2, 2, 2, 3, 5, 3, 5],
          [1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 5, 3, 5, 3],
          [1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 3, 5, 3, 5],
          [1, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 2, 5, 3, 5, 3],
          [1, 1, 1, 1, 2, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 4],
          [1, 1, 1, 1, 2, 3, 2, 2, 5, 3, 5, 3, 4, 4, 4, 4],
          [1, 1, 1, 1, 2, 3, 2, 2, 3, 5, 3, 5, 4, 4, 4, 4],
          [1, 1, 1, 1, 2, 3, 5, 2, 5, 3, 5, 3, 4, 4, 4, 4],
      ];

      // In compTable[userMBTI_num], sweep through array extracting all indices where element matches compLevel_num
      var arrayOfIndices = [];
      var relevantArray = compTable[userMBTI_num];
      for (let i = 0; i < relevantArray.length; i++) {
          if (relevantArray[i] === compLevel_num) {
              arrayOfIndices.push(i);
          }
      }

      var desiredTypesArray = []; // This is array of acceptable MBTI types (in their numerical representation)
      for (let i = 0; i < arrayOfIndices.length; i++) {
          desiredTypesArray.push(typeArray[arrayOfIndices[i]]);
      }

      $.ajax({
          url: "/api/users/personality",
          type: "POST",
          data: { desiredTypesArray }
      }).then(function (data) {
          if (!data || !data.length) {
              displayEmpty();
          }
          else {
              initializeRows(data);
          }
      });

  });
  // --------------------------------------------------------------

  // CODE FOR FILTERING BY FINANCE SCORE
  // --------------------------------------------------------------

  $(".finance").on("click", function () {
      var desiredFinance = $("#financeFilter").val();

      $.get("/api/users/finance/" + desiredFinance + "", function (data) {
          if (!data || !data.length) {
              displayEmpty();
          }
          else {
              initializeRows(data);
          }
      })
  });
  // --------------------------------------------------------------

  // CODE FOR FILTERING BY CLEAN SCORE
  // --------------------------------------------------------------

  $(".clean").on("click", function () {
      var desiredClean = $("#cleanFilter").val();

      $.get("/api/users/clean/" + desiredClean + "", function (data) {
          if (!data || !data.length) {
              displayEmpty();
          }
          else {
              initializeRows(data);
          }
      })
  });
  // --------------------------------------------------------------

  // EXTRACT USER INFO FROM DB
  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  $.ajax({
      url: "/api/users/currentuser",
      type: "POST",
      data: { email: sessionStorage.getItem("email") }
  }).then(function (data) {
      sessionStorage.setItem("zip", data.zip);
      sessionStorage.setItem("financeScore", data.financeScore);
      sessionStorage.setItem("cleanScore", data.cleanScore);
      sessionStorage.setItem("MBTI", data.personalityScore);
  });
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------


  // PAGE RENDERING STUFF
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------

  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");

  // This function grabs posts from the database and updates the view
  function getPosts() {
      $.get("/api/users", function (data) {

          if (!data || !data.length) {
              displayEmpty();
          }
          else {
              initializeRows(data);
          }
      });
  }

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows(posts) {
      blogContainer.empty();
      var postsToAdd = [];
      for (var i = 0; i < posts.length; i++) {
          postsToAdd.push(createNewRow(posts[i]));
      }
      blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
      var newPostCard = $("<div>");
      newPostCard.addClass("card");


      var newPostName = $("<span>");
      var newPostGender = $("<span>");
      var newPostAge = $("<span>");
      var newPostEmail = $("<span>");
      var newPostBio = $("<span>");
      var newPostHobbies = $("<span>");
      var newPostBudget = $("<span>");
      var newPostJobTitle = $("<span>");
      var newPostCity = $("<span>");
      var newPostFinanceScore = $("<span>");
      var newPostCleanScore = $("<span>");
      var newPostMBTI = $("<span>");

      newPostName.text("Name: " + post.username);
      newPostGender.text("Gender: " + post.gender);
      newPostAge.text("Age: " + post.age);
      newPostEmail.text("Email: " + post.email);
      newPostBio.text("Bio: " + post.bio);
      newPostHobbies.text("Hobbies: " + post.hobbies);
      newPostBudget.text("Budget: " + post.budget);
      newPostJobTitle.text("Job title: " + post.jobTitle);
      newPostCity.text("City: " + post.city);
      newPostFinanceScore.text("Finance score: " + post.financeScore);
      newPostCleanScore.text("Clean score: " + post.cleanScore);
      newPostMBTI.text("MBTI type: " + post.personalityScore);

      newPostCard.append(newPostName);
      newPostCard.append(newPostGender);
      newPostCard.append(newPostAge);
      newPostCard.append(newPostEmail);
      newPostCard.append(newPostBio);
      newPostCard.append(newPostHobbies);
      newPostCard.append(newPostBudget);
      newPostCard.append(newPostJobTitle);
      newPostCard.append(newPostCity);
      newPostCard.append(newPostFinanceScore);
      newPostCard.append(newPostCleanScore);
      newPostCard.append(newPostMBTI);

      newPostCard.data("post", post);
      return newPostCard;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
      blogContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No users yet.");
      blogContainer.append(messageH2);
  }
// --------------------------------------

