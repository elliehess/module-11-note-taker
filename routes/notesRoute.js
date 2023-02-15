const fs = require('fs');
const notesRoute = require('express').Router();
const uuidv1 = require ('uuid/v1')
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notesRoute.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // GET Route for a specific note
notesRoute.get('/:id', (req, res) => {
  const noteID = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteID);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

  // POST Route for a new note
notesRoute.post('/', (req, res) => {
  console.log(req.body);

  const { text, title } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv1(),
    };
    console.log(newNote);

    readAndAppend(newNote, './db/db.json');
    const response = {
      status: 'success',
      body: newNote,
    };
    res.json(response);
  } else {
    res.error('Error in adding Note');
  }
});

// DELETE Route for a specific note
notesRoute.delete('/:id', (req, res) => {
  const noteID = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteID);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteID} has been deleted 🗑️`);
    });
});
  module.exports = notesRoute;