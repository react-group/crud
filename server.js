'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = module.exports = exports = express();

mongoose.connect(process.env.MONGOLAB_URI ||
  'mongodb://localhost/kittens_app_dev');

const kittenRouter = require(__dirname + '/routes/kitten_router');

app.use(express.static(__dirname + '/build/'));

app.use('/api', kittenRouter);

app.server = app.listen(3000, () => console.log('listening on port: ' + 3000));
