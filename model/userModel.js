const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Enter The Username']
    },
    email: {
        type: String,
        required: [true, 'Please Enter The email'],
        unique: [true, 'Email Address Already Taken'],
    },

    password: {
        type: String,
        required: [true, 'Please Enter The password']
    }
},{
    timestamps: true,
    versionKey: false,
}

);

module.exports = mongoose.model('User', userSchema);