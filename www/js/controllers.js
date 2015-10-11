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

.controller('SavedRoutesCtrl', function($scope, $ionicModal, $http, savedRoutesFactory ) {

  $scope.modalParams = {};

  $scope.clearModalParams = function clearModalParams () {
    $scope.modalParams.routeStart = "";
    $scope.modalParams.routeEnd = "";
    $scope.modalParams.routePath = "";
    $scope.modalParams.routeFare = "";
  }


  // modal form for save routes
  $ionicModal.fromTemplateUrl( 'templates/new-route-modal.html' , {
    scope: $scope
  }).then( function( modal ) {
    $scope.modal = modal;
  });

  // api Getting all the saved route 
  savedRoutesFactory.getRoutes()
    .success(function (response) {
      $scope.SavedRoutes = response;
    })
    .error(function (error) {
      $scope.status = 'Unable to load customer data: ' + error.message;
    });

  // api insert new route 
  $scope.insertRoute = function insertRoute () {
    var routeData = {
      "start": $scope.modalParams.routeStart,
      "end": $scope.modalParams.routeEnd,
      "route":$scope.modalParams.routePath,
      "fare": $scope.modalParams.routeFare
    }
    var newRoute = {"saved_route": routeData };

    savedRoutesFactory.saveNewRoute(newRoute)
      .success(function () {
        alert('Save new route !');
        $scope.SavedRoutes.push(routeData);
      })
      .error(function(error) {
        alert('Unable to save route: ' + error.message);
      });
    $scope.clearModalParams();
    $scope.modal.hide();
  };
  
  // api delete route
  $scope.removeRoute = function(id, index) {
    savedRoutesFactory.deleteRoute(id)
      .success(function () {
            $scope.SavedRoutes.splice(index, 1);
        })
      .error(function (error) {
        alert('Unable to delete route: ' + error.message);
      });
  };
})

.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableGPS: true
  };
});