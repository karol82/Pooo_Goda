function getWeather() {
    var cityInput = document.getElementById("cityInput").value;
    var apiKey = "c1cce6ad1fe74b618542deaffa3a5637";
    var currentWeatherUrl = "https://api.weatherbit.io/v2.0/current?key=" + apiKey + "&city=" + cityInput;
    var forecastWeatherUrl = "https://api.weatherbit.io/v2.0/forecast/daily?key=" + apiKey + "&city=" + cityInput + "&days=6";


    // Wysłanie żądania do API dla aktualnej pogody
    fetch(currentWeatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Wyświetlanie aktualnej pogody
            displayCurrentWeather(data.data[0]);
        })
        .catch(function(error) {
            console.log(error);
        });

    // Wysłanie żądania do API dla prognozy pogody
    fetch(forecastWeatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Wyświetlanie prognozy pogody
            displayForecastWeather(data.data);
            przywolaj_boga();
        })
        .catch(function(error) {
            console.log(error);
        });
}

function displayCurrentWeather(currentWeather) {
    var currentWeatherDiv = document.getElementById("currentWeather");
    var temperature = currentWeather.temp;
    var description = currentWeather.weather.description;

    currentWeatherDiv.innerHTML = "<h2>Aktualna pogoda</h2>" +
        "<h4><p>Temperatura: " + temperature + "°C</p>" +
        "<p>Warunki: " + description + "</p></<h4>";
}

function displayForecastWeather(forecastWeather) {
    var forecastWeatherDiv = document.getElementById("forecastWeather");
    forecastWeatherDiv.innerHTML = "<h2>Prognoza pogody na kolejne dni</h2>";

    var forecastTable = document.createElement("table");
    forecastTable.classList.add("weather-table");

    var row;
    var rowIndex = 0;

    for (var i = 0; i < forecastWeather.length; i++) {
        if (i % 3 === 0) {
            row = forecastTable.insertRow(rowIndex);
            rowIndex++;
        }

        var forecast = forecastWeather[i];
        var date = forecast.valid_date;
        var maxTemp = forecast.max_temp;
        var minTemp = forecast.min_temp;
        var description = forecast.weather.description;

        var cell = row.insertCell();
        cell.innerHTML = "<h3>" + date + "</h3>" +
            "<p>Maks. : " + maxTemp + "°C</p>" +
            "<p>Min. : " + minTemp + "°C</p>" +
            "<p>" + description + "</p>";
    }
    forecastWeatherDiv.appendChild(forecastTable);

}
function przywolaj_boga() {
    var bogaDiv = document.getElementById("bog");
    bogaDiv.innerHTML = '<p2>Dnia udanego, życzę Ci</p2> <img src="css/god.webp" alt="Buk">';
}


