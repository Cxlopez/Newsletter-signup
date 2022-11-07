const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  let firstName = req.body.fname;
  let lastName = req.body.lname;
  let email = req.body.email;

  console.log(firstName, lastName, email);

});

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});

// API KEY 9d29abad1549eb4660adefe3d956418e-us13