const LAT = -33.9249;
const LON = 18.4241;
const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=4`;

async function getWeather() {
    try {
        const response = await fetch(WEATHER_URL);
        if (!response.ok) {
            throw new Error(`Unable to retrieve weather data (${response.status})`);
        }
        const data = await response.json();
        displayCurrentWeather(data.current);
        displayForecast(processForecast(data.daily));
    } catch (error) {
        console.error("Weather error:", error);
        const currentWeather = document.querySelector("#current-weather");
        const forecast = document.querySelector("#forecast");
        if (currentWeather) {
            currentWeather.textContent = "Weather is currently unavailable.";
        }
        if (forecast) {
            forecast.textContent = "Forecast is currently unavailable.";
        }
    }
}

function displayCurrentWeather(data) {
    const weatherDiv = document.querySelector("#current-weather");
    if (!weatherDiv) {
        console.error("Current weather container not found");
        return;
    }

    weatherDiv.innerHTML = `
        <h3>${Math.round(data.temperature_2m)}°C</h3>
        <p>${describeWeather(data.weather_code)}</p>
        <p>Humidity: ${data.relative_humidity_2m}%</p>
        <p>Wind: ${Math.round(data.wind_speed_10m)} km/h</p>
    `;
}

function describeWeather(code) {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code === 45 || code === 48) return "Fog";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain showers";
    if (code === 85 || code === 86) return "Snow showers";
    if (code >= 95) return "Thunderstorm";
    return "Unknown conditions";
}

function processForecast(data) {
    return data.time.slice(1, 4).map((date, index) => {
        const dayIndex = index + 1;
        return {
            date: new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric"
            }),
            high: Math.round(data.temperature_2m_max[dayIndex]),
            low: Math.round(data.temperature_2m_min[dayIndex]),
            description: describeWeather(data.weather_code[dayIndex])
        };
    });
}

function displayForecast(forecastDays) {
    const forecastDiv = document.querySelector("#forecast");
    if (!forecastDiv) {
        console.error("Forecast container not found");
        return;
    }
    forecastDiv.innerHTML = "";
    forecastDays.forEach(day => {
        forecastDiv.innerHTML += `
            <div class="forecast-card">
                <h3>${day.date}</h3>
                <p>${day.description}</p>
                <p>High: ${day.high}°C</p>
                <p>Low: ${day.low}°C</p>
            </div>
        `;
    });
}

getWeather();