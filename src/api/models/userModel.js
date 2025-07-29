const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true, 
        minlength: 2, 
        maxlenght: 50 
    },
    email: { 
        type: String, 
        required: true, 
        lowercase: true,
        unique: true // Esto evita emails duplicados
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    image: {
        type: String,
        default: 'https//' //Avatar génerico    
    },
    favoriteSongs: {
        type: [mongoose.Types.ObjectId],
        ref: 'song',
        default: [] // Array vacío por defecto
    }
},
{
    timestamps: true
}
)

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

const User = mongoose.model('user', userSchema, 'users');

module.exports = { User };


