/* GA - Hikes JS */
var searchBtn = document.getElementById('searchBtn'); // Finds the id: searchBtn to add functionality to it below.

if (searchBtn){ // Makes sure that the button has loaded before becoming clickable.
    searchBtn.addEventListener('click', searchFunc);
}

function searchFunc(){ // Moves user out to index2.html when the search button is clicked.
    console.log('Search has been clicked.');
    window.location.replace("index2.html");
}

