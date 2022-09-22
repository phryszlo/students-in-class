const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var favicon = require('serve-favicon');

const Student = require('./models/student.js');

require('dotenv').config();

const app = new express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// this a body parser
app.use(express.urlencoded({ extended: false }));

// look it up
app.use(methodOverride("_method"))

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log(mongoose.connection);
  console.log('connected to mongo');
});

//  Index
app.get('/', (req, res) => {
  res.redirect("/students");
})
app.get('/students', async (req, res) => {
  await Student.find()
    .then((allStudents) => {
      res.render('Index', {
        students: allStudents,
      });
      
    })
    .catch((err) => {
      res.json(err);
    })
})


// New

app.get('/students/new', (req,res) => {
  res.render('New', {});
})
// POST

app.post('/students', async (req, res) => {
  if (req.body.isPassing === "on") {
    req.body.isPassing = true;
  }
  else {
    req.body.isPassing = false;
  }

  await Student.create(req.body)
    .then((createdStudent) => {
      res.redirect('/students');
    })
    .catch((err) => {
      res.json();
    })

})

// Edit
app.get('/students/:id/edit', async (req, res) => {
  await Student.findById(req.params.id)
    .then((foundStudent) => {
      res.render('Edit', {
        student: foundStudent,
      });
    })
    .catch((err) => {
      res.json(err);
    })
})
// Update
app.put('/students/:id', async (req, res) => {
  if (req.body.isPassing === "on") {
    req.body.isPassing = true;
  }
  else {
    req.body.isPassing = false;
  }

  console.log(`put ${req.params.id}`);

  await Student.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedStudent) => {
      res.redirect(`/students/${req.params.id}`);
    })
    .catch ((err) => {
      res.json(err);
    });
})
// DELETE
app.delete('/students/:id', async (req, res) => {

console.log(`delete: ${req.params.id}`);
  await Student.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/students');
    })
    .catch((err) => {
      res.json();
    })
})


// Seeds
app.get('/students/seed/', async (req, res) => {
  await Student.create([
    {
      name: "jonas",
      gpa: "4.0",
      isPassing: true,
    },
    {
      name: "jane",
      gpa: "4.4",
      isPassing: true,
    },
    {
      name: "bo fliefson",
      gpa: "1.23",
      isPassing: false,
    },
  ])
  .then (() => {
    res.redirect("/students");
  })
  .catch((err) => {
    res.json(err);
  })
});
  
// Show

app.get('/students/:id', async (req, res) => {
  await Student.findById(req.params.id)
    .then((foundStudent) => {
      res.render('Show', {
        student: foundStudent,
      });
    })
    .catch((err) => {
      res.json(err);
    })
});


app.listen(PORT, () => {
  console.log(`server listens on ${PORT}`);
})