///DATE AND TIME
let now = new Date();
let h3 = document.querySelector("#date-and-time");

let date = now.getDate();
let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = daysOfTheWeek[now.getDay()];

let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
let month = months[now.getMonth()];
let hours = now.getHours();
{
	if (hours < 10) {
		hours = `0${hours}`;
	}
}
let minutes = now.getMinutes();
{
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
}

h3.innerHTML = `${day}, ${date} ${month} | ${hours}:${minutes} `;
////////////////////FIND MY LOCATION

function showMyLocation(response) {
	let h1 = document.querySelector("#location-name");
	h1.innerHTML = response.data.name;
}

function getPosition(position) {
	let lon = position.coords.longitude;
	let lat = position.coords.latitude;
	let apiKey = "d5f292b7187efc221ef4ea02b78f1061";
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

	axios.get(url).then(showMyLocation);
	axios.get(url).then(showTemperature);
}

function getLocation() {
	navigator.geolocation.getCurrentPosition(getPosition);
}
function getForecast(coordinates) {
	let apiKey = "d5f292b7187efc221ef4ea02b78f1061";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(displayForecast);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);

/////SEARCH A CITY
function searchMe(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-form");
	let locationChange = document.querySelector("h1");
	locationChange.innerHTML = searchInput.value;

	let apiKey = "d5f292b7187efc221ef4ea02b78f1061";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
	axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let search = document.querySelector("#search-engine");
search.addEventListener("submit", searchMe);

/////////////////////////WEATHER DESCRIPTION
function showTemperature(response) {
	let temperatureEl = document.querySelector("#temperature-value");
	let roundedTemperature = Math.round(response.data.main.temp);
	let weatherDescription = document.querySelector("#weather-description");
	let todayFeelsLike = document.querySelector("#feels-like");
	let feelsLikeRounded = Math.round(response.data.main.feels_like);
	let windToday = document.querySelector("#wind-speed");
	let roundedWind = Math.round(response.data.wind.speed);
	let humidityToday = document.querySelector("#humidity");
	let iconElement = document.querySelector("#icon");
	celsiusTemperature = response.data.main.temp;

	temperatureEl.innerHTML = `${roundedTemperature}`;
	weatherDescription.innerHTML = response.data.weather[0].description;
	todayFeelsLike.innerHTML = `FEELS LIKE: ${feelsLikeRounded}°C`;
	windToday.innerHTML = `💨 ${roundedWind} km/h`;
	humidityToday.innerHTML = `💧 ${response.data.main.humidity} %`;
}
