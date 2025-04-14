const mongoose = require('mongoose');

const poiSchema = new mongoose.Schema({
  name: String,
  description: String,
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model('POI', poiSchema);
