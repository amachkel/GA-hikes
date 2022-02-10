//NPS GA Data Link: https://developer.nps.gov/api/v1/parks?stateCode=GA&api_key=iiyXV98dq4oalbEXmTIS9OH62H5qcBfiKyVQqZHK

//Variables to append data to page
var npsDataDisplay = document.querySelector("#data-display");
var nameLocation = document.createElement("h2");
var descLocation = document.createElement("p");
var urlLocation = document.createElement("a");
var hoursLocation = document.createElement("p");
var feeLocation = document.createElement("p");
var directLocation = document.createElement("p");
var imageLocation = document.createElement("img");

//NPS API Variables
var data = [
    {parkCode: "ande",
    fullName: "Andersonville National Historic Site"
    },
    {parkCode: "appa",
    fullName: "Appalachian National Scenic Trail"
    },
    {parkCode: "chat",
    fullName: "Chattahoochee River National Recreation Area"   
    }, 
    {parkCode: "chch",
    fullName: "Chickamauga & Chattanooga National Military Park"   
    },
    {parkCode: "cuis",
    fullName: "Cumberland Island National Seashore"   
    },
    {parkCode: "fofr",
    fullName: "Fort Frederica National Monument"   
    },
    {parkCode: "fopu",
    fullName: "Fort Pulaski National Monument"   
    },
    {parkCode: "jica",
    fullName: "Jimmy Carter National Historical Park"   
    },
    {parkCode: "kimo",
    fullName: "Kennesaw Mountain National Battlefield Park"   
    },
    {parkCode: "malu",
    fullName: "Martin Luther King, Jr. National Historical Park"   
    },
    {parkCode: "ocmu",
    fullName: "Ocmulgee Mounds National Historical Park"   
    },
    {parkCode: "trte",
    fullName: "Trail Of Tears National Historic Trail"   
    }
]
var APIKey = "iiyXV98dq4oalbEXmTIS9OH62H5qcBfiKyVQqZHK";

//NPS API Function
function parkApi() {
  var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=" + "ande" + "&api_key=" + APIKey;
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
      urlLocation.innerHTML =  "<a href='" + data.data[0].url + "'>Link to NPS Park Site</a>";
      hoursLocation.textContent = data.data[0].operatingHours[0].description;
      feeLocation.textContent = data.data[0].entranceFees[0].description;
      directLocation.textContent = data.data[0].directionsInfo;
      //imageLocation.innerHTML = "<img src=" + data[0].images[0].url + ">";

      npsDataDisplay.append(nameLocation);
      npsDataDisplay.append(urlLocation);
      npsDataDisplay.append(descLocation);
      npsDataDisplay.append(hoursLocation);
      npsDataDisplay.append(feeLocation);
      npsDataDisplay.append(directLocation);
      npsDataDisplay.append(imageLocation);

    })
};

parkApi();

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

//arcgis(potential maps API) key AAPK69742b5d3e5d4d969f28ce8b97ee91f9c-GZhvscrk59aNtlQqY1LEIYm6FP_SH-3eVXanS5UfS9755ehIGeGrMn0_NmE_pP

//code for OpenLayers Map:
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([37.41, 8.82]),
    zoom: 4
  })
});

