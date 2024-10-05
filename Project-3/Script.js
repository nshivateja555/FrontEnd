const apiKey = '0442b2f2dde90ec335f1f249de3870bf';
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const cc=''

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  weatherInfo.firstElementChild.textContent = ``;
  document.getElementById('weather-icon').src = ``;
  document.getElementById('weather-description').textContent =``;
  document.getElementById('temperature').textContent = ``;
  document.getElementById('feltTemperature').textContent = ``;
  document.getElementById('humidity').textContent = ``;
  weatherInfo.classList.remove("active");
  errorMessage.classList.remove("active");
  document.getElementById('weather-icon').classList.remove("active");
  const cityName = cityInput.value.trim();

  if (cityName) {
    fetchWeatherData(cityName);
    cityInput.value = '';
    errorMessage.textContent = '';
  } else {
    errorMessage.classList.add("active");
    errorMessage.textContent = "You didn't type anything. Please enter a city name.";
  }
});

async function fetchWeatherData(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();

    const { name, main, weather } = data;
    const celsius = main.temp - 273.15;
    const temperature = Math.round(celsius);
    const cel = main.feels_like - 273.15;
    const feltTemp = Math.round(cel);
    const humidity = main.humidity;
    const weatherMain = weather[0].main;
    const weatherDescription = weather[0].description;
    const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherInfo.classList.add("active");
    document.getElementById('weather-icon').classList.add("active");
    weatherInfo.firstElementChild.textContent = name;
    document.getElementById('weather-icon').src = weatherIcon;
    document.getElementById('weather-description').textContent =`Weather Description: ${weatherMain},${weatherDescription}`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('feltTemperature').textContent = `Temperature feels like: ${feltTemp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}°C`;
  } catch (error) {
    console.error(error);
    errorMessage.classList.add("active");
    errorMessage.textContent = 'Cannot find the city. Please enter the correct city.';
  }
}