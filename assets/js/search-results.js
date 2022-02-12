//NPS GA Data Link: https://developer.nps.gov/api/v1/parks?stateCode=GA&api_key=iiyXV98dq4oalbEXmTIS9OH62H5qcBfiKyVQqZHK

//Variables to append data to page
var npsDataDisplay = document.querySelector("#data-display");
var nameLocation = document.createElement("h2");
var descLocation = document.createElement("p");
var urlLocation = document.createElement("p");
var hoursLocation = document.createElement("p");
var feeLocation = document.createElement("p");
var directLocation = document.createElement("p");
var imageLocation = document.createElement("figure");

//NPS API Variables
var data = [
  { parkCode: "ande", fullName: "Andersonville National Historic Site" },
  { parkCode: "appa", fullName: "Appalachian National Scenic Trail" },
  {
    parkCode: "chat",
    fullName: "Chattahoochee River National Recreation Area",
  },
  {
    parkCode: "chch",
    fullName: "Chickamauga & Chattanooga National Military Park",
  },
  { parkCode: "cuis", fullName: "Cumberland Island National Seashore" },
  { parkCode: "fofr", fullName: "Fort Frederica National Monument" },
  { parkCode: "fopu", fullName: "Fort Pulaski National Monument" },
  { parkCode: "jica", fullName: "Jimmy Carter National Historical Park" },
  { parkCode: "kimo", fullName: "Kennesaw Mountain National Battlefield Park" },
  {
    parkCode: "malu",
    fullName: "Martin Luther King, Jr. National Historical Park",
  },
  { parkCode: "ocmu", fullName: "Ocmulgee Mounds National Historical Park" },
  { parkCode: "trte", fullName: "Trail Of Tears National Historic Trail" },
];
var APIKey = "iiyXV98dq4oalbEXmTIS9OH62H5qcBfiKyVQqZHK";
var parkCode; //to keep queryURL from throwing an error

//NPS API Function
function parkApi() {
  var queryURL =
    "https://developer.nps.gov/api/v1/parks?parkCode=" +
    "ocmu" +
    "&api_key=" +
    APIKey;
  fetch(queryURL)
    .then(function (response) {
      if (200 !== response.status) {
        dataDisplay.append(
          "There was a problem with your query. Status Code: " + response.status
        );
        return;
      }
      return response.json();
    })

    .then(function (data) {
      console.log(data);

      nameLocation.textContent = data.data[0].fullName;
      descLocation.textContent = data.data[0].description;
      urlLocation.innerHTML =
        "<a href='" + data.data[0].url + "'>Link to NPS Park Site</a>";
      hoursLocation.textContent = data.data[0].operatingHours[0].description;
      feeLocation.textContent = data.data[0].entranceFees[0].description;
      directLocation.textContent = "Directions: " + data.data[0].directionsInfo;

      npsDataDisplay.append(nameLocation);
      npsDataDisplay.append(urlLocation);
      npsDataDisplay.append(descLocation);
      npsDataDisplay.append(hoursLocation);
      npsDataDisplay.append(feeLocation);
      npsDataDisplay.append(directLocation);

      var imageData = data.data[0].images;

      saveImages(data.data[0].images);
    });
}

parkApi();

//Function to append a random image to index2.html
function saveImages(imageData) {
  var randomImage = imageData[Math.floor(Math.random() * imageData.length)];
  imageLocation.innerHTML =
    "<img src=" +
    randomImage.url +
    " width='500'><figcaption>" +
    randomImage.caption +
    "</figcaption>";
  npsDataDisplay.append(imageLocation);
}

function getForecast() {
  var resultsObj = {};

  //   var lat = resultsObj.lat;
  //   var lon = resultsObj.lon;
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=32.19831758&lon=-84.12988898&units=imperial&exclude=minutely,hourly&appid=585ba3d2e5d78c9afea8cfd73fcf8a69" //<--test
    // `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=585ba3d2e5d78c9afea8cfd73fcf8a69`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      resultsObj.forecastResults = [];
      for (let i = 0; i < 5; i++) {
        let forecastObj = {};
        forecastObj.date = new Date(data.daily[i].dt *1000).toLocaleDateString();
        forecastObj.minTemp = data.daily[i].temp.min;
        forecastObj.maxTemp = data.daily[i].temp.max;
        forecastObj.img = data.daily[i].weather[0].icon;
        forecastObj.pop = data.daily[i].pop;
        resultsObj.forecastResults.push(forecastObj);
      }
      // console.log(resultsObj.forecastResults);
      renderForecastData(resultsObj.forecastResults);
    });
}
getForecast();

