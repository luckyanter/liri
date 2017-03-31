
var operand = process.argv[2];

function execute(){
  if (operand === "my-tweets") {
    var twitterList = require("./keys.js");
    var twitterKeysGrap = twitterList.twitterKeys;

    var Twitter = require('twitter');
    var client = new Twitter(twitterKeysGrap);
    var params = {screen_name: 'anteran02755085'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        // console.log(tweets);
        for (var i = 0; i <tweets.length ; i++) {
      	  console.log(tweets[i].text);
        }
      }
    });

  }

  else if (operand === "spotify-this-song") {

    var spotify = require('spotify');
    var song;
    if (process.argv.length <= 3){
      song = "Dancer in a Daydream";
    }else{
      for (var i = 3; i < process.argv.length; i++) {
        song = "" + " " + process.argv[i];
        // console.log(song);
      }
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
      if ( err ) {
        console.log('Error occurred: ' + err);
        return;
      }
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Artist : " + data.tracks.items[0].album.artists[0].name);
      console.log("Song : " + data.tracks.items[0].name);
      console.log("Link: " + data.tracks.items[0].preview_url);
    });

  }


  else if (operand === "movie-this") {
    var request = require("request");
    var movieName;
    if (process.argv.length <= 3){
      movieName = "Mr.Nobody";
    }else{
      for (var i = 3; i < process.argv.length; i++) {
        movieName = "" + " " + process.argv[i];
        // console.log(movieName);
      }
    }


    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log(JSON.parse(body));
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year Released: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Movie Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Rotten Tomatoes URL: " + JSON.parse(body).Ratings[1].Source);
      }
    });
  }


else if (operand === "do-what-it-says") {
  var fs = require("fs");
  fs.readFile("random.txt", "utf8", function(error, data) {
  console.log(data);
  console.log("==========================");
  var dataArr = data.split(",");
  console.log(dataArr[0]);
  operand = dataArr[0];
  execute();
});
}
else {
  console.log("Not a recognized command");
}
}
execute();
