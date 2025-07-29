const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  artist: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  album: {
    type: String,
    trim: true,
    maxlength: 100,
    default: 'Single'
  },
  genre: {
    type: String,
    required: true,
    enum: ['rock', 'pop', 'jazz', 'classical', 'electronic', 'hip-hop', 'reggae', 'country', 'blues', 'folk', 'indie', 'metal']
  },
  year: {
    type: Number,
    min: 1500,
    max: new Date().getFullYear() // Permite año actual
  },
  duration: {
    type: String, // Formato: "03:45"
    match: [/^[0-9]{1,2}:[0-5][0-9]$/, 'Formato de duración inválido (mm:ss)']
  }
}, 
{
  timestamps: true
}
);

const Song = mongoose.model('song', songSchema, 'songs');

module.exports = { Song };