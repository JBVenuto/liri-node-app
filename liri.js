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
var search = process.argv[3];

//Loop through user arguments to find the search term
if (process.argv.length > 3) {
    for (i = 4; i < process.argv.length; i++) {
        console.log(process.argv[i]);
        search += "+" + process.argv[i];
    }
}
console.log(search);

//This is what will happen when a call is made for Twitter
if (call == "my-tweets") {
}

//This is what will happen when a call is made for a music search
else if (call == "spotify-this-song") {
}

//This is what will happen when a call is made for a movie search
else if (call == "movie-this") {
}

//This is what will happen if the user tries to call something the app can't recognize
else {
    console.log("Please type 'my-tweets' to see my tweets, 'spotify-this-song' to learn about a song of your choosing, or 'movie-this' to learn about a movie.");
};