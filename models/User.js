const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String, 
    googleId: String, 
    thumbnail: String
})


module.exports = mongoose.model('Users', userSchema);