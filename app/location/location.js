'use strict';

angular.module('tripito.location', ['ngRoute', 'ngMessages',])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/location/:id', {
    templateUrl: 'location/show.html',
    controller: 'LocationShowCtrl'
  })
  .when('/location/:id/edit', {
    templateUrl: 'location/edit.html',
    controller: 'LocationEditCtrl'
  });
}])

.controller('LocationShowCtrl', ['$scope', '$http', '$route', 'dataContainer', function($scope, $http, $route, dataContainer) {
  $scope.location = dataContainer.getItem($route.current.params.id);
}])

.controller('LocationEditCtrl', ['$scope', '$http', '$route', '$location', 'dataContainer', function($scope, $http, $route, $location, dataContainer) {
  var locationId = $route.current.params.id;
  var location = angular.copy(dataContainer.getItem(locationId));

  if(!location.id) {
    $location.path('/location');
    alert('There is no property with id: ' + locationId);
  }

  $scope.location = location;

  $scope.onSubmit = function() {
    dataContainer.updateItem(locationId, location);
    $location.path('/location/'+locationId);
    alert('Property was Saved!!');
  };

  $scope.onCancel = function() {
    $location.path('/location/'+locationId);
    alert('Operation aborted ');
  };
}])


.controller('locationFormEditCtrl', ['$scope', 'dataContainer', function($scope, dataContainer) {
  $scope.owners = dataContainer.getOwners();
}])
.directive('locationFormEdit', function () {
  return {
    restrict: 'E',
    controller: 'locationFormEditCtrl',
    scope: {data: "=ngModel", submit: '&onSubmit', cancel: '&onCancel'},
    require: 'ngModel',
    templateUrl: 'location/form.html'
  };
});