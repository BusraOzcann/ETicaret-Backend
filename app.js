const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/users");

app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://busraozcan:2512985801@cluster0.cqfoo.mongodb.net/e-ticaret?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => console.log("Baglantı kuruldu"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world");
  console.log("/ -- Kullanıcı index sayfasında  ");
});

app.post("/register", function (req, res) {
  User.exists({ email: req.body.mail }, function (err, docs) 
  {
    if (docs == null) 
    {
      var obj = new User({
        name: req.body.fname,
        lastName: req.body.lname,
        email: req.body.mail,
        password: req.body.pw1,
      });

      obj
        .save()
        .then((result) => {
          res.status(200).send({ message: "user added" });
        })
        .catch((err) => console.log("Kayıt başarısız: ", err));
    } 
    else if(docs != null)
      console.log("Kullanıcı veritabanında mevcut");
    else
      console.log("VERİTABANINA EKLERKEN HATA OLUSTU !!! -->", err);
  });
});

app.listen(5000, () => {
  console.log("Örnek uygulama 5000 portunda başlatıldı");
});
