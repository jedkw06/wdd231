const API_KEY = "e5fe08c0238a567dfdebb8a5bb68df2e";

const LAT = -33.9249;
const LON = 18.4241;

const CURRENT_URL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=e5fe08c0238a567dfdebb8a5bb68df2e';

const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=e5fe08c0238a567dfdebb8a5bb68df2e';

async function getWeather() {
    try {
        const response = await fetch(CURRENT_URL)

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error("weather error:", error);
    }
}

function displayCurrentWeather(data) {
    const weatherDiv = document.querySelector("#current-weather");

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

    console.log(dailyForecast);
}

const forecastDiv = document.querySelector("#forecast");

forecastDiv.innerHTML = "";

forecastDays.forEach(day => {

    forecastDiv.innerHTML += `
        <div class="forecast-card">

            <h3>${day.date}</h3>

            <img src="${day.icon}" alt="${day.description}">

            <p>${day.description}</p>

            <p>High: ${day.high}°C</p>

            <p>Low: ${day.low}°C</p>

        </div>
    `;

});

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

        console.error(error);

    }

}

getWeather();