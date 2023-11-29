function getWeatherData(response) {
  let temperatureElement = document.querySelector("#weather-temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElememt = document.querySelector("#humidity");
  let windspeedElememt = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="app-icon"/>`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElememt.innerHTML = `${response.data.temperature.humidity}km/h`;
  windspeedElememt.innerHTML = `${response.data.wind.speed}%`;
  timeElement.innerHTML = formatDate(date);
  getForecast(response.data.city);

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=ta3c8a704e0f7163ad585o4ce48cb179&units=metric`;
  axios.get(apiUrl).then(getWeatherData);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wedn", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ta3c8a704e0f7163ad585o4ce48cb179";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=ta3c8a704e0f7163ad585o4ce48cb179&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Tues", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="row">
      <div class = "col-2">
       <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <img src="${day.condition.icon_url}" alt=""
              width="24"/>
              <div class="weather-forecast-temperature"> <span class="weather-forecast-temperature-max"> ${Math.round(
                day.temperature.maximum
              )}°C</span><span class="weather-forecast-temperature-min">${Math.round(
          day.temperature.minimum
        )}°C</span></div>
             </div></div>
             `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmit);
