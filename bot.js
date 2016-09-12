// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
//var mediaArtsSearch = {q: "#mediaarts", count: 10, result_type: "recent"}; 

// This function finds the latest tweet with a random job search hashtag, and retweets it.
function retweetLatestHashtag() {
	var hashtagList = ["#interviewtips", "#technicalinterview", "#softwaredevelopers", "#webdevelopers",  "#softwarejobs", "#jobsearchtips", "#interviewprep", "#girlswhocode"];
	var randHashNum = getRandNum(8);
	var hashtag = hashtagList[randHashNum];
	var hashtagSearch = {q: hashtag, count:10, result_type: "recent"};

	T.get('search/tweets', hashtagSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

//This function retweets the latest tweet from one of my favorite companies
function retweetLatestFollowing() {
	var companiesList = ['salesforcejobs', 'renttherunway', 'spotifyjobs', 'creativecloud', 'adobe', 'pinterest', 'tableau', 'amazon', 'meltmedia', 'jointheflock', 'vimeojobs', 'womenwhocode', 'girlswhocode', 'microsoft', 'google'];
	var randCompNum = getRand(15);
	var company = companiesList[randCompNum];
	var companyslasttweet = {screen_name: company, count: 1};
	T.get('statuses/user_timeline', companyslasttweet, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your company search:', error);
	  }
	});
}

function getRandNum(size) {
	var number = Math.floor((Math.random()*size)+1);
	return number;
}

function newTweet() {
	var randNum = getRandNum(5);
	if(randNum % 2){
		retweetLatestFollowing();
	} else {
		retweetLatestHashtag();
	}
}

// Try to retweet something as soon as we run the program...
retweetLatestHashtag();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(newTweet, 1000 * 60 * 60);
