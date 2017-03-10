var currentTempF;
var currentTempC;
var currentUnit;

// Toggles between Fahrenheit and Celsius
function toggleUnit() {
	if (currentUnit == "F") {
		currentUnit = "C";
		$(".temp").text(currentTempC + "℃");
	} else {
		currentUnit = "F";
		$(".temp").text(currentTempF + "℉");
	}
}

// Changes the background of the page using the Flickr API. Selects a random one from the top 10 results.
function setBackground(weather) {
	const flickrAppID = "a02184147893b2c40cd03d198ccd7944";
	const searchTerm = weather + "+landscape";
	const sortMethod = "relevance";
	const minViews = 100;
	const imageSize = "url_h";

	$.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrAppID +
			  "&text=" + searchTerm + "&sort=" + sortMethod + "&media=photos&extras=views%2C"+ imageSize + "&per_page=50&format=json&nojsoncallback=1", function(data) {
			  	var popularPhotos = [];
			  	var index = 0;
			  	var currentPhoto;

			  	// Finds the first 10 photos with the minimum number of views.
			  	while(popularPhotos.length < 10) {
			  		currentPhoto = data.photos.photo[index];
			  		if (currentPhoto.views >= minViews && currentPhoto.hasOwnProperty(imageSize)) {
			  			popularPhotos.push(data.photos.photo[index]);
			  		}
			  		index++;
			  	}

			  	// Picks a random photo from the 10 selected photos.
			  	var randomNumber = Math.floor(Math.random() * 10);
			  	var image = popularPhotos[randomNumber];

			  	// Sets the background of the page to the selected photo.
			  	$("body").css("background-image", "url(" + image[imageSize] + ")");
	});
}

// Displays the current temperature and weather condition using Apixu API
function displayWeather(lat, lon) {
	const apixuAppID = "4168736e4cf34f0da41175828171003";

	$.getJSON("https://api.apixu.com/v1/current.json?key=" + apixuAppID + "&q=" + lat + "," + lon, function(data) {
		setBackground(data.current.condition.text);
		$(".sentenceStart").text("It's");
		$(".weather img").attr("src", data.current.condition.icon);
		currentTempF = data.current.temp_f;
		currentTempC = data.current.temp_c;
		currentUnit = "F";
		$(".temp").text(currentTempF + "℉");
		$(".location").text("in " + data.location.name);
	});
}

var main = function() {
	$(".temp").click(toggleUnit);

	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			displayWeather(position.coords.latitude, position.coords.longitude);
		});
	} else {
		$(".weather").html("Couldn't retrieve weather data");
	}
};

$(document).ready(main);