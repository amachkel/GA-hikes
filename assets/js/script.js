/* GA - Hikes JS */
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchFunc);

function searchFunc() {
  console.log("Search has been clicked.");
  window.location.replace("index2.html");
}

var AndersonvilleHike = ""; // These need to be changed into an Array with the associated areas.
var AppalachianHike = ""; // The goal is to list a range of hoke lengths with the arrays and a string set up.
var ChattahoocheeHike = ""; // It will be attached as a child element at the bottom of index2.html
// ... list continues ...

//localStorage

function getSearchInput() {}
