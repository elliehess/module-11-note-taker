const fs = require('fs');
const notesRoute = require('express').Router();

// GET Route for retrieving all the notes
notesRoute.get('/api/notes', (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./db/db.json", "utf8")));
    // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // GET Route for a specific note
notesRoute.get('/api/notes/:_id', (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(data[Number(req.params.id)]);
  });

  // POST Route for a new note
notesRoute.post('/api/notes', (req, res) => {
  let newNote = req.body;
  let noteID = (data.length).toString();
  console.log(noteID);
  newNote.id = noteID;
  data.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
    if (err) throw (err);
  });
  res.json(data);

});

  module.exports = notesRoute;