const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    year: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    couponCode : {
        type: String,

    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    }
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;