function renderForecastData(forecastResults) {
  let forecastCard = document.getElementById("divCard5"); //Id name for testing.
  console.log(forecastResults);

  for (let i = 0; i < forecastResults.length; i++) {
    console.log(forecastResults[i]);
    let dayDataEl = document.createElement("div");
    dayDataEl.setAttribute("class", "dayData");
    forecastCard.append(dayDataEl);
    let dateEl = document.createElement("p");
    let minEl = document.createElement("p");
    let maxEl = document.createElement("p");
    let imgEl = document.createElement("p");
    let popEl = document.createElement("p");
    dateEl.setAttribute("class", "dateVal");
    minEl.setAttribute("class", "minTempVal");
    maxEl.setAttribute("class", "maxTempVal");
    imgEl.setAttribute("class", "image");
    popEl.setAttribute("class", "description");
    dayDataEl.append(dateEl);
    dayDataEl.append(minEl);
    dayDataEl.append(maxEl);
    dayDataEl.append(imgEl);
    dayDataEl.append(popEl);
    dateEl.textContent = forecastResults[i].date;
    minEl.textContent = forecastResults[i].minTemp;
    maxEl.textContent = forecastResults[i].maxTemp;
    imgEl.innerHTML = `<img src='http://openweathermap.org/img/wn/${forecastResults[i].img}@2x.png' />`;
    popEl.textContent = `Chance of rain: ${forecastResults[i].pop}%`;
  }
  

  return forecastCard;
}

//arcgis API key AAPK69742b5d3e5d4d969f28ce8b97ee91f9c-GZhvscrk59aNtlQqY1LEIYm6FP_SH-3eVXanS5UfS9755ehIGeGrMn0_NmE_pP

require(["esri/config", "esri/Map", "esri/views/MapView"], function (
  esriConfig,
  Map,
  MapView
) {
  esriConfig.apiKey =
    "AAPK69742b5d3e5d4d969f28ce8b97ee91f9c-GZhvscrk59aNtlQqY1LEIYm6FP_SH-3eVXanS5UfS9755ehIGeGrMn0_NmE_pP";

  var map = new Map({
    basemap: "topo-vector", // Basemap layer
  });

  var view = new MapView({
    map: map,
    center: [-84.12988898, 32.19831758], // temp long/lat values for testing
    zoom: 15, // scale: 72223.819286
    container: "viewDiv1", //Div element
    constraints: {
      snapToZoom: false,
    },
  });
});

require(["esri/config", "esri/Map", "esri/views/MapView"], function (
  esriConfig,
  Map,
  MapView
) {
  esriConfig.apiKey =
    "AAPK69742b5d3e5d4d969f28ce8b97ee91f9c-GZhvscrk59aNtlQqY1LEIYm6FP_SH-3eVXanS5UfS9755ehIGeGrMn0_NmE_pP";

  var map = new Map({
    basemap: "hybrid", // Basemap layer
  });

  var view = new MapView({
    map: map,
    center: [-84.12988898, 32.19831758], // temp long/lat values for testing
    zoom: 15, // scale: 72223.819286
    container: "viewDiv2", //Div element
    constraints: {
      snapToZoom: false,
    },
  });
});
function toggleEvent() {
  var toggleBtnEl = document.getElementById("toggleBtn");
  toggleBtnEl.addEventListener("click", toggleMaps);
}

function toggleMaps() {
  // alert('toggle maps is called');
  var topoWrapperEl = document.getElementById("topo-wrapper");
  var hybridWrapperEl = document.getElementById("hybrid-wrapper");

  if (topoWrapperEl.style.display == "block") {
    topoWrapperEl.style.display = "none";
    hybridWrapperEl.style.display = "block";
  } else {
    topoWrapperEl.style.display = "block";
    hybridWrapperEl.style.display = "none";
  }
}
toggleEvent();
