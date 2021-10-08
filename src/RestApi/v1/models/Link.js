const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    redirect_url: {
        type: String,
        required: true
    },
    custom_url: {
        type: String,
        required: true
    },
    author: {
        // type: String // Semisal gaada author berarti gabisa dihapus
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;