require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const authRoutes = require('./src/api/routes/authRoutes');
const connectCloudinary = require('./src/config/cloudinary');
const adminRoutes = require('./src/api/routes/adminRoutes');
const songRoutes = require('./src/api/routes/songRoutes');
const userRoutes = require('./src/api/routes/userRoutes');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();
connectCloudinary();

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log(`Servidor levantado en http://localhost:3000`);
})