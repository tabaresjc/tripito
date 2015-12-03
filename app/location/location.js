'use strict';

angular.module('tripito.location', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/location/:id', {
    templateUrl: 'location/index.html',
    controller: 'ViewLocationCtrl'
  });
}])

.controller('ViewLocationCtrl', ['$scope', '$http', '$route', 'dataContainer', function($scope, $http, $route, dataContainer) {
  $scope.location = dataContainer.getItem($route.current.params.id);
}]);