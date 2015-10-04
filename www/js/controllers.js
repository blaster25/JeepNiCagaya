<<<<<<< HEAD
angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {
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

})

.controller('SavedRoutesCtrl', function($scope ) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
   $scope.testVar = "WORKS";
   $scope.SavedRoutes =  [
                        {"title": "San Augustin To Must", 
                        "route": "via Shuttle -> Xavier Heights -> R1",
                        "cost": "24",
                        "time": "45" },
                        {"title": "Igpit To Must", 
                        "route": "via igpit liner -> Bulua ",
                        "cost": "24",
                        "time": "45" }
                        ];
  $scope.remove = function(SavedRoute) {
    SaveRoutes.remove(SavedRoute);
  
  };
})

.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableGPS: true
  };
});
=======
angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {
 google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(8.4800, 124.6340); // center
 
        var mapOptions = {
            center: myLatlng,
            zoom: 14,
            mapTypeControl: false,
            streetViewControl: false,
            // mapTypeId: google.maps.MapTypeId.ROADMAP // no need for this I guess?
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);     
      $scope.homeGPS = function(){
        var geo_options = {
                            enableHighAccuracy: true, 
                            maximumAge        : 30000, 
                            timeout           : 27000
                          }; 
        var onFail = function(){};
        navigator.geolocation.getCurrentPosition(function(pos,onFail,geo_options) {
            var xCoords =  new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude); //Get current position
            $scope.myLoc = xCoords;//bind to scope (displays blank on view)
            console.log(xCoords);//display to log (works)
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
      };
});
  $scope.map = map;

})

.controller('SavedRoutesCtrl', function($scope ) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
   $scope.testVar = "WORKS";
   $scope.SavedRoutes =  [
                        {"title": "San Augustin To Must", 
                        "route": "via Shuttle -> Xavier Heights -> R1",
                        "cost": "24",
                        "time": "45" },
                        {"title": "Igpit To Must", 
                        "route": "via igpit liner -> Bulua ",
                        "cost": "24",
                        "time": "45" }
                        ];
  $scope.remove = function(SavedRoute) {
    SaveRoutes.remove(SavedRoute);
  
  };
})

.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableGPS: true
  };
});
>>>>>>> origin/master
