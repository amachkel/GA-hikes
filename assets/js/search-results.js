var backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", backFunc);
function backFunc() {
  // Moves user back to index.html when clicked.
  console.log("Back has been clicked.");
  window.location.replace("index.html");
}

//NPS GA Data Link: https://developer.nps.gov/api/v1/parks?stateCode=GA&api_key=iiyXV98dq4oalbEXmTIS9OH62H5qcBfiKyVQqZHK

//Variables to append data to page
var npsDataDisplay = document.querySelector("#data-display");
var npsNameDisplay = document.querySelector("#name-display");
var npsUrlDisplay = document.querySelector("#url-display");
var npsActDisplay = document.querySelector("#act-display");
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
var actLocation = document.createElement("p");

//NPS API Variables
var data = [
  {
    parkCode: "ande",
    fullName: "Andersonville National Historic Site",
    hikeData:
      " is a historic site and does not have any dedicated hiking. It does have a few scenic walking paths.",
    parkSearch: "",
  },
  {
    parkCode: "appa",
    fullName: "Appalachian National Scenic Trail",
    hikeData:
      " has over 100 miles of hiking trails which continue all the way up to Maine.",
    parkSearch: "appalachian-trail-corridor-ga-47320",
  },
  {
    parkCode: "chat",
    fullName: "Chattahoochee River National Recreation Area",
    hikeData:
      " is a collection of connected parks. As a whole, the park as just over 50 miles of walking paths and easy trails.",
    parkSearch: "chattahoochee-river-national-recreation-area-48201",
  },
  {
    parkCode: "chch",
    fullName: "Chickamauga & Chattanooga National Military Park",
    hikeData:
      " has just over 45 miles of hiking trails which take you through the battlefields.",
    parkSearch: "",
  },
  {
    parkCode: "cuis",
    fullName: "Cumberland Island National Seashore",
    hikeData:
      " has several flat walking paths across the island. In total is has about 27 miles of hiking.",
    parkSearch: "",
  },

  {
    parkCode: "fofr",
    fullName: "Fort Frederica National Monument",
    hikeData:
      " is a historic site and doesn't have any dedicated hiking. It does have a few scenic walking paths.",

    parkSearch: "",
  },
  {
    parkCode: "fopu",
    fullName: "Fort Pulaski National Monument",
    hikeData:
      " is a historic site and doesn't have any dedicated hiking. It does have a few scenic walking paths.",
    parkSearch: "",
  },
  {
    parkCode: "jica",
    fullName: "Jimmy Carter National Historical Park",
    hikeData:
      " is a historic site and doesn't have any dedicated hiking. It does have a few scenic walking paths.",
    parkSearch: "",
  },
  {
    parkCode: "kemo",
    fullName: "Kennesaw Mountain National Battlefield Park",
    hikeData:
      " has just over 40 miles of hiking trails that take you up and around the mountain.",
    parkSearch: "kennesaw-23418",
  },
  {
    parkCode: "malu",
    fullName: "Martin Luther King, Jr. National Historical Park",
    hikeData: " is a historic park and doesn't have any dedicated hiking.",
    parkSearch: "",
  },
  {
    parkCode: "ocmu",
    fullName: "Ocmulgee Mounds National Historical Park",
    hikeData:
      " is a historic site and doesn't have any dedicated hiking. It does have a few scenic walking paths.",
    parkSearch: "",
  },
  {
    parkCode: "trte",
    fullName: "Trail Of Tears National Historic Trail",
    hikeData:
      " is a series of historic sites that span several states moving from Georgia out west. These sites don't have dedicated hiking, but they do have several scenic walking paths.",
    parkSearch: "",
  },
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

    .then(function (dataResponse) {
      console.log(dataResponse);
      var lat = dataResponse.data[0].latitude;
      var lon = dataResponse.data[0].longitude;
      console.log(lat + lon);
      getForecast(lat, lon);
      var current = data.filter(function (el) {
        return el.parkCode == parkCode;
      });
      console.log(current);
      renderMaps(current[0].parkSearch, lat, lon);
      nameLocation.textContent = dataResponse.data[0].fullName;
      descLocation.textContent = dataResponse.data[0].description;
      urlLocation.innerHTML =
        "<a href='" +
        dataResponse.data[0].url +
        "'class='btn btn-dark'>National Park Service Website</a>";
      hoursLocation.textContent =
        dataResponse.data[0].operatingHours[0].description;
      let entranceFees = dataResponse.data[0].entranceFees;
      if (entranceFees.length !== 0) {
        feeLocation.textContent =
          dataResponse.data[0].entranceFees[0].description;
      }
      directLocation.textContent =
        "Directions: " + dataResponse.data[0].directionsInfo;

      npsNameDisplay.append(nameLocation);
      npsUrlDisplay.append(urlLocation);
      npsDataDisplay.append(descLocation);
      npsDataDisplay.append(hoursLocation);
      npsDataDisplay.append(feeLocation);
      npsDataDisplay.append(directLocation);

      lat = dataResponse.data[0].latitude;
      lon = dataResponse.data[0].longitude;

      var imageData = dataResponse.data[0].images;

      var actData = dataResponse.data[0].activities;
      for (i = 0; i < actData.length; i++) {
        npsActDisplay.append(actData[i].name + "  |  ");
      }

      saveImages(
        dataResponse.data[0].images,
        dataResponse.data[0].latitude,
        dataResponse.data[0].longitude
      );
    });
}

