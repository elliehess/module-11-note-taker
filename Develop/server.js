const express = require('express');
const path = require('path');
const fs = require('fs');
// const apiRouter = require('./routes/apiRoute.js');
const notesRouter = require('./routes/notesRoute.js');
const notes = require('/Users/ellie/Desktop/bootcamp/challenges/module-11-note-taker/Develop/db/db.json');

//Declare port 
const PORT = process.env.PORT || 5001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//Api and user routes with methods
// app.use('/api', apiRouter);
app.use('/notes', notesRouter);



// GET route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
//GET route to return notes from db
app.get('/api/notes', (req, res) =>
  res.json(notes)
);

// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);