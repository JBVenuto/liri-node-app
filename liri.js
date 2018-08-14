//Include NPM packages for Request, DotEnv, Twitter, and Spotify
var request = require("request");
require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var fs = require("fs");

//Access keys information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//This variable takes in the arguments from the command line
nodeArg = process.argv;

//This variable takes an argument from the command line and tells the app which website to search 
var call = nodeArg[2];
console.log(call);
//This variable takes an argument from the command line and tells the app the search term
var search = nodeArg[3];

//If the user search term is longer than 1 word this will loop through user arguments to find the search term
if (nodeArg.length > 3) {
    for (i = 4; i < nodeArg.length; i++) {
        // console.log(nodeArg[i]);
        search += "+" + nodeArg[i];
    }
}
console.log(search);

function apiFunction(call, search) {
    //This is what will happen when a call is made for Twitter
    if (call == "my-tweets") {
        //This tells the app what screen name to look up on twitter
        var params = {screen_name: 'venuto_joseph'};
        //This tells the app to get the information from my timeline
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            //Store the results from twitter
            var tweetArr = tweets;
            // console.log(tweetArr);
            //Loop through the results and log the user name and tweet in a more readable format than the original result
            for (j = 0; j < tweetArr.length; j++) {
                console.log(tweetArr[j].user.name + ":");
                console.log(tweetArr[j].text);
            }
        }
    });
    }

    //This is what will happen when a call is made for a music search
    else if (call == "spotify-this-song") {
        //Check that the user typed in a song to search
        if (typeof search == "undefined") {
            search = "ace of base";
        };
        //This searches spotify for the query the user input on the terminal
        spotify.search({ type: 'track', query: search, limit: 1}, function(err, data) {
            //Logs an error if one occurs
            if (err) {
                return console.log('Error occurred: ' + err);
            }

        //Store the results from Spotify
        var spotifyArr = data.tracks.items;
        //Log the artists, song name, preview link, and album
        console.log("Artist(s): " + spotifyArr[0].album.artists[0].name); 
        console.log("Song name: " + spotifyArr[0].name); 
        console.log("Preview link: " + spotifyArr[0].preview_url); 
        console.log("Album: " + spotifyArr[0].album.name); 
        });
    }

    //This is what will happen when a call is made for a movie search
    else if (call == "movie-this") {
        //Check that the user typed in a movie to search and search for Mr. Nobody if they didn't put in a movie
        if (typeof search == "undefined") {
            search = "mr+nobody";
        };

        //This searches OMDb for the query the user input on the terminal
        request("http://www.omdbapi.com/?t=" + search + "&apikey=b70fb2c5", function(error, response, body) {
            var omdbObj = JSON.parse(body);

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                //Log the movie title, release year, IMDB rating, Rotten Tomatoes rating, country produced in, language, plot, and actors
                console.log("Title: " + omdbObj.Title);
                console.log("Year Released: " + omdbObj.Year);
                console.log("IMDB Rating: " + omdbObj.Ratings[0].Source);
                console.log("Rotten Tomatoes Rating: " + omdbObj.Ratings[1].Source);
                console.log("Country: " + omdbObj.Country);
                console.log("Language: " + omdbObj.Language);
                console.log("Plot: " + omdbObj.Plot);
                console.log("Actors: " + omdbObj.Actors);
            }

        });
    }



    //This is what will happen if the user tries to call something the app can't recognize
    else {
        console.log("Please type 'my-tweets' to see my tweets, 'spotify-this-song' to learn about a song, 'movie-this' to learn about a movie, or 'do-what-it-says' for a random result.");
    };
}

if (call == "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(err, data) {
        //Give the error if one occurs
        if (err) {
            return console.log(err);
        }

        //Break the string up based on spaces
        var output = data.split(" ");

        //This variable takes an argument from the command line and tells the app which website to search 
        var call = output[0];
        console.log(call);
        //This variable takes an argument from the command line and tells the app the search term
        var search = output[1];

        //If the user search term is longer than 1 word this will loop through user arguments to find the search term
        if (output.length > 2) {
        for (i = 2; i < output.length; i++) {
            // console.log(process.argv[i]);
            search += "+" + output[i];
            }
        }
        console.log(search);

        //Call the function to do the search
        apiFunction(call, search);
    })
}

else {
    //Call the function to run the program
    apiFunction(call, search);    
}
