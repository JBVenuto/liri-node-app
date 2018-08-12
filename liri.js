//Include NPM packages for Request, DotEnv, Twitter, and Spotify
var request = require("request");
require("dotenv").config();
var twitter = require("twitter");
var spotify = require("node-spotify-api");

//This variable takes in the arguments from the command line
nodeArg = process.argv;

//This variable takes an argument from the command line and tells the app which website to search 
var call = nodeArg[2];
console.log(call);
//This variable takes an argument from the command line and tells the app the search term
var search = "";

//Loop through user arguments to find the search term
for (i = 3; i < process.argv.length; i++) {
    console.log(process.argv[i]);
    search += process.argv[i];
    console.log(search);
}
