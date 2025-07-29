const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Conexión realizada con éxito a la BD');
    } catch (error) {
        console.log(`Error en la conexión con BD: ${error}`);
    }
}

module.exports = { connectDB };