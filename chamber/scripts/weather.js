const API_KEY = "YOUR_API_KEY";

const LAT = -33.9249;
const LON = 18.4241;

const CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${LAT}&lon=${LON}&appid=${API_KEY}`;

const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${LAT}&lon=${LON}&appid=${API_KEY}`;


async function getWeather() {

    try {

        const [currentResponse, forecastResponse] =
            await Promise.all([
                fetch(CURRENT_URL),
                fetch(FORECAST_URL)
            ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);

        const forecastDays = processForecast(forecastData);

        displayForecast(forecastDays);

    } catch (error) {

        console.error("Weather error:", error);

    }
}


function displayCurrentWeather(data) {

    const weatherDiv = document.querySelector("#current-weather");

    if (!weatherDiv) {
        console.error("Current weather container not found");
        return;
    }

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const icon = data.weather[0].icon;

    weatherDiv.innerHTML = `
        <h3>${temperature}°C</h3>

        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${description}"
        >

        <p>${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${wind} m/s</p>
    `;
}

function processForecast(data) {

    const timezone = data.city.timezone;
    const dailyForecast = {};

    data.list.forEach(item => {

        const localDate = new Date(
            (item.dt + timezone) * 1000
        );

        const date = localDate.toISOString().slice(0, 10);

        if (!dailyForecast[date]) {
            dailyForecast[date] = [];
        }

        dailyForecast[date].push(item);

    });

    const today = new Date(
        (data.list[0].dt + timezone) * 1000
    ).toISOString().slice(0, 10);

    const forecastDays = Object.keys(dailyForecast)
        .filter(date => date > today)
        .sort()
        .slice(0, 3)
        .map(date => {

            const entries = dailyForecast[date];

            const temperatures = entries.map(item => item.main.temp);

            const midday = entries.find(item =>
                new Date((item.dt + timezone) * 1000)
                    .toISOString()
                    .includes("T12:")
            ) || entries[Math.floor(entries.length / 2)];

            return {
                date: date,
                high: Math.round(Math.max(...temperatures)),
                low: Math.round(Math.min(...temperatures)),
                description: midday.weather[0].description,
                icon: midday.weather[0].icon
            };

        });

    return forecastDays;
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

                <img
                    src="https://openweathermap.org/img/wn/${day.icon}@2x.png"
                    alt="${day.description}"
                >

                <p>${day.description}</p>

                <p>High: ${day.high}°C</p>

                <p>Low: ${day.low}°C</p>

            </div>
        `;

    });

}

getWeather();