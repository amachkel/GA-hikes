/* GA - Hikes JS */
var searchBtn = document.getElementById('searchBtn'); // Finds the id: searchBtn to add functionality to it below.

if (searchBtn){ // Makes sure that the button has loaded before becoming clickable.
    searchBtn.addEventListener('click', searchFunc);
}

function searchFunc(){ // Moves user out to index2.html when the search button is clicked.
    console.log('Search has been clicked.');
    window.location.replace("index2.html");
}

var parks = ["Andersonville", "Appalachian National Scenic Trail", "Chattahoochee River National Recreation Area", "Chickamauga & Chattanooga National Military Park", "Cumberland Island NAtional Seashore", "Fort Frederica National Monument", "Fort Pulaski National Monument", "Jimmy Carter National Historical Park", "Kennesaw Mountain National Battlefield Park", "Martin Luther King, Jr. National Historical Park", "Ocmulgee Mounds National Historical Park"];
var hikeAmt = ["", "High", "High", "", "", "", "", "", "", "", "", ""];

function gethikeAmt(){ // checks the location's hiking level and pins a child element to one of the cards.
    console.log("The function, gethikeAmt(), is being run.");
    // if (hikeAmt[] == 0) {
        //console.log("This park does not offer hiking, but it may have scenic walking paths. The total milage is under 10 miles.")
    //}
    // else if (hikeAmt[] == 1) {
        //console.log("This park has some hiking options. The total milage is between 10 and 50 miles.")
    //}
    // else {
        //console.log("This park has an abundance of hiking options. The total milage is over 50 miles.");
    //};
};
