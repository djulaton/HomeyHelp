var bcrypt = require("bcrypt")
var username = $("#user").val().trim()
var password = $("#password").val().trim()

db.findOne({
    where: {
        user: username
    }
}).then(function (req, res) {
    console.log("query success\n--------------" + res)

    if (res.user === username) {
        bcyrpt.compare(password, res.password, function (err, res) {
            if (err) throw err
            console.log("user and password match, ok to proceed")
        })
    }
})
