const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require("./Schemas/User")

app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://busraozcan:2512985801@cluster0.cqfoo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/', (req, res) => {
  res.send('Hello world');
  console.log("/ -- Kullanıcı index sayfasında  ")
})

app.post("/register", function(req, res){
  var obj = new User({
    name: req.body.fname,
    lastName: req.body.lname,
    email: req.body.mail,
    password: req.body.pw1,
  })

  obj.save(function (err) {
    if (err) return handleError(err);
  });
  console.log(obj);
  res.send("Kayıt başarılı")
})


app.listen(5000, () => {
  console.log("Örnek uygulama 5000 portunda başlatıldı")
})