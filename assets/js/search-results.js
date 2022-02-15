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
  { parkCode: "kemo", fullName: "Kennesaw Mountain National Battlefield Park", hikeData: " has just over 40 miles of hiking trails that take you up and around the mountain." },
  { parkCode: "malu", fullName: "Martin Luther King, Jr. National Historical Park", hikeData: " is a historic park and doesn't have any dedicated hiking." },
  { parkCode: "ocmu", fullName: "Ocmulgee Mounds National Historical Park", hikeData: " is a historic site and doesn't have any dedicated hiking. It does have a few scenic walking paths." },
  { parkCode: "trte", fullName: "Trail Of Tears National Historic Trail", hikeData: " is a series of historic sites that span several states moving from Georgia out west. These sites don't have dedicated hiking, but they do have several scenic walking paths." },
];
var APIKey = "iiyXV98dq4oalbEXmTIS9OH62H5qcBfiKyVQqZHK";

function getSearchInput() {
  var parkCodeString = localStorage.getItem("parkCode");
  var parkCode = JSON.parse(parkCodeString);

  console.log(parkCode);
  getHikeData(parkCode);
  parkApi(parkCode);
}
getSearchInput();

function getHikeData(parkCode) {
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].parkCode);
    // console.log(parkCode);
    if (parkCode == data[i].parkCode) {
      console.log(data[i].fullName + data[i].hikeData);
      let hikeDataEl = document.getElementById("hikeData");
      hikeDataEl.innerHTML = data[i].fullName + data[i].hikeData;
    }
  }
}

//NPS API Function
function parkApi(parkCode) {
  var queryURL =
    "https://developer.nps.gov/api/v1/parks?parkCode=" +
    parkCode +
    "&api_key=" +
    APIKey;
  console.log(queryURL);
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
      var lat = data.data[0].latitude;
      var lon = data.data[0].longitude;
      console.log(lat + lon);
      getForecast(lat, lon);
      renderMaps(lat, lon);
      nameLocation.textContent = data.data[0].fullName;
      descLocation.textContent = data.data[0].description;
      urlLocation.innerHTML =
        "<a href='" + data.data[0].url + "'class='btn btn-dark'>National Park Service Website</a>";
      hoursLocation.textContent = data.data[0].operatingHours[0].description;
      let entranceFees = data.data[0].entranceFees;
      if (entranceFees.length !== 0) {
        feeLocation.textContent = data.data[0].entranceFees[0].description;
      }
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

      saveImages(
        data.data[0].images,
        data.data[0].latitude,
        data.data[0].longitude
      );
    });
}

//Function to append a random image to index2.html
function saveImages(imageData) {
  var randomImage = imageData[Math.floor(Math.random() * imageData.length)];
  imageLocation.innerHTML = "<img src=" + randomImage.url + " width='400' class='rounded img-fluid img-thumbnail mx-auto d-block'>";
  captionLocation.innerHTML = "<p class='text-center'>" + randomImage.caption + "</p>";
  npsDataDisplayImage.append(imageLocation);
  npsDataDisplaySubtext.append(captionLocation);
}
// "https://api.openweathermap.org/data/2.5/onecall?lat=32.19831758&lon=-84.12988898&units=imperial&exclude=minutely,hourly&appid=585ba3d2e5d78c9afea8cfd73fcf8a69" //<--test
function getForecast(lat, lon) {
  var resultsObj = {};
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=585ba3d2e5d78c9afea8cfd73fcf8a69`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      resultsObj.forecastResults = [];
      for (let i = 0; i < 5; i++) {
        let forecastObj = {};
        forecastObj.date = new Date(
          data.daily[i].dt * 1000
        ).toLocaleDateString();
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

function renderForecastData(forecastResults) {
  let forecastCard = document.getElementById("forecastCard"); //Id name for testing.
  console.log(forecastResults);

  for (let i = 0; i < forecastResults.length; i++) {
    // console.log(forecastResults[i]);
    let dayDataEl = document.createElement("div");
    let cardBodyEl = document.createElement("div");
    let dateEl = document.createElement("h5");
    let tempWrapper = document.createElement("h6");
    let minEl = document.createElement("span");
    let maxEl = document.createElement("span");
    let imgEl = document.createElement("p");
    let popEl = document.createElement("p");
    dateEl.setAttribute("class", "row justify-content-center card-title dateVal");
    minEl.setAttribute("class", "minTempVal");
    maxEl.setAttribute("class", "maxTempVal");
    imgEl.setAttribute("class", "image");
    popEl.setAttribute("class", "description");
    dayDataEl.setAttribute("class", "dayData");
    cardBodyEl.setAttribute("class", "card-body");
    tempWrapper.setAttribute("class", "row nowrap justify-content-between");
    forecastCard.append(dayDataEl);
    dayDataEl.append(cardBodyEl);
    cardBodyEl.append(dateEl);
    tempWrapper.append(minEl);
    tempWrapper.append(maxEl);
    cardBodyEl.append(tempWrapper);
    cardBodyEl.append(imgEl);
    cardBodyEl.append(popEl);
    dateEl.textContent = forecastResults[i].date;
    minEl.textContent = `${forecastResults[i].minTemp}°`;
    maxEl.textContent = `${forecastResults[i].maxTemp}°`;
    imgEl.innerHTML = `<img src='./assets/icons/${forecastResults[i].img}.png' />`;
    popEl.textContent = `Chance of rain: ${forecastResults[i].pop * 100}%`;
  }

  return forecastCard;
}

//arcgis API key AAPK69742b5d3e5d4d969f28ce8b97ee91f9c-GZhvscrk59aNtlQqY1LEIYm6FP_SH-3eVXanS5UfS9755ehIGeGrMn0_NmE_pP
function renderMaps(lat, lon) {
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
      center: [lon, lat], // temp long/lat values for testing
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
      center: [lon, lat],
      zoom: 15, // scale: 72223.819286
      container: "viewDiv2", //Div element
      constraints: {
        snapToZoom: false,
      },
    });
  });
}
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
