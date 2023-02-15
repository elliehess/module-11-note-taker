const express = require('express'); 

//Import modular routes for /notes
const notesRouter = require('./notesRoute');

const app = express ();

app.use('/notes', notesRouter);

module.exports = app;