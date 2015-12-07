'use strict';

angular.module('tripito.location', ['ngRoute', 'ngMessages',])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/location/show/:id', {
    templateUrl: 'location/show.html',
    controller: 'LocationShowCtrl'
  })
  .when('/location/new', {
    templateUrl: 'location/new.html',
    controller: 'LocationNewCtrl'
  })
  .when('/location/edit/:id', {
    templateUrl: 'location/edit.html',
    controller: 'LocationEditCtrl'
  });
}])

.controller('LocationShowCtrl', ['$scope', '$http', '$route', '$location', 'dataContainer', function($scope, $http, $route, $location, dataContainer) {
  var locationId = $route.current.params.id;
  var location = angular.copy(dataContainer.getItem(locationId));

  if(!location.id) {
    alert('There is no property with id: ' + locationId);
    $location.path('/');
  }

  $scope.location = location;
}])

.controller('LocationEditCtrl', ['$scope', '$http', '$route', '$location', 'dataContainer', function($scope, $http, $route, $location, dataContainer) {
  var locationId = $route.current.params.id;
  var location = angular.copy(dataContainer.getItem(locationId));

  if(!location.id) {
    alert('There is no property with id: ' + locationId);
    $location.path('/');
  }

  $scope.location = location;

  $scope.onSubmit = function() {
    var item = dataContainer.updateItem(locationId, location);
    if(!item) {
      alert('Please check the form and fill the required fields.');
      return;
    }
    $location.path('/location/show/'+locationId);
  };

  $scope.onCancel = function() {
    $location.path('/location/show/'+locationId);
  };
}])


.controller('LocationNewCtrl', ['$scope', '$http', '$route', '$location', 'dataContainer', function($scope, $http, $route, $location, dataContainer) {
  var location = {};
  $scope.location = location;

  $scope.onSubmit = function() {
    var item = dataContainer.addItem(location);
    if(!item) {
      alert('Please check the form and fill the required fields.');
      return;
    }
    alert('Property was created!');
    $location.path('/location/show/'+item.id);
  };

  $scope.onCancel = function() {
    $location.path('/');
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
    templateUrl: 'location/form.html'
  };
});