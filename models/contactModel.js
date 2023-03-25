const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    creater_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
    name: {
        type: String,
        required: [true, 'Please add the name of contact']
    },
    email: {
        type: String,
        required: [true, 'Please enter the email address of contact']
    },
    phone_number: {
        type: String,
        required: [true, 'Please add the contact phone number']
    }
}, {
    timestamps: true,
}); 


module.exports = mongoose.model('Contact', contactSchema);