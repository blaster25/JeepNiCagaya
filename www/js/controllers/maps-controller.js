angular.module('jeepnicagayan.controllers')

.controller('MapCtrl', function( $scope ) {
 google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(8.4800, 124.6340); // center
 
        var mapOptions = {
              center:             myLatlng,
              zoom:               14,
              mapTypeControl:     false,
              streetViewControl:  false,
              // mapTypeId: google.maps.MapTypeId.ROADMAP // no need for this I guess?
            };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);     

        var geo_options = {
                      enableHighAccuracy: true, 
                      maximumAge        : 30000, 
                      timeout           : 27000
                          };         
        
        document.addEventListener("deviceready", onDeviceReady, false);
        $scope.homeGPS = onDeviceReady();
        function onDeviceReady() {navigator.geolocation.getCurrentPosition(onSuccess, onError, geo_options);};

        function onSuccess(position) {
          var xCoords =  new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          $scope.myLoc = xCoords;
          console.log(xCoords);
          map.setCenter(xCoords);

          var myLocation = new google.maps.Marker({
              position: xCoords,
              map: map,
              title: "My Location"
            });
          };
        function onError(error) {
          console.log("code: " + error.code + "\n message: " + error.message + "\n" );
          };
        
  });

   $scope.map = map;

} ) ;

