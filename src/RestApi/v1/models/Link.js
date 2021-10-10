const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    redirect_url: {
        type: String,
        required: [true, 'Insert redirect_url field!']
    },
    custom_url: {
        type: String,
        required: true,
        required: [true, 'Insert custom_url field!']
    },
    author: {
        // type: String // Semisal gaada author berarti gabisa dihapus
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
});

linkSchema.post('save', async function(err, doc, next) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
        next(Error('custom-link already exists! Choose other else!'));
    } else {
        next(err);
    }
});

linkSchema.post('updateOne', async function(err, doc, next) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
        next(Error('custom-link already exists! Choose other else!'));
    } else {
        next(err);
    }
});

linkSchema.statics.truncateData = function(link) {
    if (link) {
        return {
            redirect_url: link.redirect_url,
            custom_url: link.custom_url,
        }
    }
    return null;
}

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;