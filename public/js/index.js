// Get references to page elements
var user = $("#user").val().trim()
var password =$("#password").val().trim()
var email=$("#email").val()
var bio =$("#bio").val().trim()
var hobbies =$("#hobbies").val().trim()
var age =parseInt($("#age").val().trim())
var gender=$("#gender").val().trim()
var financeScore=parseFloat($("#finance").val().trim())
var personalityScore=parseFloat($("#personality").val().trim())
var cleanScore = parseFloat($("#clean").val().trim())
var jobTitle=$("#job").val().trim()
var employed = false
var city = $("#city").val().trim()
var zip = parseInt($("#zip").val().trim())
var $submitBtn = $("#submit");


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var User = {
    user: user,
    password_hash: password,
    email: email,
    phone: phone,
    bio: bio,
    hobbies: hobbies,
    age: age,
    gender: gender,
    budget: budget,
    finance_score: financeScore,
    personality_score: personalityScore,
    clean_score: cleanScore,
    job_title: jobTitle,
    employed: employed,
    city: city,
    zip: zip,
  };
module.exports=User
  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  exampleText.val("");
  exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
submitBtn.on("click", handleFormSubmit);
exampleList.on("click", ".delete", handleDeleteBtnClick);
