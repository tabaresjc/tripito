'use strict';

angular.module('tripito.viewLocation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/location', {
    templateUrl: 'viewLocation/index.html',
    controller: 'ViewLocation1Ctrl'
  });
}])

.controller('ViewLocation1Ctrl', [function() {

}]);