function getForecast() {
    let resultsObj = {};
    
//   let lat = resultsObj.lat;
//   let lon = resultsObj.lon;
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=32.19831758&lon=-84.12988898&units=imperial&appid=585ba3d2e5d78c9afea8cfd73fcf8a69"
    // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=585ba3d2e5d78c9afea8cfd73fcf8a69`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      resultsObj.forecastResults = [];
for (let i = 0; i < 5; i++) {
    let forecastObj = {};
    forecastObj.date = data.list[i].dt_txt;
    forecastObj.minTemp = data.list[i].main.temp_min;
    forecastObj.maxTemp = data.list[i].main.temp_max;
    forecastObj.img = data.list[i].weather[0].icon;
    forecastObj.desc = data.list[i].weather[0].description;
  resultsObj.forecastResults.push(forecastObj);
}
      console.log(resultsObj.forecastResults);
    });
}
getForecast();