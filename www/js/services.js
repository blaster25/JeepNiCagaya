angular.module('starter.services', [])

  .factory('savedRoutesFactory', function( $http ) {
      var endPoint = "https://jeepnicagayan.herokuapp.com/saved_routes"

      var factory = {}

      factory.getRoutes = function () {
      return $http.get( endPoint ) 
      }

      factory.saveNewRoute = function ( newRoute ) {
        return $http.post( endPoint , newRoute );
      };

      factory.deleteRoute = function ( id ) {
        return $http.delete( endPoint + '/' + id );
      };

      return factory;

  } );
