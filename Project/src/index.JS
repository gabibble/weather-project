function displayLocalTime() {
  let today = new Date();
  let date = today.getDate();
  let year = today.getFullYear();
  let hour = today.getHours();
  let min = today.getMinutes();
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
  currentTime.innerHTML = `${day}, ${month} ${date}, ${year}`;
}
displayLocalTime();

function displayForecastToday(response) {
  console.log(response.data);
  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = response.data.name;
  let mainDescription = document.querySelector("#main-desc");
  mainDescription.innerHTML = response.data.weather[0].description;
  let mainTemp = Math.round(response.data.main.temp);
  let mainTempDisplay = document.querySelector("#main-temp");
  mainTempDisplay.innerHTML = mainTemp;
  let mainHigh = Math.round(response.data.main.temp_max);
  let mainLow = Math.round(response.data.main.temp_min);
  let highLow = document.querySelector("#high-low");
  highLow.innerHTML = `H <strong>${mainHigh}</strong>°  L <strong>${mainLow}</strong>°`;
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let details = document.querySelector("#details");
  details.innerHTML = `Humidity: ${humidity}% <br> Wind: ${wind} mph`;
  let mainIcon = document.querySelector(".today");
  if (mainTemp >= 92) {
    mainIcon.classList.add("vhot");
  } else {
    if (mainTemp >= 80 && mainTemp < 92) {
      mainIcon.classList.add("hot");
    } else {
      if (mainTemp >= 68 && mainTemp < 80) {
        mainIcon.classList.add("warm");
      } else {
        if (mainTemp >= 56 && mainTemp < 68) {
          mainIcon.classList.add("mild");
        } else {
          if (mainTemp >= 44 && mainTemp < 56) {
            mainIcon.classList.add("cool");
          } else {
            if (mainTemp > 32 && mainTemp < 44) {
              mainIcon.classList.add("cold");
            } else {
              mainIcon.classList.add("freeze");
            }
          }
        }
      }
    }
  }
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "4b4875a4aa1ad99ee265ed1dc59a8d80";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`;
  axios.get(weatherUrl).then(displayForecastToday);
}

function retrievePosition(position) {
  console.log(position);
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
  alert("coming soon!");
  //let mainTemp = document.querySelector("#main-temp");
  //mainTemp.innerHTML = "18 °C";
}

function showFahr() {
  //let mainTemp = document.querySelector("#main-temp");
  //mainTemp.innerHTML = "64 °F";
}

let celc = document.querySelector("#cTemp");
celc.addEventListener("click", showCelc);
let fahr = document.querySelector("#fTemp");
fahr.addEventListener("click", showFahr);
