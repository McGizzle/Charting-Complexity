//import modules
var express = require('express');
var app = express();
const { Client } = require('pg')

//Create a connection to the database using the username and password from your MySQL database.
const client = new Client({
    host : "localhost",
    user : "root",
    password: "root",
    database: "argon_test",
    port: 5432
});
//connect to the database
client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


// create a get request that fetches data from database
app.get('/', function(req, res) {
    var queryString = 'SELECT * FROM repository ORDER BY NODES ASC';
    client.query(queryString, function (err, qres) {
        if (err) {
            throw err;
        }
        return res.json(qres);
    });
    //this can be used to end the mysql connection
    // connection.end();
});

//enable cross-domain request.
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);
app.use(express.static(__dirname + "/public"));
//run the server on a particular port
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});

