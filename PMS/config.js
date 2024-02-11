const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/Login');

connect.then(() => {
    console.log('Connected to the database');
})
    .catch(() => {
        console.log('Error connecting to the database');
    });

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
        phoneno:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            required:true
        },
        filename:{
            type:String,
            required:true
        }
    });

const collection = new mongoose.model("users", LoginSchema);


module.exports = collection;