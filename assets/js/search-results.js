//NPI GA Data Link: https://developer.nps.gov/api/v1/parks?stateCode=GA&api_key=iiyXV98dq4oalbEXmTIS9OH62H5qcBfiKyVQqZHK

//NPI API Variables
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
var dataDisplay = document.querySelector("#data-display");

//NPI API Function
var parkCode; //to keep line 35 from throwing an error
function parkApi() {
  var queryURL =
    "https://developer.nps.gov/api/v1/parks?parkCode=" +
    parkCode +
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
    });
}

parkApi();

function getForecast() {
  var resultsObj = {};

  //   var lat = resultsObj.lat;
  //   var lon = resultsObj.lon;
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=32.19831758&lon=-84.12988898&units=imperial&appid=585ba3d2e5d78c9afea8cfd73fcf8a69"
    // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=585ba3d2e5d78c9afea8cfd73fcf8a69`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
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

//arcgis(potential maps API) key AAPK69742b5d3e5d4d969f28ce8b97ee91f9c-GZhvscrk59aNtlQqY1LEIYm6FP_SH-3eVXanS5UfS9755ehIGeGrMn0_NmE_pP

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