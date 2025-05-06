// Global variables
let latitudinalPosition;
let longitudinalPosition;

const selectLocation = document.getElementById("locationSelect");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function success(position) {
  latitudinalPosition = position.coords.latitude;
  longitudinalPosition = position.coords.longitude;

  document.getElementById("manualInputs").style.display = "flex";
  document.getElementById("latitude").value = latitudinalPosition;
  document.getElementById("longitude").value = longitudinalPosition;
  console.log(longitudinalPosition, latitudinalPosition);
}

function error() {
  alert("Sorry, no position available.");
}

selectLocation.addEventListener("change", function (e) {
  if (e.target.value === "manual") {
    document.getElementById("manualInputs").style.display = "flex";
  } else if (e.target.value === "device") {
    getLocation();
  }
});
