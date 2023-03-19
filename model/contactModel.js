const mongoose = require('mongoose')

const connectSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: 'String',
        required: [true, 'Please Enter Contact Name']
    },
    email: {
        type: 'String',
        required: [true, 'Please Enter Contact Email']
    },
    phone: {
        type: 'String',
        required: [true, 'Please Enter Contact Phone Number']
    }
}, {
    timestamps: true,
    versionKey: false,
}
)


module.exports = mongoose.model('Contact', connectSchema);