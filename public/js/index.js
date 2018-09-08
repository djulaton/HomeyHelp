// Get references to page elements

var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function(User) {
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
var handleLogin = function(event){
  event.preventDefault();
  var login =$("#emailLogin").val().trim()
  var password = $("#passwordLogin").val().trim()

  API.login(login, password)
}
var handleFormSubmit = function(event) {
  event.preventDefault();
  var User = {
    user: $("#name").val().trim(),
    password: $("#password").val().trim(),
    email:$("#email").val().trim(),
    phone: $("#phoneNumber").val().trim(),
    bio:  $("#bio").val().trim(),
    hobbies: $("#hobbies").val().trim(),
    age: parseInt($("#age").val().trim()),
    gender: $("#gender").val().trim(),
    budget: parseFloat($("#budget").val().trim()),
    finance_score: parseInt($("#financeScore").val().trim()),
    personality_score: parseInt($("#personalityScore").val().trim()),
    clean_score: parseInt($("#cleanScore").val().trim()),
    job_title: $("#jobTitle").val().trim(),
    employed: $("employed").val().trim(),
    city: $("#city").val().trim(),
    zip: parseInt("#zip").val().trim() ,
  };
  API.saveUser(User)
  //create new api route for new user, create ajax to call body of user
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
