let map

function initMap(){
  // geocoder = new google.maps.Geocoder()

  // map = new google.maps.Map(document.getElementById('map'), {
  //   center: {lat: 40.7828, lng:-73.9653},
  //   zoom: 12,
  // });

  // marker = new google.maps.Marker({
  //   position:  {lat: 40.7828, lng:-73.9653},
  //   map: map
  // });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
          zoom : 15,
          center : mapLatLng
        };
        var map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );
        var marker = new google.maps.Marker({
          map : map,
          position : mapLatLng
        });
      },
      function(error) {
        switch(error.code) {
          case 1:
            alert("Permission denied");
            break;
          case 2:
            alert("Location not identified");
            break;
          case 3:
            alert("Time out");
            break;
          default:
            alert("Unexpected Error");
            break;
        }
      }
    );
  } else {
    alert("Devise error");
  }
}