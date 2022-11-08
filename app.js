const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


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

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }

      }
    ]
  }

  let jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/faefa093d4"

  const options = {
    method: "POST",
    auth: "cristian1:9d29abad1549eb4660adefe3d956418e-us13"
  }

  const request = https.request(url, options, function(response) {

   if (response.statusCode == 200) {
    res.sendFile(__dirname + "/success.html");
   } else {
    res.sendFile(__dirname + "/failure.html");
   }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
})

app.post("/success", function(req, res) {
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});

// API KEY 9d29abad1549eb4660adefe3d956418e-us13

//Audience ID: faefa093d4