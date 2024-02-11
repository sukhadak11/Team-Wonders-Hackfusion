// models/userModel.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // Note: Passwords should be securely hashed and stored
    // Add other fields as needed
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
