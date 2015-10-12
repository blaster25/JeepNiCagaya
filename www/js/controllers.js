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
  $scope.updateIndex = null;
  $scope.clearData = function () {
    $scope.modalParams.routeStart = "";
    $scope.modalParams.routeEnd = "";
    $scope.modalParams.routePath = "";
    $scope.modalParams.routeFare = "";
    $scope.routeID = "";
    $scope.updateIndex = null;
    $scope.modal.hide();
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
    this.routeData = {
      "start": $scope.modalParams.routeStart,
      "end": $scope.modalParams.routeEnd,
      "route":$scope.modalParams.routePath,
      "fare": $scope.modalParams.routeFare
    };
    this.newRouteData = {"saved_route": this.routeData };
    savedRoutesFactory.saveNewRoute(this.newRouteData)
      .success(function (response) {
        alert('Save new route !');
        $scope.SavedRoutes.push(response);
        $scope.clearData();
      })
      .error(function(error) {
        alert('Unable to save route: ' + error.message);
      });
  };
  
  // api delete route
  $scope.removeRoute = function(id, index) {
    savedRoutesFactory.deleteRoute(id)
      .success(function () {
            $scope.SavedRoutes.splice(index, 1);
        })
      .error(function (error) {
        alert('Unable to delete route: ' + error.message + " Please notify the devs");
      });
  };

  // showing route profile to modal (optional)
  $scope.editRoute = function ( index ) {
    $scope.modalParams.routeStart = $scope.SavedRoutes[index].start;
    $scope.modalParams.routeEnd = $scope.SavedRoutes[index].end;
    $scope.modalParams.routePath = $scope.SavedRoutes[index].route;
    $scope.modalParams.routeFare = $scope.SavedRoutes[index].fare;
    $scope.routeID = $scope.SavedRoutes[index].id;
    $scope.updateIndex = index;
    $scope.modal.show();
  };

  // update the route view
  $scope.refreshRoute = function ( index ) {
    $scope.SavedRoutes[index].start = $scope.modalParams.routeStart;
    $scope.SavedRoutes[index].end = $scope.modalParams.routeEnd;
    $scope.SavedRoutes[index].route = $scope.modalParams.routePath;
    $scope.SavedRoutes[index].fare = $scope.modalParams.routeFare;
    $scope.SavedRoutes[index].id = $scope.routeID;
  };

  // api for update (optional)
  $scope.changeRoute = function ( ) {
    if ( $scope.updateIndex != null ) {
      this.routeData = {
        "start": $scope.modalParams.routeStart,
        "end": $scope.modalParams.routeEnd,
        "route":$scope.modalParams.routePath,
        "fare": $scope.modalParams.routeFare
      };
      this.newRouteData = {"saved_route": this.routeData };
      savedRoutesFactory.updateRoute( $scope.routeID , this.newRouteData )
        .success(function () {
            alert("Route has been chaged");
            $scope.refreshRoute($scope.updateIndex);
            $scope.clearData();
         })
        .error(function ( error ) {
            alert('Unable to update route: ' + error.message);
        });
    } else {
      alert("Unable to update: no data has been set");
    }
  };

})

.controller('SettingCtrl', function( $scope ) {
  $scope.settings = {
    enableGPS: true
  };
});