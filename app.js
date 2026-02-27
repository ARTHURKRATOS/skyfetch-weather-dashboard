// ===============================
// SkyFetch Weather Dashboard - Part 2
// ===============================

// Your OpenWeatherMap API Key
const API_KEY = 'bd47f7aebb21e7439f633cbc0159e482';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Select DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDisplay = document.getElementById("weather-display");
const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");

// ===============================
// Fetch Weather using async/await
// ===============================
async function getWeather(city) {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    // Show loading
    loading.style.display = "block";
    errorMessage.textContent = "";
    weatherDisplay.innerHTML = "";

    try {
        const response = await axios.get(url);
        displayWeather(response.data);
    } catch (error) {
        errorMessage.textContent = "City not found. Please enter a valid city.";
    } finally {
        loading.style.display = "none";
    }
}

// ===============================
// Display Weather Data
// ===============================
function displayWeather(data) {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;

    weatherDisplay.innerHTML = weatherHTML;
}

// ===============================
// Search Button Event
// ===============================
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});

// ===============================
// Optional: Enter Key Support
// ===============================
cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// ===============================
// Default City on Load
// ===============================
getWeather("London");