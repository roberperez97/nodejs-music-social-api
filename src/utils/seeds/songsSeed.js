require('dotenv').config();
const mongoose = require('mongoose');
const { Song } = require('../../api/models/songModel');
const songsData = require('../../data/songs');

const lanzarSemilla = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        const allSongs = await Song.find();

        if(allSongs.length) {
            await Song.collection.drop();
        }
        await Song.insertMany(songsData);
        console.log('Semilla insertada correctamente');

        await mongoose.disconnect();
    } catch (error) {
        console.log(`Error insertando semilla: ${error}`);
    }
}

lanzarSemilla();
