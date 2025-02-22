const inputCity = document.querySelector(".city"); // input
const btn = document.querySelector(".search-btn"); // search button
const key = "0108ac33831114c3c54918242d8b47de"; //Api key
let name = document.querySelector(".name");
let tempe = document.querySelector(".temp");
let coundition = document.querySelector(".coundition");
let Humidity = document.querySelector(".Humidity");
let windspeed = document.querySelector(".wind");
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
    // console.log(inputCity.value);
    weatherInfo(inputCity.value);
    inputCity.value = "";
    inputCity.blur();
  }
  //  console.log(event);
});
async function fechData(endPoint, city) {
  const url = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${key}`;
  const response = await fetch(url);
  return response.json();
}

async function weatherInfo(city) {
  const weatherData = await fechData("weather", city);

  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;
  name.textContent = country;
  tempe.textContent = Math.floor(temp - 273);
  Humidity.textContent = humidity + "%";
  coundition.textContent = main;
  windspeed.textContent = Math.round(speed);

  console.log(weatherData);
}