//Function to append a random image to index2.html
function saveImages(imageData) {
  var randomImage = imageData[Math.floor(Math.random() * imageData.length)];
  imageLocation.innerHTML =
    "<img src=" +
    randomImage.url +
    " width='400' class='rounded img-fluid img-thumbnail mx-auto d-block' alt='" +
    randomImage.altText +
    "'>";
  captionLocation.innerHTML =
    "<p class='text-center'>" + randomImage.caption + "</p>";
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
    dateEl.setAttribute(
      "class",
      "row justify-content-center card-title dateVal"
    );
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
    popEl.textContent = `Chance of rain: ${Math.floor(forecastResults[i].pop * 100)}%`;
  }

  return forecastCard;
}

function renderMaps(parkSearch, lat, lon) {
  // let iframeEl = document.createElement("iframe");
  let mapWrapperEl = document.getElementById("mapWrapper");

  let toggleBtnEl = document.getElementById("toggleBtn");
  let topoMapEl = document.getElementById("topo-wrapper");
  console.log(parkSearch);
  // console.log(data[i].parkSearch);
  if (parkSearch != "" && parkSearch != undefined) {
    toggleBtnEl.style = "display: none";
    let divEl = document.createElement("div");
    let div2El = document.createElement("div");
    // <div class="" data-w="800px" data-h="150px" data-rid="23418" data-counts="1" data-stats="1"></div>
    div2El.setAttribute("class", "TrailforksRegionInfo");
    div2El.setAttribute("data-w", "100%");
    div2El.setAttribute("data-h", "150px");

    div2El.setAttribute("data-counts", "1");
    div2El.setAttribute("data-stats", "1");
    divEl.setAttribute("class", "TrailforksWidgetMap");
    divEl.setAttribute("data-w", "100%");
    divEl.setAttribute("data-h", "400px");
    // divEl.setAttribute("data-rid", "23418");
    divEl.setAttribute("data-activitytype", "6");
    divEl.setAttribute("data-maptype", "trailforks");
    divEl.setAttribute("data-trailstyle", "difficulty");
    divEl.setAttribute("data-controls", "1");
    divEl.setAttribute("data-list", "0");
    divEl.setAttribute("data-dml", "1");
    divEl.setAttribute("data-layers", "labels,poi,polygon,directory,region");
    divEl.setAttribute("data-z", "");
    divEl.setAttribute("data-lat", "");
    divEl.setAttribute("data-lon", "");
    divEl.setAttribute("data-hideunsanctioned", "0");
    divEl.style = "width: 100%";
    div2El.style = "width: 100%";
    mapWrapperEl.append(div2El);
    mapWrapperEl.append(divEl);
    
    let splitCode = parkSearch.split("-");
    let code = splitCode[splitCode.length - 1];
    console.log(code);
    divEl.setAttribute("data-rid", code);
    div2El.setAttribute("data-rid", code);
    let mapUrlEl = document.createElement("div");
    mapUrlEl.setAttribute("id", "mapUrl");
    mapUrlEl.innerHTML = `<a href="https://www.trailforks.com/region/${parkSearch}/"></a>`;

    mapWrapperEl.append(mapUrlEl);
    var script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js"
    );
    document.getElementsByTagName("head")[0].appendChild(script);
    var widgetCheck = false;
  } else {
    toggleBtnEl.style = "display: inline-block";
    topoMapEl.style = "display: block";
    console.log("No trails!");
    renderTopoMap(lat, lon);
    renderHybridMap(lat, lon);
  }
}

//arcgis API key AAPK69742b5d3e5d4d969f28ce8b97ee91f9c-GZhvscrk59aNtlQqY1LEIYm6FP_SH-3eVXanS5UfS9755ehIGeGrMn0_NmE_pP
function renderTopoMap(lat, lon) {
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
}

function renderHybridMap(lat, lon) {
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
