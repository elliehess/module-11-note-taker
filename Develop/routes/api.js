const express = require('express'); 

//Import modular routes for /notes
const notesRouter = require('./notes');

const app = express ();

app.use('/notes', notesRouter);

module.exports = app;