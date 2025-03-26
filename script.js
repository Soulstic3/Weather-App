const apiKey = "be28c229f30a4c1cf4e4ece9696a6b84";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const card = document.querySelector(".card");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();
    const unixTime = data.dt;

    const timezoneOffset = data.timezone;

    const dateObj = new Date((unixTime + timezoneOffset) * 1000);
    const localhora = dateObj.toUTCString();
    const hourUTC = parseInt(localhora.split(" ")[4].split(":")[0], 10);
    const weather = data.weather[0].main;

    if (hourUTC >= 19) {
      document.querySelector(".weather-icon").src =
        "frontend/images/" + weather.toLowerCase() + "-night.png";
      card.style.background = "linear-gradient(135deg, #340260, #670170)";
    } else {
      document.querySelector(".weather-icon").src =
        "frontend/images/" + weather.toLowerCase() + ".png";
      card.style.background = "linear-gradient(135deg, #00feba, #5b5a8a)";
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + " ºc";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
