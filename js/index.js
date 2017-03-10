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

// Displays the current temperature and weather condition using Apixu API
function displayWeather(lat, lon) {
	var appID = "4168736e4cf34f0da41175828171003";

	$.getJSON("https://api.apixu.com/v1/current.json?key=" + appID + "&q=" + lat + "," + lon, function(data) {
		$(".sentenceStart").text("It's");
		$(".weather img").attr("src", data.current.condition.icon);
		currentTempF = data.current.temp_f;
		currentTempC = data.current.temp_c;
		currentUnit = "F";
		$(".temp").text(currentTempF + "℉");
		$(".location").text("in " + data.location.name);
		$(".weather div").text("(" + data.current.condition.text + ")");
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