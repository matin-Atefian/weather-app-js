const apiKey = "0108ac33831114c3c54918242d8b47de";

async function fechdata(endpoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}`;
  const fechApi = await fetch(apiUrl);
  return fechApi.json();
}
async function updateInfo(city) {
  const weather_Data = await fechdata("weather", city);
}
