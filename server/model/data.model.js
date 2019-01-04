'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataModel = new Schema({
  date: Date,
  ip: String,
  url: String,
  type: String
},
{collection: 'links'});

module.exports = mongoose.model('data', DataModel);