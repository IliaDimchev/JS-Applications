function attachEvents() {
    document.getElementById("submit").addEventListener("click", getWeather)
}

async function getWeather() {
    const url = "http://localhost:3030/jsonstore/forecaster/locations"
    const townName = document.getElementById("location").value;
    const forecast = document.getElementById('forecast');
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');
    forecast.style.display = "block";

    const response = await fetch(url)
    const data = await response.json()
    const info = data.find(x => x.name === townName )
    
    if (info === undefined){
        current.textContent = "Error"
        upcoming.textContent= ""
    } else {
        createForecaster(info.code)
    }
}

async function createForecaster(code) {
    symbols = {
        "Sunny": "&#x2600;",
        "Partly sunny": "&#x26C5;",
        "Overcast": "&#x2601;",
        "Rain": "&#x2614;",
        "Degrees": "&#176;"
    }

    const todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${code}`
    const todayResponse = await fetch(todayUrl)
    const todayData = await todayResponse.json()
    // const todayDiv = document.createElement('div');
    // const todayConditionSpan = document.createElement('span');
    // todayConditionSpan.classList.add("condition", "symbol");	
    // todayConditionSpan.innerHTML='&#x2600;'
    // current.replaceChildren(todayConditionSpan);

    current.innerHTML = `
    <div class="label">Current conditions</div>
    <div class="forecasts">
    <span class="condition symbol">${symbols[todayData.forecast['condition']]}</span>
    <span class="condition">
    <span class="forecast-data">${todayData.name}</span>
    <span class="forecast-data">${todayData.forecast['low']}${symbols['Degrees']}/${todayData.forecast['high']}${symbols['Degrees']}</span>
    <span class="forecast-data">${todayData.forecast['condition']}</span>
    </span>
    </div>
    `


    const upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
    const upcomingResponse = await fetch(upcomingUrl)
    const upcomingData = await upcomingResponse.json()

    upcoming.innerHTML = `
    <div class="label">Three-day forecast</div>
    <div class="forecast-info">
    <span class="upcoming">
    <span class="symbol">${symbols[upcomingData.forecast[0]['condition']]}</span>
    <span class="forecast-data">${upcomingData.forecast[0]['low']}${symbols['Degrees']}/${upcomingData.forecast[0]['high']}${symbols['Degrees']}</span>
    <span class="forecast-data">${upcomingData.forecast[0]['condition']}</span>
    </span>

    <span class="upcoming">
    <span class="symbol">${symbols[upcomingData.forecast[1]['condition']]}</span>
    <span class="forecast-data">${upcomingData.forecast[1]['low']}${symbols['Degrees']}/${upcomingData.forecast[1]['high']}${symbols['Degrees']}</span>
    <span class="forecast-data">${upcomingData.forecast[1]['condition']}</span>
    </span>

    <span class="upcoming">
    <span class="symbol">${symbols[upcomingData.forecast[2]['condition']]}</span>
    <span class="forecast-data">${upcomingData.forecast[2]['low']}${symbols['Degrees']}/${upcomingData.forecast[2]['high']}${symbols['Degrees']}</span>
    <span class="forecast-data">${upcomingData.forecast[2]['condition']}</span>
    </span>
    </div>
    `

}

attachEvents();