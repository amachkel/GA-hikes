var backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', backFunc);
function backFunc(){ // Moves user back to index.html when clicked.
  console.log('Back has been clicked.');
  window.location.replace("index.html");
}

//NPS GA Data Link: https://developer.nps.gov/api/v1/parks?stateCode=GA&api_key=iiyXV98dq4oalbEXmTIS9OH62H5qcBfiKyVQqZHK

//Variables to append data to page
var npsDataDisplay = document.querySelector("#data-display");
var npsNameDisplay = document.querySelector("#name-display");
var npsUrlDisplay = document.querySelector("#url-display");
var npsDataDisplayImage = document.querySelector("#data-display-image");
var npsDataDisplaySubtext = document.querySelector("#data-display-subtext");
var nameLocation = document.createElement("h2");
var descLocation = document.createElement("p");
var urlLocation = document.createElement("p");
var hoursLocation = document.createElement("p");
var feeLocation = document.createElement("p");
var directLocation = document.createElement("p");
var imageLocation = document.createElement("figure");
var captionLocation = document.createElement("figcaption");

//NPS API Variables
var data = [
  { parkCode: "ande", fullName: "Andersonville National Historic Site", hikeData: "Andersonville is a historic site and does not have any dedicated hiking. It does have a few scenic walking paths." },
  { parkCode: "appa", fullName: "Appalachian National Scenic Trail", hikeData: " has over 100 miles of hiking trails which continue all the way up to Maine." },
  { parkCode: "chat", fullName: "Chattahoochee River National Recreation Area", hikeData: " is a collection of connected parks. As a whole, the park as just over 50 miles of walking paths and easy trails." },
  { parkCode: "chch", fullName: "Chickamauga & Chattanooga National Military Park", hikeData: " has just over 45 miles of hiking trails which take you through the battlefields." },
  { parkCode: "cuis", fullName: "Cumberland Island National Seashore", hikeData: " has several flat walking paths across the island. In total is has about 27 miles of hiking." },
  { parkCode: "fofr", fullName: "Fort Frederica National Monument", hikeData: " is a historic site and doesn't have any dedicated hiking. It does have a few scenic walking paths." },
  { parkCode: "fopu", fullName: "Fort Pulaski National Monument", hikeData: " is a historic site and doesn't have any dedicated hiking. It does have a few scenic walking paths." },
  { parkCode: "jica", fullName: "Jimmy Carter National Historical Park", hikeData: " is a historic site and doesn't have any dedicated hiking. It does have a few scenic walking paths." },
  { parkCode: "kimo", fullName: "Kennesaw Mountain National Battlefield Park", hikeData: " has just over 40 miles of hiking trails that take you up and around the mountain." },
  { parkCode: "malu", fullName: "Martin Luther King, Jr. National Historical Park", hikeData: " is a historic park and doesn't have any dedicated hiking." },
  { parkCode: "ocmu", fullName: "Ocmulgee Mounds National Historical Park", hikeData: " is a historic site and doesn't have any dedicated hiking. It does have a few scenic walking paths." },
  { parkCode: "trte", fullName: "Trail Of Tears National Historic Trail", hikeData: " is a series of historic sites that span several states moving from Georgia out west. These sites don't have dedicated hiking, but they do have several scenic walking paths." },
];
var APIKey = "iiyXV98dq4oalbEXmTIS9OH62H5qcBfiKyVQqZHK";
var parkCode; //to keep queryURL from throwing an error
var lat;
var lon;

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
        "<a href='" + data.data[0].url + "'class='btn btn-dark'>National Park Service Website</a>";
      hoursLocation.textContent = data.data[0].operatingHours[0].description;
      feeLocation.textContent = data.data[0].entranceFees[0].description;
      directLocation.textContent = "Directions: " + data.data[0].directionsInfo;

      npsNameDisplay.append(nameLocation);
      npsUrlDisplay.append(urlLocation);
      npsDataDisplay.append(descLocation);
      npsDataDisplay.append(hoursLocation);
      npsDataDisplay.append(feeLocation);
      npsDataDisplay.append(directLocation);

      lat = data.data[0].latitude;
      lon = data.data[0].longitude;

      var imageData = data.data[0].images;

      saveImages(data.data[0].images, data.data[0].latitude, data.data[0].longitude);
    });
}

parkApi();

//Function to append a random image to index2.html
function saveImages(imageData) {
  var randomImage = imageData[Math.floor(Math.random() * imageData.length)];
  imageLocation.innerHTML = "<img src=" + randomImage.url + " width='500'>";
  captionLocation.innerHTML = randomImage.caption;
  npsDataDisplayImage.append(imageLocation);
  npsDataDisplaySubtext.append(captionLocation);
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
        forecastObj.date = new Date(data.daily[i].dt * 1000).toLocaleDateString();
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
