// Calling Mongoose into the project
const mongoose = require('mongoose');

// connecting to my mLab database
mongoose.connect('mongodb://chris:chris123@ds123012.mlab.com:23012/bookdatabase', { useNewUrlParser: true });

// Creating a variable which is equal to the connection
const conn = mongoose.connection;

// Export database connection
module.exports.conn = conn;


// Create a Schema or db structure
let bookSchema = new mongoose.Schema({
    username: String,
    bookNames: Array,
    image: Array,
    wishlist: Array
});

// Create a model/ collection
const books = mongoose.model('books', bookSchema);

// Export the model
module.exports.books = books



