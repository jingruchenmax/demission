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
  };
  document.getElementById("submit").addEventListener("click", onChangeHandler);

  const card = document.getElementById("pac-card");
  const start = document.getElementById("start");
  const end = document.getElementById("end");
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