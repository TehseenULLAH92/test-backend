// FileName: index.js
require('dotenv').config()
const express = require('express') // Import express
const bodyParser = require('body-parser'); // Import Body parser
const mongoose = require('mongoose'); // Import Mongoose
const user = require("./routes/user") // Import user route
const app = express(); // Initialize the app

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
db.once('open', function(){
    console.log('Connected to MongoDB');
  })
  db.on('error', function(err){
    console.log(err);
  })

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World with Express')); // Send message for default URL
app.use('/api', user) // Use Api routes in the App

var port = process.env.PORT || 3000; // Setup server port
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestAPI on port " + port);
});