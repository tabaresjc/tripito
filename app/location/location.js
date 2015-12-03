'use strict';

angular.module('tripito.location', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/location/:id', {
    templateUrl: 'location/index.html',
    controller: 'ViewLocationCtrl'
  });
}])

.controller('ViewLocationCtrl', ['$scope', '$http', '$route', function($scope, $http, $route) {
  $http.get('data/items.json').then(function(res){
    var locations = res.data;
    for (var i = 0; i < locations.length; i++) {
      // TODO: find a cleaner way to fetch individual records
      if(locations[i].id == $route.current.params.id) {
        $scope.location = angular.copy(locations[i]);
        break;
      }
    };
  });
}]);