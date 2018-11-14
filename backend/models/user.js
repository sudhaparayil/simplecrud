var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
  
    email: {
        type: String,
        unique: true,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
  
});

const User = module.exports = mongoose.model('User', UserSchema);