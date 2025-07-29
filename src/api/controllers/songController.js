const Song = require('../models/songModel');

const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postSong = async (req, res, next) => {
  try {
    const song = new Song(req.body);
    const savedSong = await song.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
        message: 'Canción actualizada',
        song
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndDelete(id);
    res.status(200).json({
        message: 'Canción eliminada',
        song
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSongs, getSong, postSong, putSong, deleteSong };

