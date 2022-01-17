let map;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.274, lng: -71.808},
    zoom: 14,
  });  

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  // *Render route
  directionsRenderer.setMap(map);
  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    calculateDistance();
  };
  document.getElementById("submit").addEventListener("click", onChangeHandler);

  const card = document.getElementById("pac-card");
  var start = document.getElementById("start");
  var end = document.getElementById("end");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
  new google.maps.places.Autocomplete(start);
  new google.maps.places.Autocomplete(end);




}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService
    .route({
      origin: {
     query: document.getElementById("start").value,
      },
      destination: {
     query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

function calculateDistance(){
  const request = {
    origins: [document.getElementById("start").value],
    destinations: [document.getElementById("end").value],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };

  service.getDistanceMatrix(request).then((response) => {  

    document.getElementById("response").innerText += response.rows[0].elements[0].distance.text;
  });

  window.open("emission.html");
}