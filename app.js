const inputCity = document.querySelector(".city"); // input
const btn = document.querySelector(".search-btn"); // search button
const key = "0108ac33831114c3c54918242d8b47de"; //Api key
let namee = document.querySelector(".name");
let nameCountry = document.querySelector(".name-country");
let tempe = document.querySelector(".temp");
let tempe_max = document.querySelector(".tempe-max");
let tempe_min = document.querySelector(".tempe-min");
let coundition = document.querySelector(".coundition");
let Humidity = document.querySelector(".Humidity");
let windspeed = document.querySelector(".wind");
let vis = document.querySelector(".vis");
let infoVa = document.querySelector(".info-va");
let weatherImg = document.querySelector(".cloud");
let week = document.querySelector(".week");
let hours = document.querySelector(".hours");
let date1 = document.querySelector(".date");
// serach button
btn.addEventListener("click", () => {
  if (inputCity.value.trim() != "") {
    // console.log(inputCity.value);
    weatherInfo(inputCity.value);
    inputCity.value = "";
    inputCity.blur();
  }
});
//serach with enter
inputCity.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && inputCity.value.trim() != "") {
    weatherInfo(inputCity.value);
    inputCity.value = "";
    inputCity.blur();
  }
});
async function fechData(endPoint, city) {
  const url = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${key}`;
  const response = await fetch(url);
  return response.json();
}
function weathericon(id) {
  if (id <= 232) return "night.png";
  if (id <= 531) return "weather (1).png";
  if (id <= 622) return "weather (3).png";
  if (id <= 800) return "weather.png";
  else return "cloud.png";
}
function getcurrrentDate() {
  const currrentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return currrentDate.toLocaleDateString("en-GB", options);
}
async function weatherInfo(city) {
  const weatherData = await fechData("weather", city);
  const {
    name: name,
    main: { temp, humidity, temp_max, temp_min, pressure },
    weather: [{ id, main }],
    wind: { speed },
    visibility: visibility,
    sys: { country },
  } = weatherData;
  console.log(weatherData);
  namee.textContent = name;
  tempe.textContent = Math.floor(temp - 273);
  tempe_max.textContent = Math.floor(temp_max - 273) + "°";
  tempe_min.textContent = Math.floor(temp_min - 273) + "°";
  Humidity.textContent = humidity + "%";
  coundition.textContent = main;
  windspeed.textContent = Math.round(speed);
  vis.textContent = visibility / 1000;
  nameCountry.textContent = country;
  infoVa.textContent = pressure;
  weatherImg.src = `assest/cloud/${weathericon(id)}`;
  await updateForecasInfo(city);
}
async function updateForecasInfo(city) {
  const forecasInfo = await fechData("forecast", city);
  const timeTaken = "12:00:00";
  const todayDate = new Date().toISOString().split("T")[0];
  week.innerHTML = "";
  hours.innerHTML = "";
  forecasInfo.list.forEach((forecastweather) => {
    if (
      forecastweather.dt_txt.includes(timeTaken) &&
      !forecastweather.dt_txt.includes(todayDate)
    ) {
      updateForecasItems(forecastweather);
    }
  });
  forecasInfo.list.forEach((forecastweatherhour) => {
    console.log(forecastweatherhour);
    updateForecasHour(forecastweatherhour);
  });
}
function updateForecasItems(weatherData) {
  const {
    dt_txt: date,
    weather: [{ id }],
    main: { temp },
  } = weatherData;
  const dateTaken = new Date(date);
  const dateOption = {
    day: "2-digit",
    month: "short",
  };
  const dateResult = dateTaken.toLocaleDateString("en-US", dateOption);

  const forecastItem = `
                       <div class="day">
                         <h4 class="date">${dateResult}</h4>
                         <img
                           class="img-forecast"
                           src="assest/cloud/${weathericon(id)}"
                           width="75px"
                         />
                         <div><span class="temp-forecast">${Math.round(
                           temp - 273
                         )}</span><span>°c</span></div>
                       </div>`;
  week.insertAdjacentHTML("beforeend", forecastItem);
}
function updateForecasHour(forecasInfo) {
  const {
    dt_txt: date,
    weather: [{ id }],
    main: { temp },
  } = forecasInfo;
  const dateTaken = new Date(date);
  const dateOption = {
    hour: "2-digit",
  };
  const dateResult = dateTaken.toLocaleDateString("en-US", dateOption);

  const forecastItemhour = `
                       <div class="hour">
            <span>${dateResult}</span>
            <img   src="assest/cloud/${weathericon(
              id
            )}"(3).png" alt="cloud" width="85px" />
            <span>${Math.round(temp - 273)}°c</span>`;
  hours.insertAdjacentHTML("beforeend", forecastItemhour);
}
