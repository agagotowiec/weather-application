//DATE AND TIME UPDATE//
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

//LOCATION FINDER//

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

//CITY SEARCH//
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

//WEATHER DESCRIPTION, TEMP AND ICON UPDATE BASED ON SEARCH INPUT & LOCATION//

function showTemperature(response) {
	let temperatureEl = document.querySelector("#temperature-value");
	let roundedTemperature = Math.round(response.data.main.temp);
	let weatherDescription = document.querySelector("#weather-description");
	let feelsLikeRounded = Math.round(response.data.main.feels_like);
	let windToday = document.querySelector("#wind-speed");
	let roundedWind = Math.round(response.data.wind.speed);
	let humidityToday = document.querySelector("#humidity");
	let iconElement = document.querySelector("#weather-icon");
	celsiusTemperature = response.data.main.temp;
	let temperaturetoday = document.querySelector("#temperature-today");
	let minroundedTemperatureToday = Math.round(response.data.main.temp_min);
	let maxroundedTemperatureToday = Math.round(response.data.main.temp_max);

	temperatureEl.innerHTML = `${roundedTemperature}°C`;
	temperaturetoday.innerHTML = `| TODAY: min <i class="fas fa-arrow-down"></i> ${minroundedTemperatureToday}°C | max <i class="fas fa-arrow-up"></i> ${maxroundedTemperatureToday}°C | `;
	weatherDescription.innerHTML = response.data.weather[0].description;
	windToday.innerHTML = `<i class="fas fa-wind"></i> <strong> ${roundedWind} km/h</strong>`;
	humidityToday.innerHTML = `<i class="fas fa-tint"></i> <strong> ${response.data.main.humidity} % </strong>`;
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
}

//5 DAYS WEATHER FORECAST//
function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;

	let forecastElement = document.querySelector("#next-5-days");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
         width="31" height="31"
        />
        <div class="weather-forecast-temperature"> ${Math.round(forecastDay.temp.max)}°C
        </div>
      </div>`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}
