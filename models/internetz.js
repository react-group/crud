'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const internetzSchema = new Schema({
  name: { type: String, default: 'generic' },
  location: { type: [Number], index: '2d' },
  kittens: [{ type: Schema.Types.ObjectId, ref: 'Kitten' }]
});

module.exports = exports = mongoose.model('Internetz', internetzSchema);
