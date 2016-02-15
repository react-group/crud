'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kittenSchema = new Schema({
  name: { type: String, required: true },
  eats: { type: String, default: 'yogurt' },
  creates: { type: String, default: 'magic' }
});

module.exports = exports = mongoose.model('Kitten', kittenSchema);
