var currentTemp;
var currentUnit;

function toggleUnit() {
  if (currentUnit == "F") {
    currentUnit = "C";
    $(".temp").text(KtoC(currentTemp) + "℃");
  } else {
    currentUnit = "F";
    $(".temp").text(KtoF(currentTemp) + "℉");
  }
}

function KtoF(temp) {
  // Converts K to F rounded to nearest tenth
  return Math.round((temp * 9/5 - 459.67) * 10) / 10;
}

function KtoC(temp) {
  // Conerts K to C rounded to nearest tenth.
  return Math.round((temp - 273.15) * 10) / 10;
}

function displayWeather(lat, lon) {
  var appID = "57cdf7fbd3fa1760fe92d89712829e9a"
  
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + appID, function(data) {
    $(".sentenceStart").text("It's");
    $(".weather img").attr("src", "http://openweathermap.org/img/w/"+ data["weather"][0]["icon"] + ".png")
    currentTemp = data["main"]["temp"];
    $(".temp").text(KtoF(currentTemp) + "℉");
    currentUnit = "F";
    $(".location").text("in " + data["name"]);
    $(".weather div").text("(" + data["weather"][0]["description"] + ")");
  });
}

var main = function() {
  
  $(".temp").click(toggleUnit);
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      displayWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    $(".weather").html("Couldn't get weather data")
  }
};

$(document).ready(main);