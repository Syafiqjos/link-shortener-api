const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;