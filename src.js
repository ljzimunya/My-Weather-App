function getWeatherData(response) {
  let temperatureElement = document.querySelector("#weather-temp");
  let temperature = response.data.temperature;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElememt = document.querySelector("#humidity");
  let windspeedElememt = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time*1000)

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}km/h`;
  windspeedElement.innerHTML = `${response.data.wind.speed}%`;
  timeElement.innerHTML = `${date.getDay() ${date.getHours():${date.getminutes()};
  }

  function formatDate(date) {
    let minutes= date.getMinutes();
let hours= date.getHours();
let Days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
let day = days[date.getDay()];
 
if (minutes <10) {
    minutes =`0${minutes}`;
}
return `${day} ${hours}:${minutes}`;
  }
function searchCity(city) {
  let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
  let apiURl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeatherData);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmit);
