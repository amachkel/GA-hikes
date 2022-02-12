var searchBtn = document.getElementById("searchBtn"); // Finds the id: searchBtn to add functionality to it below.

if (searchBtn) {
  // Makes sure that the button has loaded before becoming clickable.
  searchBtn.addEventListener("click", searchFunc);
}
  


    var searchEl = document.getElementById("selectPark");
    
    if (searchEl.matches("option") === true) {
      var optionText = searchEl.value;
      console.log(optionText);
      // getSearchInput(optionText);
      searchFunc();
    }

function searchFunc() {
    var searchItem = searchEl.value;
    
    console.log(searchItem);
  // Moves user out to index2.html when the search button is clicked.
  console.log("Search has been clicked.");

  document.getElementById;

  getSearchInput(searchItem);
  window.location.replace("index2.html");
}

//localStorage

function getSearchInput(searchItem) {
    // e.preventDefault();
    console.log(searchItem);
}
