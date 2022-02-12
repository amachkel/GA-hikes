var searchBtn = document.getElementById("searchBtn"); // Finds the id: searchBtn to add functionality to it below.

if (searchBtn) {
  // Makes sure that the button has loaded before becoming clickable.
  searchBtn.addEventListener("click", searchFunc);
}

function searchFunc() {
  // Moves user out to index2.html when the search button is clicked.
  console.log("Search has been clicked.");
  let optionVal = this.getElementsByClassName("search");
    // .getAttribute("value");
  //   let searchValue = optionEl.getAttribute("value");
  console.log(optionVal);
  getSearchInput(optionVal);
  window.location.replace("index2.html");
}

var AndersonvilleHike = ""; // These need to be changed into an Array with the associated areas.
var AppalachianHike = ""; // The goal is to list a range of hoke lengths with the arrays and a string set up.
var ChattahoocheeHike = ""; // It will be attached as a child element at the bottom of index2.html
// ... list continues ...

//localStorage

function getSearchInput(e, optionVal) {
    e.preventDefault();
    console.log(optionVal);
}
