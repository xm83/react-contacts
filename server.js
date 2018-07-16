const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const Contact = mongoose.model('Contact', {
  name: String,
  phone: String,
  birthday: String,
})

// SERVER OUT A STATIC WEBSITE: everything in your public directory, and all the JS code 
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())


// ROUTES

app.post('/contact/create', function (req, res) {
  console.log(req.body)
  // create new contact in database
  new Contact(req.body)
    .save()
    .then((doc) => res.json({id: doc.id}))
    .catch((err) => res.status(500).end(err.message))
});

// delete Contact
app.delete('/contact/:id', function (req, res) {
    Contact.deleteOne({_id: req.params.id}, (err) => {
      console.log(err);
      if(err) res.status(500).end(err.message)
      else {
        res.json({ok: true})
      }
    })
  });

// update Contact
app.put('/contact/:id', function (req, res) {
    Contact.findById(req.params.id, (err, doc) => {
      if(err) res.status(500).end(err.message)
      else {
        doc.name = req.body.name
        doc.phone = req.body.phone
        doc.birthday = req.body.birthday
        doc.save(()=> {
          res.json({ok: true})
        })
      }
    })
  });

app.get('/contact', function (req, res) {
  Contact.find({}, (err, docs) => {
    if(err) res.status(500).end(err.message)
    else res.json(docs)
  })
});

app.get('/contact/:id', function (req, res) {
  Contact.findById(req.params.id, (err, doc) => {
    if(err) res.status(500).end(err.message)
    else res.json(doc)
  })
});

// DO NOT REMOVE THIS LINE - send out a basic HTML page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
