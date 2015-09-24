angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {})

.controller('SavedRoutesCtrl', function($scope ) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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
