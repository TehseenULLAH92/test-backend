// userModel.js
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Setup schema
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    dob: String,
    address: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// Export User model
const User = module.exports = mongoose.model('User', UserSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}