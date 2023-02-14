const notesRoute = require('express').Router();


// GET Route for retrieving all the notes
notesRoute.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });


module.exports = notesRoute