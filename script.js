function pobierzPogode() {
    var miasto = document.getElementById("miasto").value;
    var apiKey = "c1cce6ad1fe74b618542deaffa3a5637";
    var obecnaPogodaUrl = "https://api.weatherbit.io/v2.0/current?key=" + apiKey + "&city=" + miasto;
    var prognozaUrl = "https://api.weatherbit.io/v2.0/forecast/daily?key=" + apiKey + "&city=" + miasto + "&days=6";


    fetch(obecnaPogodaUrl)  // Wysłanie żądania do API dla obecnej pogody
        .then(function(response) {
            return response.json();
        })
        .then(function(data) { // Wyświetlanie aktualnej pogody
            wyswietlObecnaPogoda(data.data[0]);
        })
        .catch(function(error) {
            console.log(error);
        });

    fetch(prognozaUrl) // Wysłanie żądania do API dla prognozy pogody
        .then(function(response) {
            return response.json();
        })
        .then(function(data) { // Wyświetlanie prognozy pogody
            wyswietlPrognoza(data.data);
            przywolajBoga();  // dodaj obrazek
        })
        .catch(function(error) {
            console.log(error);
        });
}

function wyswietlObecnaPogoda(obecnaPogoda) {
    var obecnaPogodaDiv = document.getElementById("obecnaPogoda");
    var temp = obecnaPogoda.temp;
    var opis = obecnaPogoda.weather.description;

    obecnaPogodaDiv.innerHTML = "<h2>Aktualna pogoda</h2>" +
        "<h4><p>Temperatura: " + temp + "°C</p>" +
        "<p>Warunki: " + opis + "</p></<h4>";
}

function wyswietlPrognoza(prognoza) {
    var prognozaDiv = document.getElementById("prognoza");
    prognozaDiv.innerHTML = "<h2>Prognoza pogody na kolejne dni</h2>";

    var prognozaTabela = document.createElement("table");
    prognozaTabela.classList.add("weather-table");

    var row;
    var rowIndex = 0;

    for (var i = 0; i < prognoza.length; i++) {
        if (i % 3 === 0) {
            row = prognozaTabela.insertRow(rowIndex);
            rowIndex++;
        }

        var forecast = prognoza[i];
        var data = forecast.valid_date;
        var maxTemp = forecast.max_temp;
        var minTemp = forecast.min_temp;
        var opis = forecast.weather.description;

        var cell = row.insertCell();
        cell.innerHTML = "<h3>" + data + "</h3>" +
            "<p>Maks. : " + maxTemp + "°C</p>" +
            "<p>Min. : " + minTemp + "°C</p>" +
            "<p>" + opis + "</p>";
    }
    prognozaDiv.appendChild(prognozaTabela);

}
function przywolajBoga() {
    var bogDiv = document.getElementById("bog");
    bogDiv.innerHTML = '<p2>Dnia udanego, życzę Ci</p2> <img src="css/god.webp" alt="Buk">';
}


