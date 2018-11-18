// Calling Express, bodyParser, Cors, Path, fs, Crypto, Mongoose, Multer, Multer GridGS Storage, GridFS Stream & methodOverride into the project
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

// Creating an Express app
const app = express();
// Middlewares
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
// Import database
const { conn } = require('./database');
// Import model/ collection
const { books } = require('./database');
// Set the port number to 3000
const port = 3000;
const mongoURI = "mongodb://chris:chris123@ds123012.mlab.com:23012/bookdatabase";
let gfs;

// Handling the database errors
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('Database connection successful!!!'); 
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

// Creating a route for POST requests from the form
app.post('/upload',upload.array('image'), (req,res) => {
    // To upload single images it would be upload.single() and req.file and also change the type from Array to Object within the Schema.
    const book = new books({ username: req.body.username , bookNames: req.body.title.split(','), image: req.files, wishlist: req.body.wishlist.split(',') });
    book.save((err, books) => {
        if(err) return console.log(err);
        console.log("New book has been added successfully...");
    });
    res.redirect('http://localhost:4200/addBook');
    // res.json({ clientMessage: "New book has been added successfully" }); 
}); 

// Basic route to get all files
app.get('/files', (req,res) => {

    gfs.files.find().toArray((err, files) => {
        // Check if files
        if(!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        // If files exist
        return res.json({files});
    });
});

// A route for users searched by username
app.post('/users',(req, res) => {
    let name = req.body.username;
    console.log("The data has been received");
    books.findOne({ username: name }, (err, docs) => {
        if(err) err;
        res.json(docs);
    });
});


// A route to delete found users
app.delete('/delete', (req,res) => {
    let name = req.body.username;
    console.log('The user has been deleted');
    books.findOneAndRemove({ username: name }, (err, docs) => {
        if(err) err;
        res.json(docs);
    });
});


// Listen to the port
app.listen(port, console.log(`Server started on port ${port}`)
);