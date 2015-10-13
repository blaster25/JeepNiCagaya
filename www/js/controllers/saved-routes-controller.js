angular.module('jeepnicagayan.controllers')

.controller('SavedRoutesCtrl', function( $scope, $ionicModal, $http, savedRoutesFactory ) {

  $scope.modalParams = {};
  $scope.updateIndex = null;
  $scope.isUpdate = false;

  $scope.clearData = function () {
    $scope.modalParams.routeStart = "";
    $scope.modalParams.routeEnd = "";
    $scope.modalParams.routePath = "";
    $scope.modalParams.routeFare = "";
    $scope.routeID = "";
    $scope.updateIndex = null;
    // $scope.modal.hide();
    $scope.isUpdate = false;
  }

  $scope.showModal = function showModal ( ) {
    $scope.clearData();
    $scope.modal.show();
  };

  // modal form for save routes
  $ionicModal.fromTemplateUrl( 'templates/new-route-modal.html' , {
    scope: $scope
  }).then( function( modal ) {
    $scope.modal = modal;
  });

  // api Getting all the saved route 
  savedRoutesFactory.getRoutes()
    .success(function ( response ) {
      $scope.SavedRoutes = response;
    })
    .error(function ( error ) {
      $scope.status = 'Unable to load customer data: ' + error.message;
    });

  // api insert new route 
  $scope.insertRoute = function insertRoute ( ) {
    $scope.isUpdate = false;
    this.routeData = {
      "start": $scope.modalParams.routeStart,
      "end": $scope.modalParams.routeEnd,
      "route":$scope.modalParams.routePath,
      "fare": $scope.modalParams.routeFare
    };
    this.newRouteData = {"saved_route": this.routeData };
    savedRoutesFactory.saveNewRoute(this.newRouteData)
      .success( function ( response ) {
        alert('Save new route !');
        $scope.SavedRoutes.push(response);
        $scope.clearData( );
        $scope.modal.hide( );
      } )
      .error( function(error) {
        alert('Unable to save route: ' + error.message);
      } );
  };
  
  // api delete route
  $scope.removeRoute = function removeRoute ( id, index ) {
    savedRoutesFactory.deleteRoute(id)
      .success( function () {
            $scope.SavedRoutes.splice(index, 1);
        } )
      .error( function ( error ) {
        alert('Unable to delete route: ' + error.message + " Please notify the devs");
      } );
  };

  // showing route profile to modal (optional)
  $scope.editRoute = function editRoute ( index ) {
    $scope.modalParams.routeStart = $scope.SavedRoutes[index].start;
    $scope.modalParams.routeEnd = $scope.SavedRoutes[index].end;
    $scope.modalParams.routePath = $scope.SavedRoutes[index].route;
    $scope.modalParams.routeFare = $scope.SavedRoutes[index].fare;
    $scope.routeID = $scope.SavedRoutes[index].id;
    $scope.updateIndex = index;
    $scope.modal.show();
    $scope.isUpdate = true;
  };

  // update the route view
  $scope.refreshRoute = function refreshRoute ( index ) {
    $scope.SavedRoutes[index].start = $scope.modalParams.routeStart;
    $scope.SavedRoutes[index].end = $scope.modalParams.routeEnd;
    $scope.SavedRoutes[index].route = $scope.modalParams.routePath;
    $scope.SavedRoutes[index].fare = $scope.modalParams.routeFare;
    $scope.SavedRoutes[index].id = $scope.routeID;
  };

  // api for update (optional)
  $scope.changeRoute = function changeRoute ( ) {
    if ( $scope.updateIndex != null ) {
      this.routeData = {
        "start": $scope.modalParams.routeStart,
        "end": $scope.modalParams.routeEnd,
        "route":$scope.modalParams.routePath,
        "fare": $scope.modalParams.routeFare
      };
      this.newRouteData = {"saved_route": this.routeData };
      savedRoutesFactory.updateRoute( $scope.routeID , this.newRouteData )
        .success( function ( ) {
            alert("Route has been chaged");
            $scope.refreshRoute($scope.updateIndex);
            $scope.clearData( );
            $scope.modal.hide();
         } )
        .error(function ( error ) {
            alert('Unable to update route: ' + error.message);
        });
    } else {
      alert("Unable to update: no data has been set");
    }
  };

} );