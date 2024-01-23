const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const Speaker = require('./models/Speaker.model.js')


const PORT = process.env.PORT || 3030;

app.use(cors())
app.use(express.json())

mongoose.connect(
  `mongodb+srv://a:a@c0.jclsh5d.mongodb.net/kck?retryWrites=true&w=majority`, 
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.get('/hellow', (req, res)=>{
    console.log("Success");
    res.send('hello kck')
})


app.get('/speaker', (req, res)=>{
  console.log("Success II");
  res.send('hello kck speaker')
})

app.post('/api/speaker', async (req, res) => {
  console.log("in speaker")

  try {
    await Speaker.create({
      nameSurname: req.body.nameSurname,
      affiliation: req.body.affiliation,
      title: req.body.title,
      abstract: req.body.abstract,
      email: req.body.email,
      phone: req.body.phone,
    })
    res.json({ status: 'ok' })
    console.log("Connected successfully");

  } catch (err) {
    console.log(err)
    res.json({ status: 'error', error: 'Error addoffer' })
  }
})


const nodemailer = require('nodemailer');


var transport = {
  host: 'smtp.gmail.com', // e.g. smtp.gmail.com
  auth: {
    user: "kck3214321@gmail.com",
    pass: "yesr omjj eeiv vxht "
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});

app.post('/api/send', (req, res, next) => {
  const name = "krzysztof.pietrzak17@gmail.com"
  const email = req.body.email
  const message = "<h1>Wysłano zgłoszenie na udział w konferencji naukowej<h1> <br> "+
  "<h2>"+ req.body.nameSurname +  " wysłał/a zgłoszenie jako " +req.body.affiliation +  " z wystąpieniem na temat " +req.body.title+"</h2> <br>"+
"<h2>Jeśli to nie ty zignoruj tę wiadomość</h2>"

  var mail = {
    from: name,
    to: email,
    subject: 'Potwierdzenie zapisu',
    html: message
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

