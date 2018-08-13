//Include NPM packages for Request, DotEnv, Twitter, and Spotify
var request = require("request");
require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");

//Access keys information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

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
    var params = {screen_name: 'venuto_joseph'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        // console.log(tweets);
        var tweetArr = tweets;
        // console.log(tweetArr);
        for (j = 0; j < tweetArr.length; j++) {
            console.log(tweetArr[j].user.name + ":");
            console.log(tweetArr[j].text);
        }
    }
});
}

//This is what will happen when a call is made for a music search
else if (call == "spotify-this-song") {
}

//This is what will happen when a call is made for a movie search
else if (call == "movie-this") {
}

//This is what will happen when a call is made to the random file
else if (call =="do-what-it-says"){

}

//This is what will happen if the user tries to call something the app can't recognize
else {
    console.log("Please type 'my-tweets' to see my tweets, 'spotify-this-song' to learn about a song of your choosing, 'movie-this' to learn about a movie, or 'do-what-it-says' for a random result.");
};