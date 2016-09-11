//globals
var map;

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  //directionsDisplay.setPanel('bottom');
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 37.784701, lng: -122.397174}, //37.784701, -122.397174,
    styles: [
      {
        featureType: 'all',
        stylers: [
          { saturation: -30 }
        ]
      }, {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {saturation: 100} ,
          {hue: '#FB3C95'}
        ]
      }, {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {saturation: 100} ,
          {hue: '#82F41E'}
        ]
      },{
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          { hue: '#22CCCC' }
        ]
      },{
        featureType: 'poi.business',
        elementType: 'geometry',
        stylers: [
          {saturation: 100} ,
          { hue: '#FBC43C' }
        ]
      },{
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {hue: '#FBC43C'}
        ]
      } ]
  });
  directionsDisplay.setMap(map);
  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');
  // marker = new google.maps.Marker({
  //   map: map,
  //   draggable: false,
  //   animation: google.maps.Animation.DROP,
  //   position: {lat: 37.787983, lng: -122.406835} //37.787983, -122.406835
  // });
  // marker.addListener('click', toggleBounce);
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected) {
      waypts.push({
        location: checkboxArray[i].value,
        stopover: true
      });
    }
  }

  directionsService.route({
    origin: {lat: 37.784701, lng: -122.397174}, //37.759790, -122.426846
    destination: document.getElementById('end').value,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: document.getElementById('mode').value,
    //google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
        //summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        //summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

