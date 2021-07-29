getCurrentPosition();

function displayLocalTime() {
  let today = new Date();
  let date = today.getDate();
  let year = today.getFullYear();
  let hour = today.getHours();
  let min = today.getMinutes();
  let ampm = "am";
  if (min < 10) {
    min = `0${min}`;
  }
  if (hour > 12) {
    hour = hour - 12;
    ampm = "pm";
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  let day = days[today.getDay()];
  let month = months[today.getMonth()];

  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = `${day}, ${month} ${date}, ${hour}:${min} ${ampm}`;
}
displayLocalTime();

function getForecast(coordinates) {
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=4b4875a4aa1ad99ee265ed1dc59a8d80&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecastToday(response) {
  console.log(response.data);
  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = response.data.name;
  let mainDescription = document.querySelector("#main-desc");
  mainDescription.innerHTML = response.data.weather[0].description;
  let mainTemp = Math.round(response.data.main.temp);
  let mainTempDisplay = document.querySelector("#main-temp");
  mainTempDisplay.innerHTML = mainTemp;

  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let details = document.querySelector("#details");
  details.innerHTML = `Humidity: ${humidity}% <br> Wind: ${wind} mph`;
  //let time = response.data.dt;
  //displayLocalTime(time * 1000);
  let iconElement = document.querySelector("#weather-icon");
  let iconCode = response.data.weather[0].icon;
  iconElement.innerHTML = `<img class="main" src="http://openweathermap.org/img/wn/${iconCode}@2x.png">`;
  let mainIcon = document.querySelector(".today");
  let units = document.querySelector(".unit");
  units.innerHTML = " °F";

  fahrGlobal = response.data.main.temp;

  if (mainTemp >= 92) {
    mainIcon.classList = "icon today";
    mainIcon.classList.add("vhot");
  } else {
    if (mainTemp >= 80 && mainTemp < 92) {
      mainIcon.classList = "icon today";
      mainIcon.classList.add("hot");
    } else {
      if (mainTemp >= 68 && mainTemp < 80) {
        mainIcon.classList = "icon today";
        mainIcon.classList.add("warm");
      } else {
        if (mainTemp >= 56 && mainTemp < 68) {
          mainIcon.classList = "icon today";
          mainIcon.classList.add("mild");
        } else {
          if (mainTemp >= 44 && mainTemp < 56) {
            mainIcon.classList = "icon today";
            mainIcon.classList.add("cool");
          } else {
            if (mainTemp > 32 && mainTemp < 44) {
              mainIcon.classList = "icon today";
              mainIcon.classList.add("cold");
            } else {
              mainIcon.classList = "icon today";
              mainIcon.classList.add("freeze");
            }
          }
        }
      }
    }
  }

  getForecast(response.data.coord);
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "4b4875a4aa1ad99ee265ed1dc59a8d80";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`;
  axios.get(weatherUrl).then(displayForecastToday);
}

function retrievePosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "4b4875a4aa1ad99ee265ed1dc59a8d80";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(weatherUrl).then(displayForecastToday);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let localSearch = document.querySelector("#currentLocation");
localSearch.addEventListener("click", getCurrentPosition);

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", citySearch);

function showCelc() {
  let mainTemp = document.querySelector("#main-temp");
  let celcTemp = ((fahrGlobal - 32) * 5) / 9;
  mainTemp.innerHTML = Math.round(celcTemp);
  let units = document.querySelector(".unit");
  units.innerHTML = " °C";
  //let mainHigh = document.querySelector("#main-high");
  //mainHigh.innerHTML = `${Math.round(((fahrGlobal - 32) * 5) / 9)}°`;
}

function showFahr() {
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = Math.round(fahrGlobal);
  let units = document.querySelector(".unit");
  units.innerHTML = " °F";
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
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
  return day;
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let mainHigh = Math.round(response.data.daily[0].temp.max);
  let mainLow = Math.round(response.data.daily[0].temp.min);
  let highLow = document.querySelector("#high-low");
  highLow.innerHTML = `<strong id="main-high">${mainHigh}°</strong>  <strong class="min" id = "main-low">${mainLow}°</strong>`;

  let forecastElement = document.querySelector("#six-day-forecast");
  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col">
            <p class="day">${formatDay(forecastDay.dt)}</p>
            <div class="small-img-frame">
              <img
                class="forecast"
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
              />
            </div>
            <p class="temp">
              <span class="max" id ="daily-high">${Math.round(
                forecastDay.temp.max
              )}°</span> <span class="min" id ="daily-low">${Math.round(
          forecastDay.temp.min
        )}°</span>
            </p>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let fahrGlobal = null;

let celc = document.querySelector("#cTemp");
celc.addEventListener("click", showCelc);
let fahr = document.querySelector("#fTemp");
fahr.addEventListener("click", showFahr);
