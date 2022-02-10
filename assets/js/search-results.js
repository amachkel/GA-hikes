//NPI GA Data Link: https://developer.nps.gov/api/v1/parks?stateCode=GA&api_key=iiyXV98dq4oalbEXmTIS9OH62H5qcBfiKyVQqZHK

//NPI API Variables
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
var dataDisplay = document.querySelector("#data-display");

//NPI API Function
function parkApi() {
    var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=" + APIKey;
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
      })
  };

  parkApi();
