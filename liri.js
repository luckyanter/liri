
var operand = process.argv[2];

function execute(){
if (operand === "my-tweets") {
  var twitterList = require("./keys.js");
  var twitterKeysGrap = twitterList.twitterKeys;

  var Twitter = require('twitter');
  var client = new Twitter(twitterKeysGrap);
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {

      console.log(tweets);
      var tweetArr = tweets.split(",");
      for (var i = tweetArr.length - 1; i >= tweetArr.length - 20 ; i--) {
      	console.log(tweetArr[i]);
      }
    }
  });

}

else if (operand === "spotify-this-song") {
  var spotify = require('spotify');
  spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
}

else if (operand === "movie-this") {
  var request = require("request");
  var movieName = process.argv[3];
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("Release Year: " + JSON.parse(body).Year);
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
