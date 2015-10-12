angular.module('starter.services', [])

  .factory('savedRoutesFactory', function( $http ) {
      var endPoint = "http://localhost:3000/saved_routes"

      var factory = {};

      factory.getRoutes = function ( ) {
      return $http.get( endPoint );
      }

      factory.saveNewRoute = function ( newRoute ) {
        return $http.post( endPoint , newRoute );
      };

      factory.updateRoute = function ( id, routeUpdate ) {
        return $http.put( endPoint + '/' + id, routeUpdate);
      };

      factory.deleteRoute = function ( id ) {
        return $http.delete( endPoint + '/' + id );
      };

      return factory;

  } );
