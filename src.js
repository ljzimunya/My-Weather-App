function getWeatherData(response) {
  let temperatureElement = document.querySelector("#weather-temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElememt = document.querySelector("#humidity");
  let windspeedElememt = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElememt.innerHTML = `${response.data.temperature.humidity}km/h`;
  windspeedElememt.innerHTML = `${response.data.wind.speed}%`;
  timeElement.innerHTML = `${date.getDay()} ${date.getHours()}:${date.getminutes()}`;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmit);
