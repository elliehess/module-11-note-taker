const express = require('express');
const path = require('path');
const fs = require('fs');
//const { clog } = require('./middleware/clog');
const apiRouter = require('./routes/api.js');
const notesRouter = require('./routes/notes')

//Declare port 
const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware
//app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//Api and user routes with methods
app.use('/api', apiRouter);
app.use('/notes', notesRouter);


// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);