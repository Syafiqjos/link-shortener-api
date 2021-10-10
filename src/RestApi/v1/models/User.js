const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [ true, 'Please enter an email!' ],
        unique: [true, 'Email already exists! Please login!'],
        validate : [ isEmail, 'Please enter a valid email!' ],
        lowercase: true,
        maxlength: [ 128, 'Email max length is 128 characters' ]
    },
    password: {
        type: String,
        required: [ true, 'Please enter a password!' ],
        minlength: [ 8, 'Password minimum length is 8 characters!' ],
        maxlength: [ 128, 'Password max length is 128 characters' ]
    },
    fullname: {
        type: String,
        required: [ true, 'Please enter fullname!' ],
        maxlength: [ 256, 'Fullname max length is 256 characters' ]
    },
    phone: {
        type: String,
        maxlength: [ 128, 'Phone max length is 128 characters' ],
    }
},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.post('save', async function(err, doc, next) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
        next(Error('Email already exists! Please login!'));
    } else {
        next(err);
    }
});

userSchema.statics.login = async function (email, password) {
    if (email == '' || email == null) {
        throw Error('Please insert email!');
    }
    if (password == '' || password == null) {
        throw Error('Please insert password!');
    }
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Email not found');
};

userSchema.statics.register = async function (body) {
    // const body = {
    //     email,
    //     password,
    //     fullname,
    //     phone
    // };
    try {
        const user = new User(body);
        await user.save();

        return user;
    } catch (err) {
        throw err
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;