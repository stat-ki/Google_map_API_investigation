$(function () {
	var map;
	var service;
	var infowindow;
	var pyrmont = new google.maps.LatLng(35.67832667, 139.77044378);
	createMap(pyrmont)
	document.getElementById('getcurrentlocation').onclick = function() {
		geoLocationInit();
	}

	function geoLocationInit() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, fail);
		} else {
			createMap(pyrmont);
		}
	}

	function success(position) {
		var currentLat = position.coords.latitude;
		var currentLng = position.coords.longitude;
		var pyrmont = new google.maps.LatLng(currentLat,currentLng);
		createMap(pyrmont)
		CurrentPositionMarker(pyrmont);
	}

	function fail(pyrmont) {
		createMap(pyrmont);
	}

	function createMap(pyrmont) {
		map = new google.maps.Map(document.getElementById('map'), {
			center: pyrmont,
			zoom: 15
		});
		nearbysearch(pyrmont)
	}

	function createMarker(latlng, id, place) {
		var marker = new google.maps.Marker({
			position: latlng,
			map: map
		});
		var placename = place.name;
		var infoWindow = new google.maps.InfoWindow({
			content: id
		});
		marker.addListener('click', function() {
			infoWindow.open(map, marker);
		});
	}

	function CurrentPositionMarker(pyrmont) {
		var marker = new google.maps.Marker({
			position: pyrmont,
			map: map
		});
		marker.setMap(map);
	}

	function nearbysearch(pyrmont) {
		var request = {
			location: pyrmont,
			radius: '1000'
		};
		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, callback);
		function callback(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					var place = results[i];
					var latlng = place.geometry.location;
					var id = place.id;
					createMarker(latlng, id, place);
				}
			}
		}
	}
});